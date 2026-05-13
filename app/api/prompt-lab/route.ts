import { NextRequest } from "next/server";
import { z } from "zod";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { PROMPT_SCENARIOS } from "@/content/practice/ai-for-product-designers";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const MODEL = "claude-3-5-haiku-latest";
const RATE_LIMIT = Number(process.env.PROMPT_LAB_RATE_LIMIT ?? 5);
const WINDOW_MS = 1000 * 60 * 60 * 12; // 12 hours

/**
 * In-memory rate limit by session-cookie + IP. Resets on cold-start, which
 * is fine for an edge-deployed portfolio with low traffic. Replace with
 * Upstash Redis or KV for a hardened production setup.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getBucket(key: string): Bucket {
  const now = Date.now();
  const existing = buckets.get(key);
  if (existing && existing.resetAt > now) return existing;
  const fresh: Bucket = { count: 0, resetAt: now + WINDOW_MS };
  buckets.set(key, fresh);
  return fresh;
}

const bodySchema = z.object({
  scenarioId: z.enum([
    "settings-microcopy",
    "analytics-empty-state",
    "handoff-outline",
  ]),
});

function rateKey(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const session =
    req.cookies.get("pl_session")?.value ?? "anon";
  return `${ip}:${session}`;
}

export async function POST(req: NextRequest) {
  // Validate body
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  const scenario = PROMPT_SCENARIOS.find((s) => s.id === parsed.scenarioId);
  if (!scenario) return new Response("Unknown scenario", { status: 400 });

  // Rate limit
  const key = rateKey(req);
  const bucket = getBucket(key);

  if (bucket.count >= RATE_LIMIT) {
    return new Response(
      JSON.stringify({
        error: `Session run limit reached (${RATE_LIMIT}). The Prompt Lab is intentionally bounded — refresh in 12 hours or reach out directly.`,
        runs: bucket.count,
        limit: RATE_LIMIT,
      }),
      {
        status: 429,
        headers: { "content-type": "application/json" },
      }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      "Server is missing ANTHROPIC_API_KEY. The Prompt Lab is configured but no key is set.",
      { status: 503 }
    );
  }

  bucket.count += 1;

  let result;
  try {
    result = streamText({
      model: anthropic(MODEL),
      system: scenario.systemPrompt,
      prompt: scenario.userPrompt,
      maxTokens: 600,
      temperature: 0.5,
    });
  } catch (err) {
    bucket.count -= 1;
    return new Response(
      `Model call failed: ${(err as Error).message}`,
      { status: 502 }
    );
  }

  const stream = result.textStream;
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `\n\n[stream interrupted: ${(err as Error).message}]`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  // Issue a session cookie if missing so the bucket persists across runs.
  const headers = new Headers({
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store",
    "x-model": MODEL,
    "x-runs": String(bucket.count),
    "x-runs-limit": String(RATE_LIMIT),
  });
  if (!req.cookies.get("pl_session")) {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    headers.append(
      "set-cookie",
      `pl_session=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
        12 * 60 * 60
      }`
    );
  }

  return new Response(readable, { status: 200, headers });
}

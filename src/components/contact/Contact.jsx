import React from 'react';
import './contact.css';
import { BiMessageDetail } from 'react-icons/bi';
import { RiMessengerLine } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa';

import Fade from 'react-reveal/Fade';

const Contact = () => {
	return (
		<section id='contact'>
			<h5>Get in Touch</h5>
			<h2>Contact Me</h2>

			<div className='container contact__container'>
				<Fade left duration={1300}>
					<div className='contact__options'>
						<article className='contact__option'>
							<BiMessageDetail className='contact__option-icon' />
							<h4>Email</h4>
							<h5>elvisfdesign@gmail.com</h5>
							<a href='mailto:elvisfdesign@gmail.com'>
								Send a Message
							</a>
						</article>
						<article className='contact__option'>
							<RiMessengerLine className='contact__option-icon' />
							<h4>Messenger</h4>
							<h5>Elvis Fernandes</h5>
							<a
								href='https://m.me/elvis.fernandes.961556'
								target='_blank'
								rel='noreferrer'
							>
								Send a Message
							</a>
						</article>
						<article className='contact__option'>
							<FaWhatsapp className='contact__option-icon' />
							<h4>WhatsApp</h4>
							<h5>XXX-XXX-0216</h5>
							<a
								href='https://api.whatsapp.com/send?phone+1677550216'
								target='_blank'
								rel='noreferrer'
							>
								Send a Message
							</a>
						</article>
					</div>
				</Fade>

				<form action='https://formspree.io/f/xpzbyblw' method='POST'>
					<input
						type='text'
						name='name'
						placeholder='Your Full Name'
						required
					/>
					<input
						type='email'
						name='email'
						placeholder='Your Email'
						required
					/>
					<textarea
						name='message'
						rows='7'
						placeholder='Your Message'
						required
					></textarea>
					<button type='submit' className='btn btn-primary'>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;

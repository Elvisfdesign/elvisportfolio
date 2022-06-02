import React from 'react';
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';
const Experience = () => {
	return (
		<section id='experience'>
			<h5>What Skills I have</h5>
			<h2>My Experience</h2>
			<Fade bottom duration={1000}>
				<div className='container experience__container'>
					<div className='experience__frontend'>
						<h3>UI &amp; UX Design</h3>
						<div className='experience__content'>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Adobe XD</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Figma</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>InVision Studio</h4>
									<small className='text-light'>
										Intermediate
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Adobe Photoshop</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Abobe Illustrator</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Axure</h4>
									<small className='text-light'>
										Intermediate
									</small>
								</div>
							</article>
						</div>
					</div>

					<div className='experience__backend'>
						<h3>FrontEnd Development</h3>
						<div className='experience__content'>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>HTML 5</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>CSS 3</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>JavaScript</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Bootstrap</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>Sass &amp; Less</h4>
									<small className='text-light'>
										Experienced
									</small>
								</div>
							</article>
							<article className='experience-details'>
								<BsPatchCheckFill className='experience__details-icon' />
								<div>
									<h4>React &amp; Angular Js</h4>
									<small className='text-light'>
										Intermediate
									</small>
								</div>
							</article>
						</div>
					</div>
				</div>
			</Fade>
		</section>
	);
};

export default Experience;

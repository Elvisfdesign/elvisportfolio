import React from 'react';
import './services.css';
import { BiCheck } from 'react-icons/bi';
import Fade from 'react-reveal/Fade';

const Services = () => {
	return (
		<section id='services'>
			<h5>What I offer</h5>
			<h2>Services</h2>

			<div className='container services__container'>
				<Fade left duration={1400}>
					<article className='service'>
						<div className='service__head'>
							<h3>UI/UX Design</h3>
						</div>
						<ul className='service__list'>
							<li>
								<BiCheck className='service__list-icon' />
								<p>Sketching and Wireframes.</p>
							</li>

							<li>
								<BiCheck className='service__list-icon' />
								<p>User research, and usability testing.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p>
									Dynamic Prototyping and creation of mockups.
								</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p>Interaction design.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> Interface architecture.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> UI guidelines and kit</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> Design review.</p>
							</li>
						</ul>
					</article>
				</Fade>
				<Fade bottom duration={1400}>
					<article className='service'>
						<div className='service__head'>
							<h3>FrontEnd Developement </h3>
						</div>
						<ul className='service__list'>
							<li>
								<BiCheck className='service__list-icon' />
								<p> Responsive and Mobile design.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> HTML5 development</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> CSS3 development</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> JavaScript development</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> React and Angular Js development</p>
							</li>

							<li>
								<BiCheck className='service__list-icon' />
								<p> Cross-Browser development.</p>
							</li>

							<li>
								<BiCheck className='service__list-icon' />
								<p> Optimization services.</p>
							</li>
						</ul>
					</article>
				</Fade>
				<Fade right duration={1400}>
					<article className='service'>
						<div className='service__head'>
							<h3>CMS Websites</h3>
						</div>
						<ul className='service__list'>
							<li>
								<BiCheck className='service__list-icon' />
								<p> Content Management System development.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> WordPress development,</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> Drupal development.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p> Joomla development.</p>
							</li>
							<li>
								<BiCheck className='service__list-icon' />
								<p>
									Support and maintenance of CMS
									Blogs/websites.
								</p>
							</li>
						</ul>
					</article>
				</Fade>
			</div>
		</section>
	);
};

export default Services;

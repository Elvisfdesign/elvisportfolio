import React from 'react';
import './about.css';
import ME from '../../assets/me-about.jpg';
import { BsAward } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { BsFolderCheck } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';

const About = () => {
	return (
		<section id='about'>
			<h5>Get To Know</h5>
			<h2>About Me</h2>
			<div className='container about__container'>
				<Fade left duration={1300}>
					<div className='about__me'>
						<div className='about__me-image'>
							<img src={ME} alt='about Elvis' />
						</div>
					</div>
				</Fade>
				<Fade bottom duration={1500}>
					<div className='about__content'>
						<div className='about__cards'>
							<article className='about__card'>
								<BsAward className='about__icon' />
								<h5>Experience</h5>
								<small>4+ Years Working</small>
							</article>
							<article className='about__card'>
								<FiUsers className='about__icon' />
								<h5>Clientes</h5>
								<small>10 + clients</small>
							</article>
							<article className='about__card'>
								<BsFolderCheck className='about__icon' />
								<h5>Projects</h5>
								<small>20 + Completed projects</small>
							</article>
						</div>
						<p>
							Hello! I’m Elvis - a designer/ developer focused on
							UI-UX Design and Front-End Web Developer. As a UI
							designer, I’m focused more on Visual Design and
							Prototyping. In this field, I try my best to make
							sure the design decisions are the results of a
							human-centred process. As a Web Developer, I’m
							focused on Front-end development. I understand the
							perfect user interface should look good and work
							even better and these are the reason I want to be
							part of both working fields or maybe a connection
							between them.
						</p>
						<a href='#contact' className='btn btn-desert'>
							Let's Talk
						</a>
					</div>
				</Fade>
			</div>
		</section>
	);
};

export default About;

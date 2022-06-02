import React from 'react';
import './portfolio.css';
import IMG1 from '../../assets/portfolio1.jpg';
import IMG2 from '../../assets/portfolio2.jpg';
import IMG3 from '../../assets/portfolio3.jpg';
import IMG4 from '../../assets/portfolio4.jpg';
import IMG5 from '../../assets/portfolio5.png';
import IMG6 from '../../assets/portfolio6.jpg';
import Fade from 'react-reveal/Fade';
const data = [
	{
		id: 1,
		image: IMG1,
		title: 'This Portfolio - 2022',
		desc: 'Built using  React and CSS3, this single page aplication is my latest portfolio project. Here I show most of my projects. In this project, I used a different approach to display the navbar, as you can see.',
		github: '#',
	},
	{
		id: 2,
		image: IMG2,
		title: 'A UX Design Portfolio - 2021',
		desc: 'This Google UX Design Certificate Portfolio Project was created with HTML5, CSS3 and JavaScript, to show three case studies that I worked on while taking the course. In this course, I learned the foundations of UX design, including empathizing with users, building wireframes and prototypes, and conducting research to test my designs.',
		github: 'https://ux-case-studies.netlify.app/',
	},
	{
		id: 3,
		image: IMG3,
		title: 'My second Portfolio - 2021',
		desc: 'In this project, I used Gatsby(an open-source framework based on React), CSS3, GraphQL and Strapi.',
		github: 'https://elvisf-portfolio.netlify.app/',
	},
	{
		id: 4,
		image: IMG4,
		title: 'Netflix Clone Project - 2021',
		desc: 'This project was created using React, Styled Components and Firebase(Firestore and Auth). The user can create a profile by sign up, and when the user is signed in, he or she will be able to see, choose and search for Movies and Tv Shows.',
		github: 'https://netflix-clon-proj.netlify.app/',
	},
	{
		id: 5,
		image: IMG5,
		title: 'My First Portfolio - 2017',
		desc: 'My Bachelor’s portfolio project. On this project, I used HTML5, CSS3, JavaScript & Jquery. This project contains all my college projects from when I was studying at the New England Institute of Art in Brookline, MA.',
		github: 'https://elvis-old-portfolio.netlify.app/',
	},
	{
		id: 6,
		image: IMG6,
		title: 'Responsive Admin Dashboard - 2022',
		desc: 'Responsive Admin Dashboard Using HTML5, CSS3 & JavaScript with Light & Dark Mode',
		github: 'https://dashboard-exercise.netlify.app/',
	},
];

const Portfolio = () => {
	return (
		<section id='portfolio'>
			<h5>My Recent Works</h5>
			<h2>Portfolio</h2>

			<div className='container portfolio__container'>
				{data.map(({ id, image, title, github, desc }) => {
					return (
						<Fade bottom duration={1000}>
							<article key={id} className='portfolio__item'>
								<div className='portfolio__item-image'>
									<img src={image} alt={title} />
								</div>
								<h3>{title}</h3>
								<p>{desc}</p>
								<div className='portfolio__item-cta'>
									<a
										href={github}
										className='btn btn-primary'
										target='_blank'
										rel='noreferrer'
									>
										Live Demo
									</a>
								</div>
							</article>
						</Fade>
					);
				})}
			</div>
		</section>
	);
};

export default Portfolio;

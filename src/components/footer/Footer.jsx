import * as React from 'react';
import './footer.css';
import { FaFacebookF } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { IoLogoTwitter } from 'react-icons/io';

const Footer = () => {
	return (
		<footer>
			<a href='#home' className='footer__logo'>
				Elvis Fernandes
			</a>
			<ul className='permalinks'>
				<li>
					<a href='#home'>Home</a>
				</li>
				<li>
					<a href='#about'>About</a>
				</li>
				<li>
					<a href='#experience'>Experience</a>
				</li>
				<li>
					<a href='#services'>Services</a>
				</li>
				<li>
					<a href='#portfolio'>Portfolio</a>
				</li>
				<li>
					<a href='#contact'>Contact</a>
				</li>
			</ul>

			<div className='footer__socials'>
				<a href='https://www.facebook.com/elvis.fernandes.961556'>
					<FaFacebookF />
				</a>
				<a href='https://www.instagram.com/dj_smoke_aka_elvis/'>
					<FiInstagram />
				</a>
				<a href='https://www.instagram.com/dj_smoke_aka_elvis/'>
					<IoLogoTwitter />
				</a>
			</div>
			<div className='footer__copyright'>
				<small>
					&copy; Elvis Fernandes Portfolio. All rights reserved.
				</small>
			</div>
		</footer>
	);
};

export default Footer;

import React from 'react';
import './header.css';
import CTA from './CTA';
import ME from '../../assets/me.png';
import HeaderSocials from './HeaderSocials';
import Fade from 'react-reveal/Fade';

const Header = () => {
	return (
		<header>
			<div className='container header__container' id='home'>
				<h5>Hello I'm</h5>
				<h1>Elvis Fernandes</h1>
				<h5 className='text-light text-animated'>
					A UI-UX Designer &amp; Front-End Developer...
				</h5>
				<CTA />
				<HeaderSocials />
				<div className='me'>
					<Fade bottom duration={1500}>
						<img src={ME} alt='Elvis Fernandes' />
					</Fade>
				</div>

				<a href='#contact' className='scroll__down'>
					Scroll Down
				</a>
			</div>
		</header>
	);
};

export default Header;

import React from 'react';
import { BsLinkedin, BsDribbble, BsBehance } from 'react-icons/bs';

const HeaderSocials = () => {
	return (
		<div className='header__socials'>
			<a
				href='https://www.linkedin.com/in/elvisfdesign/'
				target='_blank'
				rel='noreferrer'
			>
				<BsLinkedin />
			</a>

			<a href='https://www.behance.net/' target='_blank' rel='noreferrer'>
				<BsBehance />
			</a>
			<a
				href='https://dribbble.com/elvisfdesign/shots'
				target='_blank'
				rel='noreferrer'
			>
				<BsDribbble />
			</a>
		</div>
	);
};

export default HeaderSocials;

import React from 'react';
import './nav.css';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { useState } from 'react';

const Nav = () => {
	const [activeNav, setActiveNav] = useState('#');

	return (
		<nav>
			<a
				href='# '
				onClick={() => setActiveNav('#')}
				className={activeNav === '#' ? 'active' : ''}
				data-tooltip='Home'
			>
				<AiOutlineHome />
			</a>
			<a
				href='#about'
				onClick={() => setActiveNav('#about')}
				className={activeNav === '#about' ? 'active' : ''}
				data-tooltip='About'
			>
				<AiOutlineUser />
			</a>
			<a
				href='#experience'
				onClick={() => setActiveNav('#experience')}
				className={activeNav === '#experience' ? 'active' : ''}
				data-tooltip='Experience'
			>
				<BiBook />
			</a>
			<a
				href='#services'
				onClick={() => setActiveNav('#services')}
				className={activeNav === '#services' ? 'active' : ''}
				data-tooltip='Services'
			>
				<RiServiceLine />
			</a>
			<a
				href='#contact'
				onClick={() => setActiveNav('#contact')}
				className={activeNav === '#contact' ? 'active' : ''}
				data-tooltip='Contact'
			>
				<BiMessageSquareDetail />
			</a>
		</nav>
	);
};

export default Nav;

import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';
import styled from 'styled-components';

const StyledImage = styled.img`
	width: 50px;
	border-radius: 50%;
	alignitems: center;
`;

const StyledLi = styled.li`
	display: flex;
	alignitems: center;
	margin-left: 1px;
`;

const Navbar = ({ icon, title }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<StyledLi>
				<StyledImage
					className="userProfile"
					src={user && user.avatar}
					alt="image of user"
				/>
			</StyledLi>
			<StyledLi>
				<a onClick={onLogout} href="#!">
					<i className="fas fa-sign-out-alt"></i>
					<span className="hide-sm">logout</span>
				</a>
			</StyledLi>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} />
				{` ${title}`}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
};

export default Navbar;

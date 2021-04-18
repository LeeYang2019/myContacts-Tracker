import React, { Fragment, useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/ContactContext';
import Spinner from '../layout/Spinner';

const Contacts = ({ url }) => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, getContact, loading } = contactContext;

	useEffect(() => {
		getContact();
		//eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames="item"
									url={url}
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames="item"
									url={url}
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;

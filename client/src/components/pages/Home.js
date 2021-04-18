import React, { useContext, useEffect } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';
import Button from '../../utils/Button';

const Home = () => {
	const { url, path } = useRouteMatch();

	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		//eslint-disable-next-line
	}, []);

	const props = { url, path };

	return (
		<div className="grid-2-3">
			<div>
				<ContactFilter />
				<Button />
				<Contacts {...props} />
			</div>
			<div>
				<Switch>
					<Route exact path="/" component={ContactForm} />
					<Route exact path="/addContacts" component={ContactForm} />
					<Route exact path="/contact/:id" component={ContactForm} />
				</Switch>
			</div>
		</div>
	);
};

export default Home;

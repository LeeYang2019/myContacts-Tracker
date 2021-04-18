import React, { useContext, useEffect } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';
import Button from '../../utils/Button';

const Profile = () => {
	const { url, path } = useRouteMatch();

	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="grid-2-3">
			<div>
				<ContactFilter />
				<Button url={url} />
				<Contacts url={url} />
			</div>
			<div>
				<Switch>
					{/* <Route exact path={`${path}/`} component={ContactForm} /> */}
					<Route exact path={`${path}/addContacts`} component={ContactForm} />
					<Route exact path={`${path}/contacts/:id`} component={ContactForm} />
				</Switch>
			</div>
		</div>
	);
};

export default Profile;

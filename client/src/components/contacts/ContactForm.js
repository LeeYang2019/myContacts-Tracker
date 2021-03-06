import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import { useRouteMatch } from 'react-router-dom';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const { url, path } = useRouteMatch();
	const { addContact, updateContact, current, clearCurrent } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
	}, [contactContext, current]); //update when these change

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	const { name, email, phone, type } = contact;

	//update contact and display changes
	const onChange = (e) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	//submit changes to be stored
	const onSubmit = (e) => {
		e.preventDefault();

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<>
			<h4>url: {url}</h4>
			<h4>path: {path}</h4>
			<form onSubmit={onSubmit}>
				<h2 className="text-primary">
					{current ? 'Edit Contact' : 'Add Contact'}
				</h2>
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={name}
					onChange={onChange}
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={email}
					onChange={onChange}
				/>
				<input
					type="text"
					placeholder="Phone"
					name="phone"
					value={phone}
					onChange={onChange}
				/>
				{/* <IntlTelInput
				value={phone}
				onPhoneNumberChange={onChange}
				// onPhoneNumberBlur={onBlur()}
			/> */}
				<h5>Contact Type</h5>
				<input
					type="radio"
					name="type"
					value="personal"
					checked={type === 'personal'}
					onChange={onChange}
				/>
				Personal{' '}
				<input
					type="radio"
					name="type"
					value="professional"
					checked={type === 'professional'}
					onChange={onChange}
				/>
				Professional{' '}
				<div>
					<input
						type="submit"
						value={current ? 'Update Contact' : 'Add Contact'}
						className="btn btn-primary btn-block"
					/>
				</div>
				{current && (
					<div>
						<button className="btn btn-light btn-block" onClick={clearAll}>
							Clear
						</button>
					</div>
				)}
			</form>
		</>
	);
};

export default ContactForm;

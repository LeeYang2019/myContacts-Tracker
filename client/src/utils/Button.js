import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ButtonComp = ({ url }) => {
	return (
		<Link to={`${url}/addContacts`}>
			<Button variant="contained" color="primary">
				Add Contact
			</Button>
		</Link>
	);
};

export default ButtonComp;

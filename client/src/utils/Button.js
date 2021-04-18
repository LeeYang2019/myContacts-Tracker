import React from 'react';
import { Button } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

const ButtonComp = () => {
	const { url } = useRouteMatch();

	return (
		<Button variant="contained" color="primary">
			Add Contact
		</Button>
	);
};

export default ButtonComp;

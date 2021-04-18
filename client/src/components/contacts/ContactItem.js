import React, { useContext } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 5,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
		backgroundColor: 'rgba(255,255,255,.75)',
	},
	image: {
		width: '75px',
		height: '75px',
	},
	img: {
		borderRadius: '50%',
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	button: {
		borderRadius: '10%',
		padding: '0.125rem 0.75rem',
		marginRight: '.75rem',
		fontSize: '.75rem',
	},
}));

const ContactItem = ({ contact, url }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;

	const { _id, name, email, avatar, phone, type } = contact;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Link to={`${url}/contact/${_id}`}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<ButtonBase className={classes.image}>
								<img className={classes.img} alt="complex" src={avatar} />
							</ButtonBase>
						</Grid>
						<Grid item xs={8} sm container>
							<Grid item xs container direction="column" spacing={1}>
								<Grid item xs>
									<Typography gutterBottom variant="subtitle1">
										{name}
									</Typography>
									<Typography variant="body2" gutterBottom>
										{email}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										{phone}
									</Typography>
								</Grid>
								{/* <Grid item>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									disableElevation
									onClick={() => setCurrent(contact)}
								>
									<i className="fas fa-edit"></i> Edit
								</Button>
								<Button
									className={classes.button}
									variant="contained"
									color="secondary"
									disableElevation
									onClick={onDelete}
								>
									<i className="fas fa-trash"></i> Delete
								</Button>
							</Grid> */}
							</Grid>
							{/* <Grid item>
							<Typography variant="subtitle1">{type}</Typography>
						</Grid> */}
						</Grid>
					</Grid>
				</Paper>
			</Link>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItem;

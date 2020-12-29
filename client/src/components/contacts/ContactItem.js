import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 25,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		borderRadius: '50%',
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
}));

const ContactItem = ({ contact }) => {
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
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="complex" src={avatar} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
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
							<Grid item>
								<button
									className="btn btn-dark btn-sm"
									onClick={() => setCurrent(contact)}
								>
									<i className="fas fa-edit"></i> Edit
								</button>
								<button className="btn btn-danger btn-sm" onClick={onDelete}>
									<i className="fas fa-trash"></i> Delete
								</button>
							</Grid>
						</Grid>
						<Grid item>
							<Typography variant="subtitle1">{type}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItem;

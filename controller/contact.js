const Contact = require('../modals/Contact');

export const getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.status(200).json(contacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
};

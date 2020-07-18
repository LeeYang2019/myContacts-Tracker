const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//modals
const User = require('../modals/User');
const Contact = require('../modals/Contact');

// @route    GET api/contacts
// @desc     Get all user contacts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route    DELETE api/contacts/:id
// @desc     delete contact
// @access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;

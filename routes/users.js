const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../modals/User');

// @route    POST api/users
// @desc     Register users
// @access   Public
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a passwrod with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //store errors
    const errors = validationResult(req);

    //if there are errors
    if (!errors.isEmpty()) {
      //return status 400 and json array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('body', req.body);

    const { name, email, password } = req.body;

    try {
      //check to see if user with email already exists
      let user = await User.findOne({ email });

      if (user) {
        console.log(`${user.email} already exists`);
        return res.status(400).json({ msg: 'User already exists' });
      }

      //create a new user modal
      user = new User({ name, email, password });

      //hash the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

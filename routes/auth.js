const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../modals/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
// pass in middleware to protect the route
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Private
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //get email and password from the req.body
    const { email, password } = req.body;

    try {
      //find user by his/her email
      let user = await User.findOne({ email });

      //if user does not exist
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //return true or false if the passwords match
      const isMatch = await bcrypt.compare(password, user.password);

      //if false
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //otherwise
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

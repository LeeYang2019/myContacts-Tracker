const express = require('express');
const router = express.Router();

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.post('/', (req, res) => {
  res.send('Register new user');
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Private
router.get('/', (req, res) => {
  res.post('Login user');
});

module.exports = router;

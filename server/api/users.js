const express = require('express');
const usersLogic = require('../logic/users');
const router = express.Router();
const auth = require('../middleware/auth');

// @route    GET api/users
// @desc     Authenticate user
// @access   Public
router.get('/', auth, async (req, res, next) => {
  try {
    if (req.user.id) {
      const user = await usersLogic.getUserById(req.user.id);
      return res.json(user);
    }
    res.send(false);
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/users
// @desc      Register new user
// @access    Public
router.post('/', async (req, res, next) => {
  let newUser = req.body;
  newUser = { ...newUser, type: 'USER' };

  try {
    await usersLogic.register(newUser);
    res.send('User registered');
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/users/login
// @desc      Login user
// @access    Public
router.post('/login', async (req, res, next) => {
  const user = req.body;
  try {
    const successfulLoginData = await usersLogic.login(user);
    res.json(successfulLoginData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

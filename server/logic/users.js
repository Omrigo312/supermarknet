const validator = require('validator');
const usersDao = require('../dao/users');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const bcrypt = require('bcryptjs');

const login = async (user) => {
  validateLoginData(user);

  const authorizedUser = await usersDao.login(user);
  const isMatch = await bcrypt.compare(user.password, authorizedUser.password);

  if (!isMatch) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  const payload = {
    user: {
      id: authorizedUser.id,
    },
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtTimeout });
  return { token, userType: authorizedUser.type };
};

const validateLoginData = (user) => {
  const { email, password } = user;
  if (!validator.isEmail(email)) throw new ServerError(ErrorType.INVALID_EMAIL);
  if (validator.isEmpty(password)) throw new ServerError(ErrorType.EMPTY_PASSWORD);
};

const register = async (newUser) => {
  await validateRegistrationData(newUser);

  // Encrypt the password using bcrypt
  const salt = await bcrypt.genSalt();
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await usersDao.register(newUser);
};

const validateRegistrationData = async (user) => {
  const { id, email, password, city, street, firstName, lastName } = user;
  if (await usersDao.isUserExists(email)) throw new ServerError(ErrorType.USER_ALREADY_EXISTS);
  if (!validator.isEmail(email)) throw new ServerError(ErrorType.INVALID_EMAIL);
  if (!validator.isLength(password, { min: 6, max: 30 })) throw new ServerError(ErrorType.INVALID_PASSWORD);
  if (!validator.isLength(street, { min: 1, max: 30 })) throw new ServerError(ErrorType.INVALID_ADDRESS);
  if (!validator.isLength(firstName, { min: 1, max: 25 })) throw new ServerError(ErrorType.INVALID_NAME);
  if (!validator.isLength(lastName, { min: 1, max: 25 })) throw new ServerError(ErrorType.INVALID_NAME);
  if (!config.cities.includes(city)) throw new ServerError(ErrorType.INVALID_ADDRESS);
  if (!isId(id)) throw new ServerError(ErrorType.INVALID_ID_NUMBER);
};

const isId = (id) => {
  if (!isNaN(id) || id.toString().length === 9) {
    return true;
  }
  return false;
};

const getUserById = async (userId) => {
  const user = await usersDao.getUserById(userId);
  return user;
};

module.exports = {
  login,
  register,
  getUserById,
};

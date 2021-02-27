const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const sql = 'SELECT * FROM users WHERE email =?';
  const parameters = [user.email];

  let loginResult;
  try {
    loginResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.SQL, `Error with user login: ${JSON.stringify(user)}`, error);
  }

  // User does not exist or incorrect password
  if (!loginResult || !loginResult.length) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  return loginResult[0];
};

const register = async (newUser) => {
  const { id, email, password, firstName, lastName, city, street, type } = newUser;
  const sql =
    'INSERT INTO users (id, email, password, first_name, last_name, city, street, type) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
  const parameters = [id, email, password, firstName, lastName, city, street, type];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.SQL, `Error with user registration: ${JSON.stringify(newUser)}`, error);
  }
};

const isUserExistsByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email =?';
  const parameters = [email];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    return results.length ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.SQL, `Error with checking if user email: ${email} exists`, error);
  }
};

const isUserExistsById = async (id) => {
  const sql = 'SELECT * FROM users WHERE id =?';
  const parameters = [id];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    return results.length ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.SQL, `Error with checking if user id: ${id} exists`, error);
  }
};

const getUserById = async (userId) => {
  const sql = 'SELECT id, email, first_name as firstName, last_name as lastName, city, street, type, FROM users WHERE id =?';
  const parameters = [userId];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    return results[0];
  } catch (error) {
    throw new ServerError(ErrorType.SQL, `Error with getting user: ${userId}`, error);
  }
};

const isUserAdmin = async (userId) => {
  const sql = 'SELECT * FROM users WHERE id =?';
  const parameters = [userId];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    const user = results[0];
    return user.type === 'ADMIN' ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.SQL, `Error with checking if user (${userId}) is admin`, error);
  }
};

module.exports = {
  login,
  register,
  isUserExistsByEmail,
  isUserExistsById,
  isUserAdmin,
  getUserById,
};

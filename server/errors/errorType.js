const Error = require('./Error');

const ErrorType = {
  SQL: new Error(600, 'General error.', true),
  USER_EMAIL_ALREADY_EXISTS: new Error(601, 'Email already used.', false),
  USER_ID_ALREADY_EXISTS: new Error(601, 'ID already used.', false),
  UNAUTHORIZED: new Error(401, 'Email or password is incorrect.', false),
  INVALID_EMAIL: new Error(602, 'Please include a valid email.', false),
  EMPTY_PASSWORD: new Error(602, 'A password is required.', false),
  INVALID_NAME: new Error(602, 'First name and last name must be under 25 characters.', false),
  INVALID_PASSWORD: new Error(602, 'Your password must be 6-30 characters long.', false),
  INVALID_ADDRESS: new Error(603, 'City must be one of the 10 mentioned cities. Street name cannot be empty.', false),
  INVALID_ID_NUMBER: new Error(603, 'Invalid ID number.', false),
  INVALID_IMAGE_URL: new Error(603, 'Invalid image URL. Leave empty or insert a correct image URL.', false),
  INVALID_PRICE: new Error(603, 'Please include a valid price', false),
  INVALID_START_DATE: new Error(603, 'Please include a valid start date.', false),
  INVALID_END_DATE: new Error(603, 'Please include a valid end date.', false),
  VACATION_NOT_FOUND: new Error(604, 'Cannot delete vacation. Not found.', true),
  INVALID_TOKEN: new Error(605, 'Invalid token', false),
  NO_TOKEN: new Error(605, 'No token', false),
  AUTHORIZATION: new Error(605, 'You are not an admin', false),
};

module.exports = ErrorType;

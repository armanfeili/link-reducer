const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEditProfileInput (data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.name, { min: 2, max: 300 })) {
    errors.name = 'Name should be more than 1 character';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

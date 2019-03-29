const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePasswordInput (data) {
  let errors = {};

  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
  data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';

  if (!Validator.isLength(data.oldPassword, { min: 6, max: 300 })) {
    errors.oldPassword = 'Password must be equal or more than 6 characters';
  }

  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = 'old password is required';
  }
  if (!Validator.isLength(data.newPassword, { min: 6, max: 300 })) {
    errors.newPassword = 'Password must be equal or more than 6 characters';
  }

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'new password is required';
  }
  if (!Validator.isLength(data.confirmNewPassword, { min: 6, max: 300 })) {
    errors.confirmNewPassword = 'Password must be equal or more than 6 characters';
  }

  if (Validator.isEmpty(data.confirmNewPassword)) {
    errors.confirmNewPassword = 'confirm new password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validator = require('validator'); // validate has a lot of built-in functions like isEmail(),isLength,...
const isEmpty = require('./is-empty'); // instead of installing lodash and use isEmpty() of that, we created that function.

module.exports = function validateLinkInput (data) { // it's just a function that when it called, it takes some data and make sure that it's as the way as we want
  let errors = {}; // we create an empty errors object, so if there was an error, it gets fill

  // the required things
  data.linkImported = !isEmpty(data.linkImported) ? data.linkImported : ''; // the isEmpty() method used here is the method we own created  

  if (validator.isEmpty(data.linkImported)) {
    errors.linkImported = 'A link is required!';
  }

  return {
    errors, // it means -> errors:errors , so if it's empty, it returns an empty object.
    isValid: isEmpty(errors) // and if it was empty,it returns true
  };
};

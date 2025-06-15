const Validator = require('validatorjs');

Validator.register('phone', function(value, requirement, attribute) { // requirement parameter defaults to null
  return value.match('\d\d\d-\d\d\d-\d\d\d\d');
}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
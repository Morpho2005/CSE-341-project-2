const validation = require('../helper/validate')

const userValidationRules = async (req, res, next) => {
  const validationRules = {
    "username": "required|string|email",
    "password": "required|string|min:5"
  };

  await validation(req.body, validationRules, {}, (err, status) => {
    if(!status){
      res.status(412)
        .send({
          success: false,
          message: 'validation falied',
          data: err
        })
    } else {
      next()
    }
  })
};

const contactValidationRules = async (req, res, next) => {
  const validationRules = {
    "name": "required|string|alpha",
    "number": "required|integer|digits:10"
  };

  await validation(req.body, validationRules, {}, (err, status) => {
    if(!status){
      res.status(412)
        .send({
          success: false,
          message: 'validation falied',
          data: err
        })
    } else {
      next()
    }
  })
};

module.exports = {
  userValidationRules,
  contactValidationRules,
}

const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('username').isEmail().withMessage('username must be an email'),
    body('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}

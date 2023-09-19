const { body,validationResult } = require('express-validator');

//validaing form

module.exports = [

// Validate password
body('otp')
  .notEmpty()
  .withMessage('Please Fill otp field')
  .isLength({ min: 4 })
  .withMessage('Otp must be 4 charactors'),
]
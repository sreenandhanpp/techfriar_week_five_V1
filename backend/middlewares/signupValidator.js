const { body,validationResult } = require('express-validator');
const newUser = require('../MongoDb/models/userModels/User.js');

//validaing form

module.exports = [
// Validate email
body('email')
.notEmpty()
.withMessage('Email is required')
.isEmail()
.withMessage('Invalid email address')
.custom(async (value) => {
  const user = await newUser.findOne({ email: value });
  if (user) {
    throw new Error('Email already exists');
  }
  return true;
})
    
    // .custom((value,{req}) => {
    //     if (value !== req.body.confirmPass) {
    //         // trow error if passwords do not match
    //         throw new Error("Passwords don't match");
    //     }
    //     return true;
    // })
]
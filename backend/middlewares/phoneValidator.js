const { body,validationResult } = require('express-validator');
const phoneUserSchema = require('../MongoDb/models/userModels/phoneUsers');


module.exports = [
    // Validate phone number
    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .isMobilePhone('any', { strictMode: false })
      .withMessage('Invalid phone number format')
      .custom(async (value) => {
        const existingNumber = await phoneUserSchema.findOne({ phone: value }).exec();
        if (existingNumber) {
          throw new Error('Phone number already exists');
        }
        return true;
      }),
  ];
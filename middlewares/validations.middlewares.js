const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

// Validations users
const createUserValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Must be a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ max: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ];

  const createRoomValidations = [
    body('name')
      .notEmpty()
      .withMessage('Name cannot be empty'),
    body('beds')
      .notEmpty()
      .withMessage('Beds cannot be empty'),
    body('bath')
      .notEmpty()
      .withMessage('Bath cannot be empty')
  ];

  const createReservationValidations = [
    body('daysOfStay')
      .notEmpty()
      .withMessage('Days of stay cannot be empty')
      .isNumeric()
      .withMessage('Must be of type number, min: 1, max: 30'),
    body('IdClient')
      .notEmpty()
      .withMessage('IdClient cannot be empty')
      .isString()
      .withMessage('Use only text'),
    body('amountPaid')
      .notEmpty()
      .withMessage('Amount Paid cannot be empty')
      .isFloat()
      .withMessage('Enter de amount with decimals'),
    body('paymentMethod')
      .notEmpty()
      .withMessage('payment Method cannot be empty')
      .isString()
      .withMessage('Use only text for the payment method'),
    body('status')
      .notEmpty()
      .withMessage('Status cannot be empty: choose pending, paid and deleted')
      .isString()
      .withMessage('Choose between pending, paid and deleted'),  
  ];

const checkValidations = (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);

        // [msg, msg, msg] -> 'msg. msg. msg'
        const errorMsg = messages.join('. ');

        return next(new AppError(errorMsg, 400));
    }
    next();
};

module.exports = {
    createUserValidations,
    createRoomValidations,
    createReservationValidations,
    checkValidations,
};
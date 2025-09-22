const { body, matchedData, validationResult } = require('express-validator');

const validateUser = [
  body('username')
    .notEmpty().withMessage('username is required').bail(),

  body('email')
    .notEmpty() 
    .withMessage('email is required').bail(),

  body('password')
    .notEmpty()
    .withMessage('password is required').bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body = matchedData(req);
    next();
  }
];

module.exports = validateUser;

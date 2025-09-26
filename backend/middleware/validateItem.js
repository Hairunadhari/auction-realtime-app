const { body, validationResult } = require("express-validator");

const validateItem = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .bail(),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .bail(),

  body("condition")
    .notEmpty()
    .withMessage("condition is required")
    .isIn(["new", "used"])
    .withMessage("condition must be 'new' or 'used'")
    .bail(),

  body("startingPrice")
    .notEmpty()
    .withMessage("startingPrice is required")
    .isNumeric()
    .withMessage("startingPrice must be a number")
    .bail(),

  body("estimatedValue")
    .optional()
    .isNumeric()
    .withMessage("estimatedValue must be a number")
    .bail(),

  (req, res, next) => {
    // validasi manual untuk file upload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        errors: [{ msg: "At least 1 image is required", param: "images" }],
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = validateItem;

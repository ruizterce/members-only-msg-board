const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const passwordLengthErr = "must be at least 6 characters long.";
const passwordMatchErr = "must match Password";
const emailErr = "must be a valid email address.";

const validateRegister = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage(`Username ${lengthErr}`),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password ${passwordLengthErr}`),

  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Confirm Password ${passwordMatchErr}`),

  body("first_name")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),

  body("last_name")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),

  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),
];

module.exports = validateRegister;

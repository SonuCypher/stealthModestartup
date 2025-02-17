const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { Users } = require("./model/userModel");

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports.validateSignUp = [
  body("name").isString().notEmpty().withMessage("username must be a string"),
  body("email")
    .isEmail()
    .isString()
    .notEmpty()
    .withMessage("email must include @"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password must be not be empty"),
  handleValidationErrors,
];
module.exports.validatelogin = [
  body("email")
    .isEmail()
    .isString()
    .notEmpty()
    .withMessage("email must include @"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password must be not be empty"),
  handleValidationErrors,
];
module.exports.userValidation = [
  body("email")
    .isEmail()
    .isString()
    .notEmpty()
    .withMessage("email must include @"),
  body("name")
    .isString()
    .notEmpty()
    .withMessage("name must be not be empty"),
  body("role")
    .isString()
    .notEmpty()
    .withMessage("role must be not be empty"),
  handleValidationErrors,
];

module.exports.jwtCheck = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("missing authorizaton");
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(401).json("invalid authorization");
    }
    const validUser = await Users.findById(decoded.id)
    if(!validUser) {
        return res.status(401).json("invalid user")
    }
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};

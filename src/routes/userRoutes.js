const express = require("express");
const {
  signUp,
  login,
  createUsers,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const {
  jwtCheck,
  validateSignUp,
  validatelogin,
  userValidation,
} = require("../middleware");
const router = express.Router();

router.post("/auth/signup", validateSignUp, signUp);
router.post("/auth/login", validatelogin, login);
router.post("/users", jwtCheck, userValidation, createUsers);
router.get("/users", jwtCheck, getAllUsers);
router.get("/users/:id", jwtCheck, getUser);
router.put("/users/:id", jwtCheck, userValidation, updateUser);
router.delete("/users/:id", jwtCheck, deleteUser);
module.exports = router;

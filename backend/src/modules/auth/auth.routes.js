const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);

module.exports = router;
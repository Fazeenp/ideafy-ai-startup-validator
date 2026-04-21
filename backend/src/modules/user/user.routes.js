const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const { getDashboard} = require("./user.controller");

router.get("/dashboard", auth, getDashboard);
module.exports = router;
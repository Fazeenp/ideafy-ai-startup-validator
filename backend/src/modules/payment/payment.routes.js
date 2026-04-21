const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const { createOrder, verifyPayment } = require("../payment/payment.controller");

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);

module.exports = router;
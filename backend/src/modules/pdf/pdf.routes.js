const express = require("express");
const router = express.Router();

const pdfController = require("./pdf.controller");
const auth = require("../../middleware/auth.middleware");

// Generate PDF report
router.get("/:id", auth, pdfController.generatePDF);

module.exports = router;
// src/modules/pdf/pdf.controller.js
const pdfService = require("./pdf.service");

const generatePDF = async (req, res) => {
  try {
    const ideaId = req.params.id;
    if (!ideaId) return res.status(400).json({ message: "Idea ID required" });

    // Now we pass only ideaId — service fetches from DB directly
    const pdfBuffer = await pdfService.generateIdeaPDF(ideaId);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=startup-report-${ideaId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.end(pdfBuffer);
  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ message: "Failed to generate PDF", error: err.message });
  }
};

module.exports = { generatePDF };
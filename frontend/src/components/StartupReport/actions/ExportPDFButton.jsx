// src/components/StartupReport/actions/ExportPDFButton.jsx
import React from "react";
import { FileDown } from "lucide-react";
import ActionButton from "./ActionButton";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExportPDFButton({ reportRef }) {
  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Single-page fit
    if (pdfHeight <= pdf.internal.pageSize.getHeight()) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    } else {
      // Multi-page
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) pdf.addPage();
      }
    }

    pdf.save("startup-report.pdf");
  };

  return (
    <ActionButton
      onClick={handleExportPDF}
      icon={FileDown}
      label="Export PDF"
      gradient="bg-gradient-to-r from-purple-600 to-indigo-600"
    />
  );
}

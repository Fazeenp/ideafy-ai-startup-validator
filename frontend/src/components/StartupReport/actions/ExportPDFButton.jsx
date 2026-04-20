// src/components/actions/ExportPDFButton.jsx
import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ExportPDFButton() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!id || loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/pdf/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `startup-report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${loading
          ? "bg-neutral-700 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md hover:shadow-purple-500/30"
        }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          Download Report
        </>
      )}
    </button>
  );
}
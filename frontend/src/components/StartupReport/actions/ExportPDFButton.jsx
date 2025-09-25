// src/components/StartupReport/actions/ExportPDFButton.jsx
import { FileDown } from "lucide-react";
import ActionButton from "./ActionButton";

export default function ExportPDFButton({ reportRef }) {

  return (
    <ActionButton
      onClick={onclick}
      icon={FileDown}
      label="Export PDF"
      gradient="bg-gradient-to-r from-purple-600 to-indigo-600"
    />
  );
}

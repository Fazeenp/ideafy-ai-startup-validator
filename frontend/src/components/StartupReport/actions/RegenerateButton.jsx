// src/components/StartupReport/actions/RegenerateButton.jsx
import { RefreshCw } from "lucide-react";
import ActionButton from "./ActionButton";

export default function RegenerateButton({ onClick }) {
  return (
    <ActionButton
      onClick={onClick}
      icon={RefreshCw}
      label="Regenerate"
      gradient="bg-gradient-to-r from-green-500 to-emerald-600"
    />
  );
}

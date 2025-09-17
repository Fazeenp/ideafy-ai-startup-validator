// src/components/StartupReport/actions/ShareButton.jsx
import { Share2 } from "lucide-react";
import ActionButton from "./ActionButton";

export default function ShareButton({ onClick }) {
  return (
    <ActionButton
      onClick={onClick}
      icon={Share2}
      label="Share Report"
      variant="outline"   
    />
  );
}

import { RefreshCw } from "lucide-react";
import ActionButton from "./ActionButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegenerateButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegenerate = async () => {
    setLoading(true);
    // simulate some delay (e.g. API call to regenerate)
    await new Promise(r => setTimeout(r, 500));
    setLoading(false);
    navigate('/form');
  };

  return (
    <ActionButton
      onClick={handleRegenerate}
      icon={RefreshCw}
      label={loading ? "Regenerating..." : "Regenerate"}
      gradient="bg-gradient-to-r from-green-500 to-emerald-600"
      disabled={loading}
    />
  );
}

// src/components/StartupReport/actions/ActionButton.jsx
import React from "react";

export default function ActionButton({ onClick, icon: Icon, label, gradient, variant = "solid" }) {
  const baseClasses =
    "w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer";

  const variants = {
    solid: `${gradient} text-white border-transparent shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`,
    outline:
      "border border-neutral-600 text-gray-300 hover:bg-neutral-700 hover:text-white",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );
}

import React from "react";

export function Button({
  className = "",
  variant = "default",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

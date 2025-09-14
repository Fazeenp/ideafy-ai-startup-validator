import React from "react";

export function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return (
    <div className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children }) {
  return (
    <h3
      className={`text-lg font-semibold text-gray-800 dark:text-gray-100 ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
}

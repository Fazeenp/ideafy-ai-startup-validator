import React from "react";
import { motion } from "framer-motion";
import LineChartComponent from "../charts/LineChartComponent";

export default function ProductValidation({ data }) {
  const metrics = data?.metrics || [
    { label: "Survey Positive",    value: "75%" },
    { label: "Waitlist Signups",   value: "1,200" },
    { label: "Retention Estimate", value: "68%" },
  ];

  const feedback = data?.feedback || [
    "Users value simplicity and intuitive UX above all features.",
    "Demand is high for integrations with existing productivity tools.",
    "Some concern around initial pricing — consider a free tier.",
  ];

  const metricColors = [
    { bg: "from-green-500/15 to-green-600/5", border: "border-green-500/20", value: "text-green-400" },
    { bg: "from-blue-500/15 to-blue-600/5",  border: "border-blue-500/20",  value: "text-blue-400" },
    { bg: "from-pink-500/15 to-pink-600/5",  border: "border-pink-500/20",  value: "text-pink-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pb-6 border-b border-white/6">
        <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-1">Validation</p>
        <h2 className="text-2xl font-bold text-white">Product Validation</h2>
        <p className="text-sm text-white/40 mt-1">Demand signals, user response, and feature traction</p>
      </div>

      {/* Summary */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Overview</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <p className="text-sm text-white/65 leading-relaxed">
            {data?.summary ||
              "Your product addresses a real customer pain point with clear demand signals. Preliminary validation shows a 75% positive response rate in surveys. However, feature prioritization and MVP clarity will be critical."}
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Validation Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((m, i) => {
            const c = metricColors[i % metricColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 rounded-2xl bg-gradient-to-b ${c.bg} border ${c.border} text-center`}
              >
                <p className={`text-3xl font-bold ${c.value} mb-1`}>{m.value}</p>
                <p className="text-xs text-white/45">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Chart */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Feature Interest Over Time</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <LineChartComponent
            data={data?.trends || [
              { month: "Jan", MVP: 20, Advanced: 10 },
              { month: "Feb", MVP: 30, Advanced: 15 },
              { month: "Mar", MVP: 45, Advanced: 25 },
            ]}
          />
        </div>
      </section>

      {/* User Feedback */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">User Feedback Highlights</h3>
        <div className="p-5 rounded-2xl bg-green-500/8 border border-green-500/15 space-y-3">
          {feedback.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
              <p className="text-sm text-white/65 leading-relaxed">{f}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Zap, AlertCircle, DollarSign } from "lucide-react";

const metricIcons = [TrendingUp, Zap, AlertCircle, DollarSign];
const metricColors = [
  { bg: "from-blue-500/15 to-blue-600/5", border: "border-blue-500/20", icon: "text-blue-400" },
  { bg: "from-green-500/15 to-green-600/5", border: "border-green-500/20", icon: "text-green-400" },
  { bg: "from-yellow-500/15 to-yellow-600/5", border: "border-yellow-500/20", icon: "text-yellow-400" },
  { bg: "from-purple-500/15 to-purple-600/5", border: "border-purple-500/20", icon: "text-purple-400" },
];

export default function ExecutiveOverview({ data }) {
  const metrics = data?.metrics || [
    { label: "Market Size",       value: "$2.3B" },
    { label: "Growth Rate",       value: "12% CAGR" },
    { label: "Competition Level", value: "Medium" },
    { label: "Funding Potential", value: "High" },
  ];

  const highlights = data?.highlights || [
    "Strong market growth potential in the target industry.",
    "Business model aligns with SaaS scalability principles.",
    "Requires differentiation strategy to stand out from competitors.",
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pb-6 border-b border-white/6">
        <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-1">Report</p>
        <h2 className="text-2xl font-bold text-white">Executive Overview</h2>
        <p className="text-sm text-white/40 mt-1">High-level summary of your startup's validation results</p>
      </div>

      {/* Summary */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Summary</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <p className="text-sm text-white/65 leading-relaxed">
            {data?.summary ||
              "This report provides a holistic evaluation of your startup idea. It covers the market opportunity, competition, product viability, financial potential, and strategic recommendations. Based on preliminary analysis, your concept shows strong feasibility with room for refinement in product positioning."}
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Key Metrics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const c = metricColors[i % metricColors.length];
            const Icon = metricIcons[i % metricIcons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 rounded-2xl bg-gradient-to-b ${c.bg} border ${c.border}`}
              >
                <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${c.icon}`}>
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <p className="text-lg font-bold text-white leading-tight">{m.value}</p>
                <p className="text-xs text-white/40 mt-1">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Highlights */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Highlights</h3>
        <div className="p-5 rounded-2xl bg-indigo-500/8 border border-indigo-500/15 space-y-3">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <p className="text-sm text-white/65 leading-relaxed">{h}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
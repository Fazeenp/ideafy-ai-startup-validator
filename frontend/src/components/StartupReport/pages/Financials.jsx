import React from "react";
import { motion } from "framer-motion";
import LineChartComponent from "../charts/LineChartComponent";

export default function Financials({ data }) {
  const kpis = data?.kpis || [
    { label: "CAC",       value: "$120",    sub: "Cost per customer" },
    { label: "LTV",       value: "$1,800",  sub: "Lifetime value" },
    { label: "Burn Rate", value: "$30K/mo", sub: "Monthly spend" },
  ];

  const insights = data?.insights || [
    "Strong LTV-to-CAC ratio of 15× indicates excellent scalability.",
    "Initial burn rate is sustainable with seed funding round.",
    "Upsell and expansion revenue could increase ARPU by 40%.",
  ];

  const kpiColors = [
    { bg: "from-yellow-500/15 to-yellow-600/5", border: "border-yellow-500/20", value: "text-yellow-400" },
    { bg: "from-green-500/15 to-green-600/5",  border: "border-green-500/20",  value: "text-green-400" },
    { bg: "from-red-500/15 to-red-600/5",      border: "border-red-500/20",    value: "text-red-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pb-6 border-b border-white/6">
        <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-1">Financials</p>
        <h2 className="text-2xl font-bold text-white">Financial Projections</h2>
        <p className="text-sm text-white/40 mt-1">Revenue outlook, key financial metrics, and sustainability</p>
      </div>

      {/* Summary */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Overview</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <p className="text-sm text-white/65 leading-relaxed">
            {data?.summary ||
              "The financial outlook suggests profitability within 18–24 months, assuming steady adoption and retention. Break-even is projected by Year 2 with recurring revenue growth from subscriptions."}
          </p>
        </div>
      </section>

      {/* KPIs */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Key Financial Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((m, i) => {
            const c = kpiColors[i % kpiColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 rounded-2xl bg-gradient-to-b ${c.bg} border ${c.border}`}
              >
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">{m.label}</p>
                <p className={`text-2xl font-bold ${c.value} mb-1`}>{m.value}</p>
                {m.sub && <p className="text-xs text-white/30">{m.sub}</p>}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Chart */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Revenue Projection (3 Years)</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <LineChartComponent
            data={data?.revenue || [
              { year: "Year 1", Revenue: 200000 },
              { year: "Year 2", Revenue: 750000 },
              { year: "Year 3", Revenue: 2000000 },
            ]}
          />
        </div>
      </section>

      {/* Insights */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Financial Insights</h3>
        <div className="p-5 rounded-2xl bg-yellow-500/8 border border-yellow-500/15 space-y-3">
          {insights.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
              <p className="text-sm text-white/65 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
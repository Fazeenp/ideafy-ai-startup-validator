import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import PieChartComponent from "../charts/PieChartComponent";
import RadarChartComponent from "../charts/RadarChartComponent";

export default function MarketCompetition({ data }) {
  const drivers = data?.drivers || [
    "Increased adoption of SaaS in SMEs",
    "Advancements in AI automation",
    "Remote work boosting digital solutions",
  ];

  const competitors = data?.competitors || [
    { name: "Competitor A", detail: "Strong in enterprise adoption with deep integrations." },
    { name: "Competitor B", detail: "Innovates with niche features and vertical focus." },
    { name: "Competitor C", detail: "Low-cost alternative targeting price-sensitive SMBs." },
  ];

  const insights = data?.insights || [
    "Your pricing strategy positions you as a cost-effective option.",
    "Competitors have stronger brand recognition in enterprise markets.",
    "Market entry barriers are lowering — differentiation is crucial.",
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pb-6 border-b border-white/6">
        <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-1">Analysis</p>
        <h2 className="text-2xl font-bold text-white">Market & Competition</h2>
        <p className="text-sm text-white/40 mt-1">Landscape overview, key players, and your competitive position</p>
      </div>

      {/* Summary */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Executive Summary</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <p className="text-sm text-white/65 leading-relaxed">
            {data?.summary ||
              "The market for AI-driven SaaS products is rapidly expanding with a CAGR of 12%. Competition is concentrated among three major players, while several smaller startups are entering the space with niche offerings."}
          </p>
        </div>
      </section>

      {/* Charts row */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Market Landscape</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
            <p className="text-sm font-medium text-white mb-4">Market Share Distribution</p>
            <PieChartComponent
              data={data?.stats || [
                { name: "Competitor A", value: 45 },
                { name: "Competitor B", value: 25 },
                { name: "Competitor C", value: 20 },
                { name: "Others",       value: 10 },
              ]}
            />
          </div>
          <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
            <p className="text-sm font-medium text-white mb-4">Growth Drivers</p>
            <div className="space-y-3 mt-2">
              {drivers.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-green-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitors */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Key Competitors</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-white/3 border border-white/6 hover:border-white/10 hover:bg-white/5 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                <span className="text-xs font-bold text-purple-400">{String.fromCharCode(65 + idx)}</span>
              </div>
              <h4 className="font-semibold text-sm text-white mb-1.5">{comp.name}</h4>
              <p className="text-xs text-white/45 leading-relaxed">{comp.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Radar */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Competitive Advantage Radar</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <RadarChartComponent
            data={data?.radar || [
              { aspect: "Pricing",     You: 8, Competitors: 6 },
              { aspect: "Innovation",  You: 7, Competitors: 8 },
              { aspect: "Support",     You: 9, Competitors: 7 },
              { aspect: "Scalability", You: 8, Competitors: 7 },
            ]}
          />
        </div>
      </section>

      {/* Insights */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Key Insights</h3>
        <div className="p-5 rounded-2xl bg-indigo-500/8 border border-indigo-500/15 space-y-3">
          {insights.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <p className="text-sm text-white/65 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
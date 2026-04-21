import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function Recommendations({ data }) {
  const actions = data?.actions || [
    { title: "Product",    tasks: ["Launch MVP", "Prioritize integrations", "Refine UX based on feedback"] },
    { title: "Growth",     tasks: ["Target SMEs first", "Leverage LinkedIn campaigns", "Build referral loops"] },
    { title: "Funding",    tasks: ["Prepare pitch deck", "Apply to Y Combinator", "Bootstrap to traction"] },
    { title: "Operations", tasks: ["Hire founding engineer", "Set up customer support", "Define KPI dashboard"] },
  ];

  const risks = data?.risks || [
    { risk: "High Competition",  mitigation: "Differentiate through niche features and superior UX." },
    { risk: "Funding Delays",    mitigation: "Build lean operations and extend runway through bootstrapping." },
    { risk: "Churn Risk",        mitigation: "Focus on onboarding quality and retention programs early." },
  ];

  const actionColors = [
    "border-purple-500/20 bg-purple-500/8",
    "border-blue-500/20 bg-blue-500/8",
    "border-green-500/20 bg-green-500/8",
    "border-yellow-500/20 bg-yellow-500/8",
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pb-6 border-b border-white/6">
        <p className="text-xs uppercase tracking-widest text-white/30 font-medium mb-1">Strategy</p>
        <h2 className="text-2xl font-bold text-white">Strategic Recommendations</h2>
        <p className="text-sm text-white/40 mt-1">Prioritized action plan and risk mitigation strategies</p>
      </div>

      {/* Summary */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Overview</h3>
        <div className="p-5 rounded-2xl bg-white/3 border border-white/6">
          <p className="text-sm text-white/65 leading-relaxed">
            {data?.summary ||
              "To succeed, the startup should focus on niche differentiation, building partnerships, and refining its pricing model. Early-stage focus should remain on user growth while preparing for seed funding."}
          </p>
        </div>
      </section>

      {/* Action Plan */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Action Plan</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {actions.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-2xl border ${actionColors[i % actionColors.length]}`}
            >
              <h4 className="font-semibold text-sm text-white mb-3">{cat.title}</h4>
              <div className="space-y-2">
                {cat.tasks.map((t, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="text-xs text-white/60">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Risks */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-white/30 font-medium mb-3">Risks & Mitigation</h3>
        <div className="space-y-3">
          {risks.map((r, i) => (
            <div key={i} className="p-5 rounded-2xl bg-red-500/6 border border-red-500/15 flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{r.risk}</p>
                <p className="text-xs text-white/50 leading-relaxed">{r.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Note */}
      <section>
        <div className="p-6 rounded-2xl bg-indigo-500/8 border border-indigo-500/15">
          <h3 className="text-sm font-semibold text-white mb-2">Final Assessment</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            {data?.finalNote ||
              "With disciplined execution, this startup has strong potential to secure market traction and attract investment within the next 12–18 months. Focus on rapid iteration and customer feedback in the early stages."}
          </p>
        </div>
      </section>
    </div>
  );
}
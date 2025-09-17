import React from "react";

export default function ExecutiveOverview({ data }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Executive Overview</h2>

      {/* Executive Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p className="text-neutral-300 leading-relaxed">
          {data.summary ||
            "This report provides a holistic evaluation of your startup idea. It covers the market opportunity, competition, product viability, financial potential, and strategic recommendations. Based on preliminary analysis, your concept shows strong feasibility with room for refinement in product positioning."}
        </p>
      </section>

      {/* Key Metrics Snapshot */}
      <section className="grid grid-cols-4 gap-4 mb-8">
        {(
          data.metrics || [
            { label: "Market Size", value: "$2.3B" },
            { label: "Growth Rate", value: "12% CAGR" },
            { label: "Competition Level", value: "Medium" },
            { label: "Funding Potential", value: "High" },
          ]
        ).map((m, i) => (
          <div
            key={i}
            className="bg-white/10 rounded-xl p-4 flex flex-col items-center"
          >
            <p className="text-lg font-bold">{m.value}</p>
            <p className="text-sm text-neutral-400">{m.label}</p>
          </div>
        ))}
      </section>

      {/* Highlights */}
      <section className="bg-indigo-900/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Highlights</h3>
        <ul className="list-disc list-inside text-neutral-200 space-y-1">
          <li>Strong market growth potential in the target industry.</li>
          <li>Business model aligns with SaaS scalability principles.</li>
          <li>Requires differentiation strategy to stand out from competitors.</li>
        </ul>
      </section>
    </div>
  );
}

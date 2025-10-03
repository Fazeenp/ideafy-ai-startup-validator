import React from "react";

export default function Recommendations({ data }) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">Strategic Recommendations</h2>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Overview</h3>
        <p className="text-neutral-300">
          {data.summary ||
            "To succeed, the startup should focus on niche differentiation, building partnerships, and refining its pricing model. Early-stage focus should remain on user growth while preparing for seed funding."}
        </p>
      </section>

      {/* Action Plan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {(data.actions || [
          {
            title: "Product",
            tasks: ["Launch MVP", "Prioritize integrations", "Refine UX"],
          },
          {
            title: "Growth",
            tasks: ["Target SMEs", "Leverage LinkedIn campaigns", "Build referral loops"],
          },
        ]).map((cat, i) => (
          <div
            key={i}
            className="bg-white/10 p-6 rounded-xl transition transform hover:scale-105 hover:bg-white/20"
          >
            <h4 className="font-semibold mb-2">{cat.title}</h4>
            <ul className="list-disc list-inside text-neutral-300 space-y-1">
              {cat.tasks.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Key Risks */}
      <section className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Risks & Mitigation</h3>
        <div className="bg-red-900/40 p-6 rounded-xl">
          <ul className="list-disc list-inside text-neutral-200 space-y-1">
            <li>
              <span className="font-semibold">High Competition:</span> Differentiate through niche features.
            </li>
            <li>
              <span className="font-semibold">Funding Delays:</span> Build lean operations and bootstrap longer.
            </li>
            <li>
              <span className="font-semibold">Churn Risk:</span> Focus on customer support and retention programs.
            </li>
          </ul>
        </div>
      </section>

      {/* Final Note */}
      <section className="bg-indigo-900/40 p-6 rounded-xl">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Final Note</h3>
        <p className="text-neutral-200">
          With disciplined execution, this startup has strong potential to secure market traction and attract investment within the next 12–18 months.
        </p>
      </section>
    </div>
  );
}

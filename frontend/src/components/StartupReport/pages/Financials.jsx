import React from "react";
import LineChartComponent from "../charts/LineChartComponent";

export default function Financials({ data }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Financial Projections</h2>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <p className="text-neutral-300">
          {data.summary ||
            "The financial outlook suggests profitability within 18-24 months, assuming steady adoption and retention. Break-even is projected by Year 2 with recurring revenue growth from subscriptions."}
        </p>
      </section>

      {/* Revenue Projections */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Revenue Projection (3 Years)</h3>
        <LineChartComponent
          data={data.revenue || [
            { year: "Year 1", Revenue: 200000 },
            { year: "Year 2", Revenue: 750000 },
            { year: "Year 3", Revenue: 2000000 },
          ]}
        />
      </section>

      {/* KPI Metrics */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        {(
          data.kpis || [
            { label: "CAC", value: "$120" },
            { label: "LTV", value: "$1,800" },
            { label: "Burn Rate", value: "$30K/mo" },
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

      {/* Financial Insights */}
      <section className="bg-yellow-900/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Insights</h3>
        <ul className="list-disc list-inside text-neutral-200 space-y-1">
          <li>Strong LTV-to-CAC ratio indicates scalability.</li>
          <li>Initial burn is sustainable with seed funding.</li>
          <li>Upsell potential could increase revenue per user.</li>
        </ul>
      </section>
    </div>
  );
}

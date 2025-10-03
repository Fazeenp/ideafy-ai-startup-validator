import React from "react";
import PieChartComponent from "../charts/PieChartComponent";
import RadarChartComponent from "../charts/RadarChartComponent";

export default function MarketCompetition({ data }) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">Market & Competition Analysis</h2>

      {/* Executive Summary */}
      <section className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Executive Summary</h3>
        <p className="text-neutral-300 leading-relaxed">
          {data.summary ||
            "The market for AI-driven SaaS products is rapidly expanding with a CAGR of 12%. Competition is concentrated among three major players, while several smaller startups are entering the space with niche offerings."}
        </p>
      </section>

      {/* Market Landscape */}
      <section className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">Market Landscape</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Market Share Chart */}
          <div className="bg-white/10 p-4 rounded-xl transition transform hover:scale-105 hover:bg-white/20">
            <h4 className="font-semibold mb-2 text-lg sm:text-xl">Market Share Distribution</h4>
            <PieChartComponent
              data={data.stats || [
                { name: "Competitor A", value: 45 },
                { name: "Competitor B", value: 25 },
                { name: "Competitor C", value: 20 },
                { name: "Others", value: 10 },
              ]}
            />
          </div>

          {/* Growth Factors */}
          <div className="bg-white/10 p-4 rounded-xl transition transform hover:scale-105 hover:bg-white/20">
            <h4 className="font-semibold mb-2 text-lg sm:text-xl">Growth Drivers</h4>
            <ul className="list-disc list-inside text-neutral-300 space-y-1">
              {data.drivers?.map((d, i) => <li key={i}>{d}</li>) || (
                <>
                  <li>Increased adoption of SaaS in SMEs</li>
                  <li>Advancements in AI automation</li>
                  <li>Remote work boosting digital solutions</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Competitor Breakdown */}
      <section className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">Key Competitors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(data.competitors || [
            { name: "Competitor A", detail: "Strong in enterprise adoption." },
            { name: "Competitor B", detail: "Innovates with niche features." },
            { name: "Competitor C", detail: "Low-cost alternative." },
          ]).map((comp, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-xl transition transform hover:scale-105 hover:bg-white/20">
              <h4 className="font-semibold">{comp.name}</h4>
              <p className="text-sm sm:text-base text-neutral-400">{comp.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitive Advantage Radar */}
      <section className="mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Competitive Advantage Radar</h3>
        <RadarChartComponent
          data={data.radar || [
            { aspect: "Pricing", You: 8, Competitors: 6 },
            { aspect: "Innovation", You: 7, Competitors: 8 },
            { aspect: "Support", You: 9, Competitors: 7 },
            { aspect: "Scalability", You: 8, Competitors: 7 },
          ]}
        />
      </section>

      {/* Key Insights */}
      <section className="bg-indigo-900/40 p-6 rounded-xl">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Key Insights</h3>
        <ul className="list-disc list-inside text-neutral-200 space-y-2">
          <li>Your pricing strategy positions you as a cost-effective option.</li>
          <li>Competitors have stronger brand recognition in enterprise markets.</li>
          <li>Market entry barriers are lowering, but differentiation is crucial.</li>
        </ul>
      </section>
    </div>
  );
}

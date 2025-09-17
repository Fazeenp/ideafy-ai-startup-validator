import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,BarChart,Bar,
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const COLORS = ["#5b06d4", "#f472b6", "#22c55e", "#eab308", "#3b82f6", "#ef4444"];
const THEME = {
  bg: "bg-slate-950 text-slate-200",
  card: "bg-slate-900/80 border border-slate-700 rounded-2xl shadow-lg",
  section: "p-6 bg-slate-800/40 rounded-xl border border-slate-700",
};

// ---- Demo Data ----
const demoData = {
  idea: {
    businessName: "EcoBox Solutions",
    tagline: "Sustainable packaging for a greener future.",
    category: "GreenTech",
    problem: "Plastic waste is polluting oceans and ecosystems.",
    solution: "Affordable, biodegradable packaging for e-commerce.",
  },
  score: 82,
  verdict: "High Potential, Ready for Scaling",
  updatedAt: "Sept 15, 2025",
  radarData: [
    { metric: "Market Potential", score: 85 },
    { metric: "Scalability", score: 78 },
    { metric: "Team Strength", score: 90 },
    { metric: "Funding Readiness", score: 72 },
    { metric: "Competition Risk", score: 55 },
  ],
  competition: [
    { name: "Startup A", marketShare: 35 },
    { name: "Startup B", marketShare: 25 },
    { name: "Startup C", marketShare: 20 },
    { name: "You", marketShare: 20 },
  ],
  financialProjection: [
    { year: 2024, revenue: 120, cost: 80 },
    { year: 2025, revenue: 250, cost: 150 },
    { year: 2026, revenue: 420, cost: 250 },
    { year: 2027, revenue: 650, cost: 350 },
    { year: 2028, revenue: 1000, cost: 500 },
  ],
  strengths: [
    "Innovative solution with clear market demand",
    "Strong founding team with prior exits",
    "Early traction in eco-conscious market",
  ],
  concerns: [
    "Competitive market with fast-moving players",
    "Requires significant funding for scaling",
    "Regulatory risks in sustainability claims",
  ],
  recommendations: [
    "Secure partnerships with e-commerce platforms",
    "Focus on B2B integrations for faster adoption",
    "Strengthen IP & compliance early",
  ],
  nextSteps: [
    "Finalize MVP in 3 months",
    "Launch beta with 500 users",
    "Pitch for Series A funding in 12 months",
    "Expand to EU market by Year 3",
  ],
};

export default function DetailedReport() {
  const [page, setPage] = useState(0);
  const reportRef = useRef();

  const exportPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("startup-report.pdf");
  };

  // --- Pages Content ---
  const pages = [
    // Page 1 - Idea Overview
    <div className="space-y-6" key="overview">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">{demoData.idea.businessName}</h1>
        <p className="italic text-slate-400 mt-2">{demoData.idea.tagline}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${THEME.section} text-center`}>
          <h2 className="text-2xl font-bold text-green-400">{demoData.score}</h2>
          <p>Validation Score</p>
        </div>
        <div className={`${THEME.section} text-center`}>
          <h2 className="text-xl font-bold">{demoData.verdict}</h2>
          <p>Verdict</p>
        </div>
        <div className={`${THEME.section} text-center`}>
          <h2 className="text-xl font-bold">{demoData.idea.category}</h2>
          <p>Category</p>
        </div>
        <div className={`${THEME.section} text-center`}>
          <h2 className="text-xl font-bold">{demoData.updatedAt}</h2>
          <p>Analyzed On</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={THEME.section}>
          <h3 className="text-lg font-semibold">Problem</h3>
          <p>{demoData.idea.problem}</p>
        </div>
        <div className={THEME.section}>
          <h3 className="text-lg font-semibold">Solution</h3>
          <p>{demoData.idea.solution}</p>
        </div>
      </div>
    </div>,

    // Page 2 - Market Analysis (Diagnostic Style)
<div className="space-y-8" key="market">
  <h2 className="text-3xl font-bold text-center">Market Analysis</h2>

  {/* Current Market Context */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Current Market Context</h3>
    <p className="text-slate-300">
      EcoBox operates in the growing eco-packaging industry, which is seeing 
      strong demand due to environmental regulations and consumer preferences. 
      The market is highly competitive with emerging startups and established 
      packaging companies moving towards sustainable alternatives.
    </p>
  </div>

  {/* Competition Insights */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className={THEME.section}>
      <h3 className="text-xl font-semibold mb-2">Competition Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={demoData.competition}
            dataKey="marketShare"
            nameKey="name"
            outerRadius={90}
            label
          >
            {demoData.competition.map((entry, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-sm text-slate-400 mt-2 text-center">
        EcoBox holds a foothold but faces pressure from larger players.
      </p>
    </div>
    <div className={THEME.section}>
      <h3 className="text-xl font-semibold mb-2">Opportunity Areas</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Expand into niche e-commerce packaging categories (fragile goods, fashion, food).</li>
        <li>Leverage regulatory bans on plastics as an entry accelerator.</li>
        <li>Position as a “compliance partner” for SMEs lacking sustainability expertise.</li>
      </ul>
    </div>
  </div>

  {/* Customer Segments */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Customer Segments</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={[
                { name: "SMEs", value: 55 },
                { name: "Enterprise", value: 35 },
                { name: "Consumers", value: 10 },
              ]}
              dataKey="value"
              outerRadius={90}
              label
            >
              {COLORS.map((color, i) => (
                <Cell key={i} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        <p><strong>SMEs (55%)</strong> → Biggest opportunity, often lack in-house sustainability expertise.</p>
        <p><strong>Enterprise (35%)</strong> → Slower to adopt but represent larger, longer contracts.</p>
        <p><strong>Consumers (10%)</strong> → Brand differentiation potential, but low-margin and fragmented.</p>
      </div>
    </div>
  </div>

  {/* Trends & Future Outlook */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Trends & Future Outlook</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>Eco-regulations are accelerating adoption across industries.</li>
      <li>SMEs seek plug-and-play packaging partners rather than in-house solutions.</li>
      <li>Future competition will shift towards innovation in materials and certifications.</li>
      <li>EcoBox can differentiate by integrating tech-driven supply chain traceability.</li>
    </ul>
  </div>
</div>
,
  
     
   // Page 3 - Product Validation (Full Expanded Page)
<div className="space-y-8" key="validation">
  <h2 className="text-3xl font-bold text-center">Product Validation</h2>

  {/* Overview */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Validation Overview</h3>
    <p className="text-slate-300">
      EcoBox has undergone early validation through pilot testing, expert reviews, 
      and market analysis. Results indicate strong product–market fit potential 
      with high scalability and team strength. Key risks involve funding and 
      regulatory challenges.
    </p>
  </div>

  {/* Radar Chart */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-4">Validation Scores</h3>
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart outerRadius="70%" data={demoData.radarData}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
        <PolarRadiusAxis stroke="#6b7280" />
        <Radar
          dataKey="score"
          stroke="#5b06d4"
          fill="#5b06d4"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>

  {/* Metric Deep Dive */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {demoData.radarData.map((item, idx) => (
      <div key={idx} className={THEME.section}>
        <h3 className="font-semibold">{item.metric}</h3>
        <p className="text-green-400 font-bold">{item.score}%</p>
        <p className="text-sm text-slate-400">
          {item.metric === "Market Potential" && "Large eco-packaging demand supports adoption."}
          {item.metric === "Scalability" && "Business model can expand across regions quickly."}
          {item.metric === "Team Strength" && "Experienced founders with prior exits."}
          {item.metric === "Funding Readiness" && "Needs stronger capital runway for scaling."}
          {item.metric === "Competition Risk" && "High activity in market; must differentiate."}
        </p>
      </div>
    ))}
  </div>

  {/* Strengths vs Gaps */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Strengths</h3>
      <ul className="list-disc list-inside space-y-1">
        {demoData.strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Concerns / Gaps</h3>
      <ul className="list-disc list-inside space-y-1">
        {demoData.concerns.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  </div>

  {/* Validation Milestones */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Validation Milestones</h3>
    <ol className="list-decimal list-inside space-y-1">
      <li>Completed 3 SME pilots with 65% repeat orders.</li>
      <li>Secured early sustainability certification for packaging materials.</li>
      <li>Collected 150+ customer survey responses showing 70% satisfaction.</li>
      <li>Featured in sustainability-focused media outlets.</li>
    </ol>
  </div>

  {/* Evidence Collected */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Evidence Collected So Far</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>Quantitative impact: reduced logistics waste costs by 25–30% in pilots.</li>
      <li>Qualitative feedback: strong eco-branding appeal across SMEs and consumers.</li>
      <li>Industry validation: positive reviews from sustainability experts.</li>
      <li>Market traction: small but growing repeat customer base.</li>
    </ul>
  </div>

  {/* What More Can Be Done */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Next Steps to Strengthen Validation</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>Expand validation beyond SMEs into at least 2 enterprise-scale pilots.</li>
      <li>Develop measurable sustainability KPIs (CO₂ saved, waste reduced).</li>
      <li>Formalize supply chain stress-testing for scalability assurance.</li>
      <li>Secure case studies and whitepapers to build trust with investors.</li>
      <li>Pursue industry-specific certifications to reduce adoption barriers.</li>
    </ul>
  </div>
</div>
,

    // Page 4 - Financial & Growth Potential (Full Expanded Page)
<div className="space-y-8" key="financials">
  <h2 className="text-3xl font-bold text-center">Financial & Growth Potential</h2>

  {/* Overview */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Overview</h3>
    <p className="text-slate-300">
      EcoBox demonstrates strong financial upside driven by rising eco-packaging 
      demand and regulatory support. Projections indicate rapid revenue growth with 
      break-even by 2026. Key challenges lie in managing capital requirements, 
      operational scale-up, and competition in a fast-evolving market.
    </p>
  </div>

  {/* Line Chart */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-4">Financial Projection</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={demoData.financialProjection}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
        <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
    <p className="mt-3 text-center text-sm text-slate-400">
      Projected revenues vs. costs (2024–2028). Break-even expected by 2026.
    </p>
  </div>

  {/* Key Highlights */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Key Highlights</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Break-even expected in <strong>2026</strong>.</li>
        <li>Revenue CAGR projected at <strong>35%</strong>.</li>
        <li>Total addressable market (TAM): <strong>$200B+</strong>.</li>
        <li>Capital requirement: <strong>$5M</strong> for scale-up.</li>
      </ul>
    </div>
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Growth Narrative</h3>
      <p>
        EcoBox expects exponential growth fueled by global regulatory pressure to 
        reduce plastics and the corporate push for ESG adoption. By 2028, 
        revenues are projected to cross <strong>$1B</strong>, driven by enterprise 
        contracts and international expansion.
      </p>
    </div>
  </div>

  {/* Growth Drivers vs. Risks */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Growth Drivers</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Global bans on single-use plastics accelerating adoption.</li>
        <li>Increasing B2B demand for eco-friendly logistics solutions.</li>
        <li>Early-mover advantage in scalable biodegradable packaging.</li>
        <li>Corporate ESG commitments driving procurement choices.</li>
      </ul>
    </div>
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Risks & Challenges</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>High upfront costs for scaling manufacturing capacity.</li>
        <li>Competitive risk from global packaging incumbents.</li>
        <li>Supply chain dependencies on sustainable raw materials.</li>
        <li>Potential regulatory shifts in eco-certifications.</li>
      </ul>
    </div>
  </div>

  {/* Milestones & Future Steps */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Growth Milestones & Next Steps</h3>
    <ol className="list-decimal list-inside space-y-1">
      <li><strong>2024:</strong> Secure $2M seed extension, expand SME pilots.</li>
      <li><strong>2025:</strong> Scale production capacity by 2×, onboard first enterprise clients.</li>
      <li><strong>2026:</strong> Reach break-even, enter EU market.</li>
      <li><strong>2027:</strong> Build strategic alliances with e-commerce platforms.</li>
      <li><strong>2028:</strong> Achieve $1B revenue milestone, expand to Asia-Pacific.</li>
    </ol>
  </div>

  {/* Bottom Highlight Banner */}
  <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl text-white text-center font-bold text-lg">
    Financial Outlook: Strong growth trajectory with high capital efficiency potential.
  </div>
</div>
,

   // Page 5 - Recommendations & Roadmap (Full Expanded Page)
<div className="space-y-8" key="recommendations">
  <h2 className="text-3xl font-bold text-center">Recommendations & Roadmap</h2>

  {/* Executive Summary */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Executive Summary</h3>
    <p className="text-slate-300">
      EcoBox is well-positioned to disrupt the eco-packaging industry but requires 
      strategic execution to sustain long-term growth. The following recommendations 
      focus on scaling operations, strengthening partnerships, advancing R&D, and 
      building a competitive moat.
    </p>
  </div>

  {/* Strategic Priorities */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Strategic Priorities</h3>
    <ul className="list-disc list-inside space-y-2">
      <li>
        <strong>Scale Operations:</strong> Invest in automated production to cut costs 
        and meet enterprise-level demand.
      </li>
      <li>
        <strong>Partnerships:</strong> Forge alliances with logistics companies, 
        e-commerce platforms, and regulatory agencies.
      </li>
      <li>
        <strong>Innovation:</strong> Expand R&D to diversify product lines 
        (biodegradable containers, compostable films).
      </li>
      <li>
        <strong>Brand Positioning:</strong> Leverage sustainability certifications and 
        ESG compliance as a key differentiator.
      </li>
    </ul>
  </div>

  {/* Roadmap Timeline */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-4">Roadmap (2024–2028)</h3>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
      <div className="p-4 rounded-lg bg-slate-800">
        <h4 className="font-bold text-green-400">2024</h4>
        <p className="text-sm">Secure funding, expand SME pilots, strengthen supply chain.</p>
      </div>
      <div className="p-4 rounded-lg bg-slate-800">
        <h4 className="font-bold text-green-400">2025</h4>
        <p className="text-sm">Scale manufacturing, acquire enterprise clients, 
        launch new R&D line.</p>
      </div>
      <div className="p-4 rounded-lg bg-slate-800">
        <h4 className="font-bold text-green-400">2026</h4>
        <p className="text-sm">Enter EU market, achieve break-even, expand team capacity.</p>
      </div>
      <div className="p-4 rounded-lg bg-slate-800">
        <h4 className="font-bold text-green-400">2027</h4>
        <p className="text-sm">Strategic partnerships with global logistics firms, 
        introduce consumer-facing line.</p>
      </div>
      <div className="p-4 rounded-lg bg-slate-800">
        <h4 className="font-bold text-green-400">2028</h4>
        <p className="text-sm">Hit $1B revenue, expand to Asia-Pacific, 
        solidify industry leadership.</p>
      </div>
    </div>
  </div>

  {/* Risks & Mitigation */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Key Risks</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>High production costs vs. cheaper plastic alternatives.</li>
        <li>Potential delays in scaling supply chain operations.</li>
        <li>Competitive risk from global incumbents with larger resources.</li>
        <li>Changing regulations or certifications impacting compliance.</li>
      </ul>
    </div>
    <div className={THEME.section}>
      <h3 className="font-semibold mb-2">Mitigation Strategies</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Invest early in automation to reduce cost per unit.</li>
        <li>Diversify suppliers across regions to avoid bottlenecks.</li>
        <li>Differentiate through certifications, patents, and ESG branding.</li>
        <li>Engage proactively with regulators and policy influencers.</li>
      </ul>
    </div>
  </div>

  {/* Action Checklist */}
  <div className={THEME.section}>
    <h3 className="text-xl font-semibold mb-2">Immediate Action Checklist (Next 12 Months)</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>Close $2M seed extension round by Q2 2024.</li>
      <li>Onboard at least 10 new SME clients as validation cases.</li>
      <li>Complete automation pilot in production facility.</li>
      <li>Launch R&D unit for biodegradable films by end of 2024.</li>
      <li>Secure first EU partnership for 2025 market entry.</li>
    </ul>
  </div>

  {/* Closing Highlight Banner */}
  <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl text-white text-center font-bold text-lg">
    Recommendation: Focus on operational scale-up + innovation while building a 
    defensible sustainability-driven brand moat.
  </div>
</div>,
  ];

  return (
    <div className={`${THEME.bg} min-h-screen flex flex-col items-center p-6 pt-30`}>
      <div ref={reportRef} className="w-full max-w-5xl space-y-8">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className={`${THEME.card} p-8`}
        >
          {pages[page]}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
          Previous
        </Button>
        <Button onClick={() => setPage((p) => Math.min(p + 1, pages.length - 1))} disabled={page === pages.length - 1}>
          Next
        </Button>
        <Button onClick={exportPDF} className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
          Export PDF
        </Button>
      </div>
    </div>
  );
} 
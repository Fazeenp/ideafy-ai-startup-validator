import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

const THEME = {
  bg: "bg-slate-950",
  card: "bg-slate-900/70 border border-slate-700",
  subtle: "text-slate-300",
  accentStart: "#5b06d4",
  accentEnd: "#bb4ba6",
};

const COLORS = ["#5b06d4", "#f472b6", "#22c55e", "#eab308", "#3b82f6", "#ef4444"];

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef();
  const { idea, result } = state || {};

  const handleExport = () => window.print();

  const data = result || {
    score: 72,
    verdict: "Promising with some risks",
    updatedAt: new Date().toLocaleDateString(),
    radarData: [
      { metric: "Market Potential", score: 78 },
      { metric: "Scalability", score: 70 },
      { metric: "Team Strength", score: 85 },
      { metric: "Funding Readiness", score: 60 },
      { metric: "Competition Risk", score: 50 },
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
    marketData: [
      { year: "2021", value: 100 },
      { year: "2022", value: 160 },
      { year: "2023", value: 240 },
      { year: "2024", value: 340 },
      { year: "2025", value: 500 },
    ],
    strengths: [
      "Innovative solution with clear market need",
      "Strong founding team with prior exits",
      "Early traction in eco-conscious market",
    ],
    concerns: [
      "Competitive market with fast-moving players",
      "Requires significant funding for scaling",
      "Regulatory risks in sustainability claims",
    ],
    recommendations: [
      "Secure strategic partnerships with e-commerce platforms",
      "Focus on B2B integrations for faster adoption",
      "Strengthen IP and regulatory compliance early",
    ],
    nextSteps: [
      "Finalize MVP in 3 months",
      "Launch beta with 500 users",
      "Pitch for Series A funding in 12 months",
      "Expand to EU market by Year 3",
    ],
  };

  if (!data || !idea)
    return (
      <div className={`${THEME.bg} min-h-screen flex items-center justify-center p-6 `}>
        <div className="max-w-2xl text-center">
          <h3 className="text-2xl font-semibold text-white">No report available</h3>
          <p className={`mt-2 text-sm ${THEME.subtle}`}>
            Run an analysis from the Ideafy submit page to see a full report.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button onClick={() => navigate("/form")}>Submit an Idea</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className={`${THEME.bg} min-h-screen p-6 pt-25`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`${THEME.card} p-4 text-center`}>
            <div className="text-xl font-bold text-white">{data.score}</div>
            <p className={`${THEME.subtle} mt-1`}>Validation Score</p>
          </Card>
          <Card className={`${THEME.card} p-4 text-center`}>
            <div className="text-xl font-bold text-white">{data.verdict}</div>
            <p className={`${THEME.subtle} mt-1`}>Verdict</p>
          </Card>
          <Card className={`${THEME.card} p-4 text-center hover:scale-105 transition-transform`}>
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {idea.businessName}
            </div>
            <p className={`${THEME.subtle} mt-1`}>Business</p>
          </Card>

          <Card className={`${THEME.card} p-4 text-center`}>
            <div className="text-xl font-bold text-white">{data.updatedAt}</div>
            <p className={`${THEME.subtle} mt-1`}>Analyzed On</p>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <Card className={`${THEME.card} p-4`}>
            <CardHeader><CardTitle className="text-lg text-white">Validation Breakdown</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={data.radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar name="Score" dataKey="score" stroke="#5b06d4" fill="#5b06d4" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Competition Chart */}
          <Card className={`${THEME.card} p-4`}>
            <CardHeader><CardTitle className="text-lg text-white">Competition Market Share</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.competition} dataKey="marketShare" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {data.competition.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Financial Projection */}
        <Card className={`${THEME.card} p-4`}>
          <CardHeader><CardTitle className="text-lg text-white">Financial Projections</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.financialProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Strengths & Concerns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={`${THEME.card} p-4`}>
            <CardHeader><CardTitle className="text-lg text-white">Key Strengths</CardTitle></CardHeader>
            <CardContent className="grid gap-2">
              {data.strengths.map((s, idx) => (
                <div key={idx} className="p-2 bg-slate-800/50 rounded text-slate-200">✅ {s}</div>
              ))}
            </CardContent>
          </Card>
          <Card className={`${THEME.card} p-4`}>
            <CardHeader><CardTitle className="text-lg text-white">Key Concerns</CardTitle></CardHeader>
            <CardContent className="grid gap-2">
              {data.concerns.map((c, idx) => (
                <div key={idx} className="p-2 bg-slate-800/50 rounded text-red-300">⚠️ {c}</div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations & Next Steps */}
        <Card className={`${THEME.card} p-4`}>
          <CardHeader><CardTitle className="text-lg text-white">Recommendations & Roadmap</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.recommendations.map((r, idx) => (
              <p key={idx} className="text-slate-200">💡 {r}</p>
            ))}
            <div className="mt-4 border-t border-slate-700 pt-2">
              {data.nextSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA / Action Buttons */}
        <Card className={`${THEME.card} p-6 text-center`}>
          <h3 className="text-lg font-bold mb-2">Next Actions</h3>
          <p className="text-slate-300 mb-4">Want deeper insights or validate another idea?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate("/form")}
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:scale-105 transition-transform"
            >
              Validate Another Idea
            </Button>
            <Button
              onClick={() => navigate("/pricing")}
              className="bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:scale-105 transition-transform"
            >
              Upgrade for Full Insights
            </Button>
            <Button onClick={handleExport} className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
              Export PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

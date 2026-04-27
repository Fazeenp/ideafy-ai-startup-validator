import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, CheckCircle, Building2, Target,
  Layers, Rocket, BarChart3, TrendingUp, Shield, DollarSign,
  Zap, Star, Users, ChevronRight
} from "lucide-react";

const STEPS = [
  { id: "idea",      label: "Idea",     icon: Building2 },
  { id: "market",    label: "Market",   icon: Target     },
  { id: "value",     label: "Value",    icon: Layers     },
  { id: "analyzing", label: "AI",       icon: Zap        },
  { id: "report",    label: "Report",   icon: BarChart3  },
];

const DEMO_IDEA = {
  name:        "EcoTrack",
  industry:    "Technology · SaaS",
  description: "An AI-powered carbon footprint tracker for SMEs that turns energy usage data into actionable sustainability reports and ESG compliance dashboards.",
  market:      "SMEs in manufacturing and logistics (10–500 employees) facing mandatory ESG reporting in EU markets by 2025.",
  problem:     "Manual carbon tracking is costly, error-prone, and time-consuming — most SMEs lack the resources to comply with new regulations.",
  uvp:         "Automated data ingestion from IoT sensors + instant ESG reports. 10× faster than manual methods, built for non-technical SME teams.",
  model:       "SaaS subscription — €199/month per company. Tiered by number of locations. Compliance add-on at €99/mo.",
};

const SCORE_BARS = [
  { label: "Market opportunity",  value: 91, color: "from-blue-400 to-blue-500"    },
  { label: "Product feasibility", value: 85, color: "from-purple-400 to-purple-500" },
  { label: "Financial viability", value: 80, color: "from-pink-400 to-pink-500"    },
  { label: "Risk assessment",     value: 72, color: "from-yellow-400 to-orange-500" },
];

const METRICS = [
  { label: "Market size",  value: "$4.2B",  color: "from-blue-500/15 to-blue-600/5",    border: "border-blue-500/20",    text: "text-blue-400"   },
  { label: "CAGR",         value: "18.4%",  color: "from-green-500/15 to-green-600/5",  border: "border-green-500/20",   text: "text-green-400"  },
  { label: "LTV / CAC",    value: "14.2×",  color: "from-yellow-500/15 to-yellow-600/5",border: "border-yellow-500/20",  text: "text-yellow-400" },
  { label: "Break-even",   value: "18 mo",  color: "from-purple-500/15 to-purple-600/5",border: "border-purple-500/20",  text: "text-purple-400" },
];

const RECOMMENDATIONS = [
  { title: "Launch MVP in EU first",         desc: "Target German and Dutch SMEs — highest ESG compliance pressure.",         dot: "bg-green-400"  },
  { title: "Partner with accountancy firms", desc: "Use existing SME relationships as a distribution channel.",                dot: "bg-blue-400"   },
  { title: "Freemium for first location",    desc: "Remove friction for sign-up — convert on multi-location expansion.",      dot: "bg-purple-400" },
];

const RISKS = [
  { label: "Regulation shift", desc: "ESG rules may change — build modular compliance modules." },
  { label: "Enterprise entry",  desc: "SAP and Oracle may build competing features — move fast." },
];

const ANALYSIS_STEPS = [
  "Market opportunity assessed",
  "Competitive landscape mapped",
  "Financial projections modelled",
  "Risk factors identified",
  "Recommendations generated",
];

// ─── Shared label style ───────────────────────────────────────────────────────
const Label = ({ children }) => (
  <p className="text-[10px] uppercase tracking-widest text-white/35 font-medium mb-2">
    {children}
  </p>
);

// ─── Read-only form field ─────────────────────────────────────────────────────
const Field = ({ children, multiline }) =>
  multiline ? (
    <div className="w-full px-4 py-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-sm text-white/70 leading-relaxed">
      {children}
    </div>
  ) : (
    <div className="w-full px-4 py-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-sm text-white/80">
      {children}
    </div>
  );

// ─── Step 1: Idea ─────────────────────────────────────────────────────────────
function StepIdea({ onNext }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Business name</Label>
        <Field>{DEMO_IDEA.name}</Field>
      </div>
      <div>
        <Label>Industry</Label>
        <Field>{DEMO_IDEA.industry}</Field>
      </div>
      <div>
        <Label>Business description</Label>
        <Field multiline>{DEMO_IDEA.description}</Field>
        <p className="text-[10px] text-white/25 mt-1.5 text-right">
          {DEMO_IDEA.description.length}/500
        </p>
      </div>
      <Nav onNext={onNext} nextLabel="Continue" hideBack />
    </div>
  );
}

// ─── Step 2: Market ───────────────────────────────────────────────────────────
function StepMarket({ onNext, onBack }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Target market</Label>
        <Field multiline>{DEMO_IDEA.market}</Field>
      </div>
      <div>
        <Label>Problem you're solving</Label>
        <Field multiline>{DEMO_IDEA.problem}</Field>
      </div>
      <Nav onNext={onNext} onBack={onBack} nextLabel="Continue" />
    </div>
  );
}

// ─── Step 3: Value ────────────────────────────────────────────────────────────
function StepValue({ onNext, onBack }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Unique value proposition</Label>
        <Field multiline>{DEMO_IDEA.uvp}</Field>
      </div>
      <div>
        <Label>Business model</Label>
        <Field multiline>{DEMO_IDEA.model}</Field>
      </div>
      <Nav onNext={onNext} onBack={onBack} nextLabel="Validate this idea" isSubmit />
    </div>
  );
}

// ─── Step 4: Analyzing ────────────────────────────────────────────────────────
function StepAnalyzing({ onDone }) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCompleted((c) => {
        if (c >= ANALYSIS_STEPS.length) {
          clearInterval(iv);
          setTimeout(onDone, 500);
          return c;
        }
        return c + 1;
      });
    }, 700);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center py-8 gap-6">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border border-pink-500/20 border-b-pink-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.6s" }} />
        <Zap className="absolute inset-0 m-auto w-5 h-5 text-purple-400" />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-white mb-1">Running full validation analysis</p>
        <p className="text-xs text-purple-400/70">
          {completed < ANALYSIS_STEPS.length
            ? ANALYSIS_STEPS[completed].replace("assessed", "...").replace("mapped", "...").replace("modelled", "...").replace("identified", "...").replace("generated", "...")
            : "Finalizing report..."}
        </p>
      </div>

      <div className="w-full max-w-sm space-y-2.5">
        {ANALYSIS_STEPS.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500 ${
              i < completed
                ? "bg-green-500/8 border border-green-500/15"
                : i === completed
                ? "bg-purple-500/8 border border-purple-500/20"
                : "bg-white/2 border border-white/5 opacity-40"
            }`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
              i < completed ? "bg-green-400/20" : i === completed ? "bg-purple-400/20 animate-pulse" : "bg-white/5"
            }`}>
              {i < completed
                ? <CheckCircle className="w-3 h-3 text-green-400" />
                : <div className={`w-1.5 h-1.5 rounded-full ${i === completed ? "bg-purple-400" : "bg-white/20"}`} />
              }
            </div>
            <span className={`text-xs ${i < completed ? "text-green-400/80" : i === completed ? "text-purple-300" : "text-white/30"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 5: Report ───────────────────────────────────────────────────────────
function StepReport({ navigate }) {
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      {/* Score header */}
      <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/3 border border-white/6">
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <motion.circle
              cx="32" cy="32" r="26"
              fill="none"
              stroke="url(#reportGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="163.4"
              initial={{ strokeDashoffset: 163.4 }}
              animate={{ strokeDashoffset: 163.4 * (1 - 0.87) }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="reportGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white">87</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-white/35 mb-1">Validation score</p>
          <p className="text-base font-semibold text-white mb-2">Strong market opportunity</p>
          <div className="flex flex-wrap gap-1.5">
            {["Market fit ✓", "Scalable ✓", "Low risk ✓"].map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/15">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="space-y-3">
        {SCORE_BARS.map((b, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-white/50">{b.label}</span>
              <span className="text-xs text-white/60 font-medium">{b.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                initial={{ width: 0 }}
                animate={{ width: barsVisible ? `${b.value}%` : 0 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {METRICS.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`p-4 rounded-2xl bg-gradient-to-b ${m.color} border ${m.border}`}
          >
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1.5">{m.label}</p>
            <p className={`text-lg font-bold ${m.text}`}>{m.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <div>
        <Label>Top recommendations</Label>
        <div className="space-y-2">
          {RECOMMENDATIONS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex gap-3 p-4 rounded-xl bg-white/2 border border-white/6"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${r.dot} mt-1.5 shrink-0`} />
              <div>
                <p className="text-xs font-medium text-white mb-0.5">{r.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div>
        <Label>Key risks</Label>
        <div className="space-y-2">
          {RISKS.map((r, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/12">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/15 shrink-0 h-fit mt-0.5">
                {r.label}
              </span>
              <p className="text-xs text-white/45 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blurred sections teaser */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="p-5 space-y-3 opacity-30 select-none pointer-events-none">
          <Label>Full competitor analysis</Label>
          <div className="h-24 rounded-xl bg-white/5 border border-white/6" />
          <Label>3-year financial projections</Label>
          <div className="h-16 rounded-xl bg-white/5 border border-white/6" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-neutral-950/60 rounded-2xl">
          <div className="text-center">
            <p className="text-sm font-medium text-white mb-1">4 more sections in your full report</p>
            <p className="text-xs text-white/40 mb-4">Competitor analysis · Financial projections · Business terms</p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black
                bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                shadow-lg shadow-pink-500/20 mx-auto cursor-pointer"
            >
              Unlock full report <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nav buttons ──────────────────────────────────────────────────────────────
function Nav({ onNext, onBack, nextLabel = "Continue", hideBack = false, isSubmit = false }) {
  return (
    <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/6">
      {!hideBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/40
            hover:text-white hover:bg-white/6 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      ) : <div />}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all
          ${isSubmit
            ? "text-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-lg shadow-pink-500/15"
            : "text-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-md shadow-pink-500/10"
          }`}
      >
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

// ─── Main Demo Page ───────────────────────────────────────────────────────────
export default function Demo() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const contentRef = useRef(null);

  const goTo = (n) => {
    setStep(n);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stepTitles = [
    { title: "Describe your startup idea", sub: "Step 1 of 3 — basics" },
    { title: "Market & problem analysis",  sub: "Step 2 of 3 — market" },
    { title: "Value proposition & model",  sub: "Step 3 of 3 — value" },
    { title: "AI is analyzing your idea",  sub: "Running validation..." },
    { title: "Your validation report",     sub: "EcoTrack · Score: 87/100" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Top banner */}
      <div className="bg-gradient-to-r from-yellow-400/8 via-pink-500/8 to-purple-500/8 border-b border-white/5 px-4 py-2.5 text-center">
        <p className="text-xs text-white/50">
          This is a live demo using a pre-filled example idea.{" "}
          <button onClick={() => navigate("/signup")} className="text-pink-400 hover:text-pink-300 font-medium cursor-pointer">
            Sign up free to validate your own →
          </button>
        </p>
      </div>

      {/* Hero */}
      <section className="pt-20 pb-10 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Interactive product demo
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            See Ideafy in{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              action
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-sm max-w-md mx-auto mb-8"
          >
            Walk through a real validation for EcoTrack — a carbon footprint SaaS for SMEs.
            See exactly what you get when you submit your idea.
          </motion.p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-12">
            {[
              { icon: Star,  label: "4.9 rating" },
              { icon: Users, label: "2,000+ ideas validated" },
              { icon: Zap,   label: "Results in 60s" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-white/30">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo wrapper */}
      <section className="max-w-2xl mx-auto px-4 pb-24" ref={contentRef}>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => step > i && goTo(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white"
                      : done
                      ? "bg-green-400/8 border border-green-400/20 text-green-400 cursor-pointer hover:opacity-80"
                      : "bg-white/3 border border-white/6 text-white/25 cursor-default"
                  }`}
                >
                  {done
                    ? <CheckCircle className="w-3.5 h-3.5" />
                    : <Icon className="w-3.5 h-3.5" />
                  }
                  {s.label}
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px min-w-[16px] transition-all duration-500 ${i < step ? "bg-green-400/25" : "bg-white/6"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-[10px] text-white/30 mb-2">
            <span>{stepTitles[step].sub}</span>
            <span>{Math.round(((step + 1) / STEPS.length) * 100)}% complete</span>
          </div>
          <div className="h-1 rounded-full bg-white/6 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Card */}
        <motion.div
          className="bg-neutral-900/80 backdrop-blur-xl border border-white/8 rounded-3xl p-6 sm:p-8 shadow-2xl"
          layout
        >
          {/* Card header */}
          <div className="mb-6 pb-5 border-b border-white/6">
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium mb-1">
              {STEPS[step].label}
            </p>
            <h2 className="text-xl font-bold text-white">{stepTitles[step].title}</h2>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {step === 0 && <StepIdea   onNext={() => goTo(1)} />}
              {step === 1 && <StepMarket onNext={() => goTo(2)} onBack={() => goTo(0)} />}
              {step === 2 && <StepValue  onNext={() => goTo(3)} onBack={() => goTo(1)} />}
              {step === 3 && <StepAnalyzing onDone={() => goTo(4)} />}
              {step === 4 && <StepReport navigate={navigate} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA below card */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-b from-white/3 to-transparent border border-white/6 text-center"
          >
            <p className="text-sm font-medium text-white mb-1">Ready to validate your own idea?</p>
            <p className="text-xs text-white/40 mb-5">3 free credits on signup · No card required · Results in 60 seconds</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/signup")}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-black
                  bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                  shadow-lg shadow-pink-500/20 cursor-pointer"
              >
                Start for free <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goTo(0)}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-medium
                  text-white/60 bg-white/5 border border-white/10
                  hover:text-white hover:bg-white/8 cursor-pointer transition-all"
              >
                Restart demo
              </motion.button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
























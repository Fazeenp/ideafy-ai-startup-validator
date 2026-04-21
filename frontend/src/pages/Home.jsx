import React from "react";
import { Hero } from "../components/Hero";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Target, Lightbulb, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const features = [
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "AI-powered analysis of market size, trends, and demand to validate before you build.",
      color: "from-pink-500/15 to-pink-600/5",
      border: "border-pink-500/15",
      iconColor: "text-pink-400",
      iconBg: "bg-pink-500/10",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Identify and quantify risks early — from competition to execution challenges.",
      color: "from-yellow-500/15 to-yellow-600/5",
      border: "border-yellow-500/15",
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
    },
    {
      icon: Lightbulb,
      title: "AI Guidance",
      description: "Receive concrete, actionable recommendations tailored to your specific idea.",
      color: "from-purple-500/15 to-purple-600/5",
      border: "border-purple-500/15",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      icon: Target,
      title: "Competitive Edge",
      description: "Understand your competitive landscape and where your unique advantages lie.",
      color: "from-blue-500/15 to-blue-600/5",
      border: "border-blue-500/15",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Submit your idea",
      desc: "Fill out a structured form covering your business, target market, problem, and unique value proposition.",
      detail: "Takes about 5 minutes",
    },
    {
      step: "02",
      title: "AI runs the analysis",
      desc: "Our model evaluates market potential, competition, financials, risks, and scores your idea across key dimensions.",
      detail: "Results in under 60 seconds",
    },
    {
      step: "03",
      title: "Get your full report",
      desc: "Receive an actionable startup report with scores, insights, recommendations, and next steps to move forward.",
      detail: "Exportable as PDF",
    },
  ];

  const testimonials = [
    {
      quote: "Ideafy saved me months of research. The AI report was more thorough than anything I could have produced myself.",
      name: "Priya Mehta",
      role: "Founder, EdTech startup",
      initials: "PM",
      color: "from-pink-500 to-purple-600",
    },
    {
      quote: "I validated 3 ideas in one afternoon. The competitive analysis alone was worth it — completely changed my direction.",
      name: "Arjun Singh",
      role: "Serial entrepreneur",
      initials: "AS",
      color: "from-yellow-400 to-pink-500",
    },
    {
      quote: "The scoring system and financial projections are surprisingly accurate. Pitched to investors with the report and got meetings.",
      name: "Sneha Rao",
      role: "MBA student, IIM",
      initials: "SR",
      color: "from-blue-400 to-purple-500",
    },
  ];

  const perks = [
    "Full executive overview",
    "Market size estimation",
    "Competitor analysis",
    "Financial projections",
    "Risk scoring",
    "Actionable recommendations",
    "PDF export",
    "Shareable report link",
  ];

  return (
    <div className="bg-neutral-950 text-white font-sans overflow-x-hidden">

      {/* Hero */}
      <Hero />

      {/* Features */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-400/80 mb-4">
              Why Ideafy
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                validate smarter
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base leading-relaxed">
              Don't spend months on ideas that won't work. Get AI-powered clarity in minutes.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={idx}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl bg-gradient-to-b ${f.color} border ${f.border} group cursor-default`}
              >
                <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 ${f.iconColor} group-hover:scale-110 transition-transform duration-200`}>
                  <f.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/6 to-transparent -translate-x-1/2 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400/80 mb-4">
              The Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              From idea to insight{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                in three steps
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base">
              No guesswork, no expensive consultants. Just structured AI analysis.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={idx}
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-white/2 border border-white/6 hover:border-white/10 hover:bg-white/3 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="text-6xl font-extrabold text-white/4 absolute top-6 right-6 select-none">
                  {item.step}
                </div>

                {/* Connector line (desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/10 z-10" />
                )}

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-500/20 border border-white/10 mb-5">
                    <span className="text-xs font-bold text-white/60">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-white text-base mb-3">{item.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-5">{item.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-green-400/70">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {item.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400/80 mb-4">
                What you get
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight mb-6">
                A complete startup{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  validation report
                </span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-8">
                Every submission generates a full multi-page report — not just a score.
                You get deep analysis across six sections so you can make real decisions.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {perks.map((perk, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    custom={i * 0.5}
                    viewport={{ once: true }}
                    className="flex items-center gap-2.5 text-sm text-white/60"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {perk}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — report preview card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
              <div className="relative p-6 rounded-2xl bg-neutral-900 border border-white/8 shadow-2xl space-y-4">
                {/* Report header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/6">
                  <div>
                    <p className="text-xs text-white/35 mb-0.5">Validation Report</p>
                    <p className="font-semibold text-sm">EcoTrack — Carbon Footprint App</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">87</p>
                    <p className="text-[10px] text-white/35">/ 100</p>
                  </div>
                </div>

                {/* Score bars */}
                {[
                  { label: "Market Opportunity", value: 90 },
                  { label: "Product Feasibility", value: 85 },
                  { label: "Financial Viability", value: 78 },
                  { label: "Risk Level", value: 72 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/50">{item.label}</span>
                      <span className="text-white/60 font-medium">{item.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                      />
                    </div>
                  </div>
                ))}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Strong demand ✓", "Scalable model ✓", "Low competition ✓", "Clear monetization ✓"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-green-400/8 text-green-400 border border-green-400/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400/80 mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Founders who validated{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                smarter
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={idx}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/2 border border-white/6 hover:border-white/10 transition-all duration-300 flex flex-col gap-5"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-sm text-white/55 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/35">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-b from-white/4 to-white/1 border border-white/8 overflow-hidden"
          >
            {/* BG glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-pink-500/5 to-purple-600/5 pointer-events-none" />

            <div className="relative">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-400/80 mb-4">
                Get started today
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Ready to validate your idea?
              </h2>
              <p className="text-white/45 text-base mb-10 max-w-lg mx-auto leading-relaxed">
                Join thousands of founders making smarter decisions with AI-powered startup analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(isLoggedIn ? "/form" : "/signup")}
                  className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-black text-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-xl shadow-pink-500/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  {isLoggedIn ? "Validate an Idea" : "Start Free"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/pricing")}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-medium text-white/60 bg-white/5 border border-white/10 hover:bg-white/8 hover:text-white transition-all text-sm cursor-pointer"
                >
                  View Pricing <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-white/25 text-xs mt-6">3 free credits on signup · No card required</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Submit Your Idea",
      desc: "Describe your startup idea in a structured form covering market, problem, solution, and business model.",
    },
    {
      step: "02",
      title: "AI Analysis",
      desc: "Our AI predicts market potential, competitive risks, financial viability, and scores your idea across six dimensions.",
    },
    {
      step: "03",
      title: "Get Insights",
      desc: "Receive a full validation report with actionable recommendations — exportable and shareable instantly.",
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Clarity over complexity",
      desc: "We turn overwhelming research into clear, structured insights that you can act on immediately.",
      color: "from-yellow-500/15 to-yellow-600/5",
      border: "border-yellow-500/15",
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
    },
    {
      icon: Target,
      title: "Speed with depth",
      desc: "We believe fast doesn't mean shallow. Our AI delivers thorough analysis in under a minute.",
      color: "from-pink-500/15 to-pink-600/5",
      border: "border-pink-500/15",
      iconColor: "text-pink-400",
      iconBg: "bg-pink-500/10",
    },
    {
      icon: Users,
      title: "Built for founders",
      desc: "Every feature is designed for the early-stage builder — whether first-time or experienced.",
      color: "from-purple-500/15 to-purple-600/5",
      border: "border-purple-500/15",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      icon: Zap,
      title: "Actionable output",
      desc: "We don't just score ideas — we give you concrete next steps, risks, and revenue strategies.",
      color: "from-blue-500/15 to-blue-600/5",
      border: "border-blue-500/15",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
  ];

  const stats = [
    { value: "2,000+", label: "Ideas validated" },
    { value: "< 60s", label: "Average analysis time" },
    { value: "6", label: "Report sections" },
    { value: "4.9★", label: "Founder rating" },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen overflow-x-hidden">

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* BG orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-pink-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-400/80 mb-6">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Built for founders who{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                move fast
              </span>
            </h1>
            <p className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
              Ideafy was created to give every innovator — regardless of background or budget —
              access to the kind of deep market analysis that was once reserved for funded teams and expensive consultants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-white/40">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400/80 mb-4">
                Our Mission
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight mb-6">
                Every great idea deserves{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  a fair shot
                </span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-6">
                Too many founders waste months — and sometimes years — on ideas that could have been validated in an afternoon.
                We built Ideafy to compress that feedback loop using AI.
              </p>
              <p className="text-white/45 text-base leading-relaxed mb-8">
                Whether you're a first-time entrepreneur or a seasoned builder exploring your next venture,
                Ideafy gives you the structured clarity to move forward with confidence.
              </p>
              <div className="space-y-3">
                {[
                  "Data-driven, not opinion-based analysis",
                  "Frameworks used by top accelerators",
                  "Accessible to anyone, anywhere",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  custom={idx}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-2xl bg-gradient-to-b ${v.color} border ${v.border}`}
                >
                  <div className={`w-9 h-9 rounded-xl ${v.iconBg} flex items-center justify-center mb-4 ${v.iconColor}`}>
                    <v.icon className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400/80 mb-4">
              How It Works
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              Three steps to{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                clarity
              </span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
              Designed to be fast, thorough, and immediately actionable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-white/5 via-white/10 to-white/5" />

            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={idx}
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-white/2 border border-white/6 hover:border-white/10 hover:bg-white/3 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-5xl font-extrabold text-white/4 select-none">
                  {item.step}
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/15 via-pink-500/15 to-purple-500/15 border border-white/10 mb-5">
                  <span className="text-xs font-bold text-white/50">{item.step}</span>
                </div>
                <h3 className="font-semibold text-white mb-3 text-base">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-b from-white/3 to-transparent border border-white/6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/4 via-pink-500/4 to-purple-600/4 pointer-events-none" />
            <div className="relative">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400/80 mb-4">
                Our Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                A world where every founder{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  starts with clarity
                </span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-8 max-w-xl mx-auto">
                We envision a future where no founder wastes years on ideas that don't fit the market —
                where AI guidance is as accessible as a Google search, and every great idea gets the chance it deserves.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/signup")}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-black text-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-xl shadow-pink-500/20 hover:opacity-95 transition-all cursor-pointer"
              >
                Start Validating Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
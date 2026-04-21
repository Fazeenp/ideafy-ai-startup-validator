import React from "react";
import { ArrowRight, TrendingUp, Shield, Target, Lightbulb, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero({ onStartValidation }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const features = [
    {
      title: "Market Insights",
      desc: "Validate demand before you build",
      icon: TrendingUp,
      color: "from-pink-500/20 to-pink-600/10",
      iconColor: "text-pink-400",
      border: "border-pink-500/15",
    },
    {
      title: "Risk Analysis",
      desc: "Spot threats before they hit",
      icon: Shield,
      color: "from-yellow-500/20 to-yellow-600/10",
      iconColor: "text-yellow-400",
      border: "border-yellow-500/15",
    },
    {
      title: "Competitive Edge",
      desc: "Know where you stand",
      icon: Target,
      color: "from-green-500/20 to-green-600/10",
      iconColor: "text-green-400",
      border: "border-green-500/15",
    },
    {
      title: "AI Guidance",
      desc: "Actionable next steps",
      icon: Lightbulb,
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-400",
      border: "border-blue-500/15",
    },
  ];

  const social = [
    { icon: Star, label: "4.9 rating" },
    { icon: Users, label: "2,000+ founders" },
    { icon: Zap, label: "Instant results" },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-neutral-950 text-white overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/3"
        style={{
          background: "conic-gradient(from 0deg, transparent 60%, rgba(236,72,153,0.08) 70%, transparent 80%)",
          borderRadius: "50%",
        }}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] translate-x-1/3 translate-y-1/4"
        style={{
          background: "conic-gradient(from 180deg, transparent 60%, rgba(139,92,246,0.08) 70%, transparent 80%)",
          borderRadius: "50%",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/4 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI-powered startup validation
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              Will Your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Idea
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 origin-left rounded-full"
                />
              </span>
              <br />
              <span className="text-white">Break the Market?</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Validate your startup in minutes — get a full AI analysis covering
              market fit, risks, revenue models, and actionable next steps.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/30 hover:opacity-95 transition-all duration-200 cursor-pointer text-sm"
              >
                {isLoggedIn ? "Go to Dashboard" : "Start for Free"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-white/70 bg-white/5 border border-white/10 hover:bg-white/8 hover:text-white transition-all duration-200 text-sm cursor-pointer"
              >
                View Demo
              </motion.button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              {social.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-white/35">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-5 rounded-2xl bg-gradient-to-b ${f.color} border ${f.border} backdrop-blur-sm cursor-default`}
              >
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${f.iconColor}`}>
                  <f.icon className="w-4.5 h-4.5" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">{f.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}

            {/* Score preview card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-2 p-5 rounded-2xl bg-white/3 border border-white/8 flex items-center gap-5"
            >
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <motion.circle
                    cx="32" cy="32" r="28"
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="175.9"
                    initial={{ strokeDashoffset: 175.9 }}
                    animate={{ strokeDashoffset: 175.9 * (1 - 0.82) }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-white">82</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Validation score</p>
                <p className="text-sm font-semibold text-white">Strong market opportunity</p>
                <div className="flex gap-2 mt-2">
                  {["Market fit ✓", "Scalable ✓", "Low risk ✓"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/15">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
    </section>
  );
}
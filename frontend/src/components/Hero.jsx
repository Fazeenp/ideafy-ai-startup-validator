import React from "react";
import { ArrowRight, TrendingUp, Shield, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero({ onStartValidation }) {
  const features = [
    { title: "Market Insights", icon: <TrendingUp className="h-5 w-5 text-white" />, color: "from-pink-500 to-pink-400" },
    { title: "Risk Management", icon: <Shield className="h-5 w-5 text-white" />, color: "from-yellow-400 to-yellow-300" },
    { title: "Competitive Edge", icon: <Target className="h-5 w-5 text-white" />, color: "from-green-400 to-green-300" },
    { title: "AI Guidance", icon: <Lightbulb className="h-5 w-5 text-white" />, color: "from-blue-400 to-blue-300" },
  ];
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      {/* Animated gradient blobs */}
      <motion.div
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute top-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-0 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 flex flex-col-reverse md:flex-row items-center gap-16">
        
        {/* Left Column */}
        <div className="md:w-1/2 text-center md:text-left z-10">
          <span className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            🚀 Startup Ready
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Will Your <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Idea</span><br />
            <span className="text-white">Break the Market?</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-md">
            Validate your startup in minutes with actionable insights, risk analysis, and AI guidance to launch smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              onClick={()=>navigate('/form')}
              whileHover={{ scale: 1.05 }}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full text-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-lg overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Try It Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-white/10 rounded-full animate-ping"></span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all"
            >
              View Demo
            </motion.button>
          </div>
        </div>

        {/* Right Column - Sleek Floating Cards */}
        <div className="md:w-1/2 relative z-10 flex flex-wrap justify-center gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`flex-1 min-w-[140px] p-5 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 shadow-lg transform hover:-translate-y-2 hover:shadow-${f.color}/50 transition-all duration-500 cursor-pointer`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 bg-gradient-to-br ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-white">{f.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Hero } from "../components/Hero";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    { title: "Market Insights", description: "AI-powered insights to grow smarter." },
    { title: "Risk Management", description: "Predict and mitigate potential risks." },
    { title: "AI Guidance", description: "Actionable recommendations instantly." },
    { title: "Competitive Edge", description: "Find what sets you apart early." },
  ];

  const steps = [
    { step: 1, title: "Submit Idea", desc: "Describe your idea in a few sentences." },
    { step: 2, title: "AI Analysis", desc: "Our AI predicts market potential and risks." },
    { step: 3, title: "Get Insights", desc: "Receive actionable validation instantly." },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="relative py-32">
        {/* Decorative blobs */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Why Choose Ideafy?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                className="bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl transform hover:-translate-y-3 hover:shadow-pink-500/30 transition-all cursor-pointer border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
                <p className="text-white/70">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-20">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-16 text-left">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl transform hover:-translate-y-3 hover:shadow-purple-500/30 transition-all cursor-pointer border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.3 }}
              >
                <div className="text-2xl font-bold mb-4">Step {item.step}</div>
                <h3 className="font-extrabold text-xl mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-32 text-center relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Validate Your Idea?
          </h2>
          <p className="mb-12 text-lg md:text-xl text-white/70">
            Start your journey today and turn your idea into reality.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Link
              to="/form"
              className="px-12 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black font-extrabold inline-flex items-center gap-3 text-lg shadow-lg transition-transform"
            >
              Try It Now <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

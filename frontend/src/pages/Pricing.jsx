import React from "react";
import { motion } from "framer-motion";

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for testing ideas",
      features: ["5 ideas per month", "Basic feasibility score", "Limited insights"],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "₹749 / mo",
      description: "For serious innovators",
      features: ["50 ideas per month", "Detailed AI analysis", "Actionable reports", "Priority support"],
      cta: "Upgrade Now",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "For teams and custom solutions",
      features: ["Unlimited ideas", "Team collaboration", "Custom AI model access", "Dedicated support"],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Pricing Plans
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          Simple, transparent pricing in INR, designed for innovators and entrepreneurs.
        </p>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 md:py-32 relative">
        {/* Smooth Background Blur for Flow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-10">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col justify-between p-10 rounded-3xl shadow-2xl border border-white/10 transform transition-transform hover:scale-105 ${
                tier.highlight
                  ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black shadow-pink-500/50"
                  : "bg-black/20 backdrop-blur-md text-white shadow-white/10"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div>
                <h3 className="font-extrabold text-2xl mb-2">{tier.name}</h3>
                <p className="text-lg mb-4">{tier.description}</p>
                <p className="text-4xl font-bold mb-6">{tier.price}</p>
                <ul className={`mb-8 space-y-3 ${tier.highlight ? "text-black/90" : "text-white/70"}`}>
                  {tier.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className="before:content-['✓'] before:text-green-400 before:mr-2 text-left"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`px-8 py-4 rounded-full font-bold shadow-lg transition-transform cursor-pointer ${
                  tier.highlight
                    ? "bg-black text-white"
                    : "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black "
                }`}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Validate Your Ideas?
        </h2>
        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Start your journey today and turn your ideas into successful startups with AI-powered insights.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-12 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black font-extrabold text-lg shadow-lg transition-transform cursor-pointer"
        >
          Try It Now
        </motion.button>
      </section>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const team = [
    { name: "Fazeen Patel", role: "Founder & Developer", img: "/path-to-your-image.jpg" },
    
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="py-24 text-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Ideafy</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          Empowering innovators to validate their startup ideas with AI-driven insights and actionable feedback.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center">
          Our Mission
        </h2>
        <p className="text-center text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
          At Ideafy, we believe every great idea deserves a chance. Our mission is to help innovators, students, and entrepreneurs assess the feasibility of their startup ideas quickly and efficiently using AI-powered analysis.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center">
          How We Work
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <motion.div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl font-bold mb-4">Step 1</div>
            <h3 className="font-extrabold text-xl mb-2">Submit Your Idea</h3>
            <p className="text-white/70">Describe your startup idea in a few sentences.</p>
          </motion.div>
          <motion.div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-2xl font-bold mb-4">Step 2</div>
            <h3 className="font-extrabold text-xl mb-2">AI Analysis</h3>
            <p className="text-white/70">Our AI predicts market potential, risks, and competitive edge.</p>
          </motion.div>
          <motion.div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-2xl font-bold mb-4">Step 3</div>
            <h3 className="font-extrabold text-xl mb-2">Get Insights</h3>
            <p className="text-white/70">Receive actionable validation and recommendations instantly.</p>
          </motion.div>
        </div>
      </section>

      {/* Team Section
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-10 justify-items-center">
          {team.map((member, idx) => (
            <motion.div key={idx} className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mb-4 object-cover mx-auto border-2 border-white/20" />
              <h3 className="font-extrabold text-xl">{member.name}</h3>
              <p className="text-white/70">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Our Vision</h2>
          <p className="text-white/70 text-lg md:text-xl">
            To empower innovators around the world to pursue impactful ideas confidently, saving time, effort, and resources while making smarter decisions with AI guidance.
          </p>
        </div>
      </section>
    </div>
  );
}

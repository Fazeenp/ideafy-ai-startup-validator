import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Shield, Target } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Line } from "recharts"; // optional, for simple trend chart

export default function Dashboard({ userIdeas = [] }) {
  const navigate = useNavigate();

  const statusCounts = {
    validated: userIdeas.filter(i => i.status === "Validated").length,
    inProgress: userIdeas.filter(i => i.status === "In Progress").length,
    rejected: userIdeas.filter(i => i.status === "Rejected").length,
  };

  // Placeholder chart data
  const trendData = userIdeas.map((i, idx) => ({
    name: i.title,
    score: i.score ?? 0,
  }));

  return (
    <div className="flex min-h-screen text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black/70 backdrop-blur-md border-r border-white/10 p-6 flex flex-col gap-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-black" onClick={() => navigate("/")}>
            All Ideas
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black" onClick={() => navigate("/form")}>
            + New Idea
          </Button>
          <Button className="bg-gradient-to-r from-green-400 to-blue-400 text-black" onClick={() => navigate("/analytics")}>
            Analytics
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-black" onClick={() => navigate("/resources")}>
            Resources
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 relative bg-gradient-to-b from-black via-gray-900 to-black p-8 overflow-y-auto pt-25">

        {/* Animated blobs */}
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

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Welcome Back, <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Innovator</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-black font-bold cursor-pointer">
              U
            </div>
            <Button className="bg-white/10 text-white hover:bg-white/20">Notifications</Button>
          </div>
        </div>

        {/* Progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <motion.div className="p-4 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10">
            <h3 className="font-semibold mb-2">Validated</h3>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-4 bg-green-400"
                style={{ width: `${(statusCounts.validated / userIdeas.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="text-gray-300 text-sm mt-1">{statusCounts.validated} ideas</span>
          </motion.div>

          <motion.div className="p-4 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10">
            <h3 className="font-semibold mb-2">In Progress</h3>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-4 bg-yellow-400"
                style={{ width: `${(statusCounts.inProgress / userIdeas.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="text-gray-300 text-sm mt-1">{statusCounts.inProgress} ideas</span>
          </motion.div>

          <motion.div className="p-4 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10">
            <h3 className="font-semibold mb-2">Rejected</h3>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-4 bg-red-400"
                style={{ width: `${(statusCounts.rejected / userIdeas.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="text-gray-300 text-sm mt-1">{statusCounts.rejected} ideas</span>
          </motion.div>
        </div>

        {/* User Ideas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userIdeas.map((idea, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 shadow-lg cursor-pointer hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-white font-semibold text-lg">{idea.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${idea.status === "Validated" ? "bg-green-500/50" : idea.status === "In Progress" ? "bg-yellow-500/50" : "bg-red-500/50"}`}>
                  {idea.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{idea.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-white/80 font-medium">Score: {idea.score ?? "N/A"}</span>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:opacity-90 text-sm px-3 py-1"
                  onClick={() => navigate(`/ideas/${idea.id}`)}
                >
                  View
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

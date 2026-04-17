import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000"; // ⚠️ keep backend port consistent

  // 🔥 FETCH DASHBOARD DATA
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/user/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch dashboard");
        }

        setData(result);
      } catch (err) {
        console.error(err);
        alert("Session expired or server error. Please login again.");
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div className="text-white p-10">Loading dashboard...</div>
    );
  }

  // 🚨 SAFE CHECK (prevents crashes)
  if (!data) {
    return (
      <div className="text-white p-10">
        No data found. Please login again.
      </div>
    );
  }

  const ideas = data?.ideas || [];

  // 📊 SAFE STATS CALCULATION
  const avgScore =
    ideas.length > 0
      ? Math.round(
          ideas.reduce((acc, curr) => acc + (curr.score || 0), 0) /
            ideas.length
        )
      : 0;

  const bestScore = ideas.length
    ? Math.max(...ideas.map((i) => i.score || 0))
    : 0;

  const userName = data?.user?.name || "User";
  const credits = data?.user?.credits ?? 0;

  return (
    <div className="flex min-h-screen text-white  ">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black/70 backdrop-blur-md border-r border-white/10 p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">StartupLens</h2>

        <button
          onClick={() => navigate("/form")}
          className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black py-2 rounded-lg"
        >
          + New Idea
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white/10 py-2 rounded-lg"
        >
          Dashboard
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="mt-auto bg-red-500/20 py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-gradient-to-b from-black via-gray-900 to-black p-8 overflow-y-auto pt-30">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome,{" "}
            <span className="text-pink-400">
              {userName}
            </span>
          </h1>

          <div className="bg-white/10 px-4 py-2 rounded-lg">
            💳 Credits: {credits}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <h3>Total Ideas</h3>
            <p className="text-2xl font-bold">{data?.totalIdeas || 0}</p>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <h3>Average Score</h3>
            <p className="text-2xl font-bold">{avgScore}</p>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <h3>Best Idea Score</h3>
            <p className="text-2xl font-bold">{bestScore}</p>
          </div>
        </div>

        {/* IDEAS */}
        <h2 className="text-xl mb-4">Your Ideas</h2>

        {ideas.length === 0 ? (
          <div className="text-gray-400">
            No ideas yet. Start by creating one 🚀
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => (
              <motion.div
                key={idea._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-black/50 rounded-xl border border-white/10 hover:scale-105 transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="text-yellow-400" />
                  <h3 className="font-semibold">{idea.title}</h3>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {idea.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-green-400">
                    Score: {idea.score ?? "N/A"}
                  </span>

                  <button
                    onClick={() => navigate(`/ideas/${idea._id}`)}
                    className="text-sm bg-pink-500 px-3 py-1 rounded"
                  >
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
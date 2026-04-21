import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lightbulb, BarChart2, Trophy, TrendingUp, CreditCard,
  LogOut, Plus, LayoutDashboard, History, ShoppingCart,
  Search, Filter, Menu, X, ChevronRight
} from "lucide-react";
import axios from "axios";
import logo from "../assets/ideafy_logo-removebg-preview.png";


axios.defaults.baseURL = "http://localhost:5000";

const statusConfig = {
  validated:   { label: "Validated",   color: "text-green-400 bg-green-400/10 border-green-400/20" },
  rejected:    { label: "Rejected",    color: "text-red-400 bg-red-400/10 border-red-400/20" },
  in_progress: { label: "In Progress", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
};

function getStatus(score) {
  if (!score) return "in_progress";
  if (score >= 70) return "validated";
  return "rejected";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/user/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const ideas = data?.ideas || [];
  const user = data?.user || {};
  const credits = user.credits ?? 0;
  const avgScore = data?.avgScore ?? 0;
  const bestScore = data?.bestScore ?? 0;
  const successRate = data?.successRate ?? 0;

  const filteredIdeas = ideas.filter((idea) => {
    const matchSearch =
      idea.title?.toLowerCase().includes(search.toLowerCase()) ||
      idea.description?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filterStatus === "all" || getStatus(idea.score) === filterStatus;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: "Total Ideas", value: data?.totalIdeas || 0, icon: Lightbulb,  color: "from-purple-500/20 to-purple-500/5",  iconColor: "text-purple-400" },
    { label: "Avg Score",   value: `${avgScore}/100`,     icon: BarChart2,   color: "from-blue-500/20 to-blue-500/5",     iconColor: "text-blue-400" },
    { label: "Best Score",  value: bestScore,              icon: Trophy,      color: "from-yellow-500/20 to-yellow-500/5", iconColor: "text-yellow-400" },
    { label: "Success Rate",value: `${successRate}%`,      icon: TrendingUp,  color: "from-green-500/20 to-green-500/5",   iconColor: "text-green-400" },
    { label: "Credits Left",value: credits,                icon: CreditCard,  color: "from-pink-500/20 to-pink-500/5",     iconColor: "text-pink-400" },
  ];

  const navItems = [
    { id: "overview", label: "Overview",  icon: LayoutDashboard },
    { id: "history",  label: "My Ideas",  icon: History },
  ];

  const Sidebar = () => (
    <aside className={`
      fixed z-50 top-0 left-0 h-full w-64
      bg-neutral-900/95 backdrop-blur-md
      border-r border-white/5
      flex flex-col shadow-2xl
      transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:static lg:translate-x-0
    `}>
      {/* Logo */}
      <div className="p-6 flex items-center justify-start border-b border-white/5 "
      >
         <img
                    src={logo}
                    alt="Ideafy Logo"
                    className="h-8 w-8 object-contain drop-shadow-md cursor-pointer"
                    onClick={() => navigate("/")}
                  />
        <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Ideafy
        </h2>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User info */}
      <div className="px-4 py-4 mx-3 mt-4 rounded-xl bg-white/5 border border-white/5">
        <p className="text-white font-medium truncate">{user.name || "User"}</p>
        <p className="text-white/40 text-xs truncate mt-0.5">{user.email}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <CreditCard className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-pink-400 text-xs font-medium">{credits} credits</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 mt-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
              activeTab === id
                ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="p-3 space-y-2 border-t border-white/5">
        <button
          onClick={() => navigate("/form")}
          disabled={credits === 0}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium
            bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black
            disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> New Idea
        </button>
        {credits === 0 && (
          <button
            onClick={() => navigate("/pricing")}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm
              bg-white/5 border border-pink-500/30 text-pink-400 hover:bg-pink-500/10 transition"
          >
            <ShoppingCart className="w-4 h-4" /> Buy Credits
          </button>
        )}
        <button
          onClick={() => { localStorage.clear(); navigate("/login"); }}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white pt-4">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar />

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/50 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">
                {activeTab === "overview" ? "Dashboard" : "My Ideas"}
              </h1>
              <p className="text-xs text-white/40">
                Welcome back, <span className="text-purple-400">{user.name}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/pricing")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <CreditCard className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 font-medium">{credits}</span>
              <span className="text-white/40 hidden sm:inline">credits</span>
            </button>
            <button
              onClick={() => navigate("/form")}
              disabled={credits === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                bg-gradient-to-r from-purple-600 to-pink-600 text-white
                disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Idea</span>
            </button>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          {/* No credits banner */}
          {credits === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-pink-400 shrink-0" />
                <p className="text-sm text-white/80">
                  You've used all your credits.{" "}
                  <span className="text-white font-medium">Buy more to validate new ideas.</span>
                </p>
              </div>
              <button
                onClick={() => navigate("/pricing")}
                className="shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition"
              >
                Buy Credits
              </button>
            </motion.div>
          )}

          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`p-4 rounded-2xl bg-gradient-to-b ${stat.color} border border-white/5 hover:border-white/10 transition`}
                  >
                    <div className={`${stat.iconColor} mb-3`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent ideas */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold">Recent Ideas</h2>
                  <button
                    onClick={() => setActiveTab("history")}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
                  >
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {ideas.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl border border-dashed border-white/10">
                    <Lightbulb className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">No ideas yet.</p>
                    <button
                      onClick={() => navigate("/form")}
                      disabled={credits === 0}
                      className="mt-4 px-5 py-2 rounded-xl text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-40"
                    >
                      Create your first idea
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {ideas.slice(0, 6).map((idea, idx) => (
                      <IdeaCard key={idea._id} idea={idea} idx={idx} navigate={navigate} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── HISTORY TAB ─── */}
          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Search + Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search ideas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-purple-500/50 transition"
                  >
                    <option value="all">All Status</option>
                    <option value="validated">Validated</option>
                    <option value="rejected">Rejected</option>
                    <option value="in_progress">In Progress</option>
                  </select>
                </div>
              </div>

              {/* Results count */}
              <p className="text-xs text-white/40">
                Showing {filteredIdeas.length} of {ideas.length} ideas
              </p>

              {/* Ideas list */}
              {filteredIdeas.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-dashed border-white/10">
                  <Search className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40 text-sm">No ideas match your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredIdeas.map((idea, idx) => (
                    <IdeaCard key={idea._id} idea={idea} idx={idx} navigate={navigate} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function IdeaCard({ idea, idx, navigate }) {
  const status = getStatus(idea.score);
  const { label, color } = statusConfig[status];
  const score = idea.score ?? null;

  const scoreColor =
    score === null ? "text-white/40"
    : score >= 70   ? "text-green-400"
    : score >= 50   ? "text-yellow-400"
    : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => navigate(`/ideas/${idea._id}`)}
      className="group p-5 rounded-2xl bg-neutral-900 border border-white/5
        hover:border-purple-500/30 hover:bg-neutral-800/80
        cursor-pointer transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-yellow-400/10">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
          </div>
          <h3 className="font-medium text-sm leading-tight line-clamp-1">{idea.title || idea.businessName}</h3>
        </div>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${color}`}>
          {label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-white/40 line-clamp-2 mb-4 leading-relaxed">
        {idea.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/30">Score</p>
          <p className={`text-lg font-bold ${scoreColor}`}>
            {score !== null ? `${score}` : "—"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/30">Created</p>
          <p className="text-xs text-white/50">
            {new Date(idea.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-purple-400 group-hover:gap-2 transition-all">
          View <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}
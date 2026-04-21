import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ExecutiveOverview from "./pages/ExecutiveOverview";
import MarketCompetition from "./pages/MarketCompetition";
import ProductValidation from "./pages/ProductValidation";
import Financials from "./pages/Financials";
import Recommendations from "./pages/Recommendations";
import BusinessTermsSaaS from "./pages/BusinessTermsSaaS";
import ExportPDFButton from "./actions/ExportPDFButton";
import ShareButton from "./actions/ShareButton";
import RegenerateButton from "./actions/RegenerateButton";
import logo from "../../assets/ideafy_logo-removebg-preview.png";
import { BarChart3, Users, CheckCircle2, Coins, Lightbulb, Book, Menu, X, Home, RefreshCw } from "lucide-react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const navItems = [
  { name: "Executive Overview",     icon: BarChart3,     color: "text-blue-400" },
  { name: "Market & Competition",   icon: Users,         color: "text-purple-400" },
  { name: "Product Validation",     icon: CheckCircle2,  color: "text-green-400" },
  { name: "Financials",             icon: Coins,         color: "text-yellow-400" },
  { name: "Recommendations",        icon: Lightbulb,     color: "text-pink-400" },
  { name: "Business Terms Reference", icon: Book,        color: "text-teal-400" },
];

export default function StartupReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const reportRef = useRef();

  const [activePage, setActivePage] = useState("Executive Overview");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const isPDF = new URLSearchParams(location.search).get("mode") === "pdf";

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/ideas/${id}`);
        const idea = res.data?.idea;
        if (!idea || !idea.result) throw new Error("Invalid data");
        setReportData(idea.result);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        alert(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      const res = await axios.post(`/api/ideas/${id}/regenerate`);
      setReportData(res.data.idea.result);
    } catch (err) {
      alert(err.response?.data?.message || "Error regenerating");
    } finally {
      setRegenerating(false);
    }
  };

  const renderPage = () => {
    if (!reportData) return null;
    switch (activePage) {
      case "Executive Overview":     return <ExecutiveOverview data={reportData.executiveOverview} />;
      case "Market & Competition":   return <MarketCompetition data={reportData.marketCompetition} />;
      case "Product Validation":     return <ProductValidation data={reportData.productValidation} />;
      case "Financials":             return <Financials data={reportData.financials} />;
      case "Recommendations":        return <Recommendations data={reportData.recommendations} />;
      case "Business Terms Reference": return <BusinessTermsSaaS />;
      default:                       return <ExecutiveOverview data={reportData.executiveOverview} />;
    }
  };

  const activeNav = navItems.find(n => n.name === activePage);

  return (
    <div className="h-screen flex bg-neutral-950 text-gray-200 overflow-hidden">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed z-50 top-0 left-0 h-full w-64
        bg-neutral-900/95 backdrop-blur-md
        border-r border-white/5
        flex flex-col shadow-2xl
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0
      `}>

        {/* Logo */}
        <div
          className="px-5 h-16 flex items-center gap-3 border-b border-white/5 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
            <img src={logo} alt="Ideafy" className="relative h-7 w-7 object-contain" />
          </div>
          <span className="font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Ideafy
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setSidebarOpen(false); }}
            className="ml-auto md:hidden text-white/30 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Report label */}
        <div className="px-5 py-3 border-b border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium">Report Sections</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              onClick={() => { setActivePage(name); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activePage === name
                  ? "bg-white/8 text-white border border-white/8"
                  : "text-white/40 hover:text-white hover:bg-white/4"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${activePage === name ? color : ""}`} />
              <span className="truncate">{name}</span>
              {activePage === name && (
                <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400`} />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <ExportPDFButton />
          <ShareButton onClick={() => alert("Share link generated")} />
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              text-white/50 bg-white/4 border border-white/8
              hover:text-white hover:bg-white/8 disabled:opacity-40
              transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${regenerating ? "animate-spin" : ""}`} />
            {regenerating ? "Regenerating..." : "Regenerate"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/6 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              {activeNav && (
                <div className="flex items-center gap-2">
                  <activeNav.icon className={`w-4 h-4 ${activeNav.color}`} />
                  <h1 className="text-sm font-semibold text-white">{activePage}</h1>
                </div>
              )}
              <p className="text-xs text-white/30 hidden sm:block">AI-generated startup analysis</p>
            </div>
          </div>
         
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 text-sm">Loading your report...</p>
              </div>
            ) : (
              <div ref={reportRef}>
                {renderPage()}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
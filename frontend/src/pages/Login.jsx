import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Zap } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server not reachable. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden px-4">

      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/8 shadow-2xl rounded-3xl p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-white/10 mb-4">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome back</h1>
            <p className="text-sm text-white/40">Sign in to continue to your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 text-sm
                    focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
                    hover:border-white/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
                  Password
                </label>
                {/* Placeholder for future forgot-password link */}
                <span className="text-xs text-purple-400/60 hover:text-purple-400 cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 text-sm
                    focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
                    hover:border-white/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="relative w-full py-3 rounded-xl font-semibold text-sm text-black
                  bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                  shadow-lg shadow-pink-500/20
                  disabled:opacity-60 disabled:cursor-not-allowed
                  hover:shadow-pink-500/30 hover:shadow-xl
                  transition-all duration-200 overflow-hidden cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </motion.button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/25">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors cursor-pointer"
            >
              Create one free
            </button>
          </p>
        </div>

        {/* Trust note */}
        <div className="flex items-center justify-center gap-4 mt-5">
          {["No credit card required", "Free credits on signup", "Cancel anytime"].map((item) => (
            <span key={item} className="text-xs text-white/20">{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
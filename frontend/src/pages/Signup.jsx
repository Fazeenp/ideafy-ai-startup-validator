import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setError(null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordRules = [
    { label: "At least 8 characters",         pass: form.password.length >= 8 },
    { label: "At least one number",            pass: /\d/.test(form.password) },
    { label: "At least one special character", pass: /[!@#$%^&*(),.?":{}|<>]/.test(form.password) },
  ];
  const strengthScore  = passwordRules.filter(r => r.pass).length;
  const strengthLabel  = ["", "Weak", "Fair", "Strong"][strengthScore];
  const strengthColor  = ["", "text-red-400", "text-yellow-400", "text-green-400"][strengthScore];
  const strengthBarW   = ["0%", "33%", "66%", "100%"][strengthScore];
  const strengthBarBg  = ["", "bg-red-500", "bg-yellow-500", "bg-green-500"][strengthScore];

  const passwordsMatch    = form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const passwordsMismatch = form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError({ type: "mismatch", message: "Passwords do not match." });
      return;
    }
    if (strengthScore < 2) {
      setError({ type: "weak", message: "Please choose a stronger password." });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user)  localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        const msg = data.message || "";
        const isExisting =
          msg.toLowerCase().includes("already exists") ||
          msg.toLowerCase().includes("already registered") ||
          msg.toLowerCase().includes("duplicate") ||
          msg.toLowerCase().includes("email already") ||
          res.status === 409;

        setError({
          type:    isExisting ? "exists" : "generic",
          message: msg || "Signup failed. Please try again.",
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError({ type: "generic", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden px-4">

      {/* Background orbs */}
      <motion.div
        animate={{ rotate: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-0 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/8 shadow-2xl rounded-3xl p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-pink-500/20 border border-white/10 mb-4">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Create your account</h1>
            <p className="text-sm text-white/40">Start validating your startup ideas today</p>
          </div>

          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-5 px-4 py-3 rounded-xl border text-sm ${
                error.type === "exists"
                  ? "bg-yellow-500/8 border-yellow-500/20 text-yellow-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {error.type === "exists" ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>An account with this email already exists.</span>
                  </div>
                  <div className="flex items-center gap-2 pl-6">
                    <span className="text-white/40 text-xs">Want to sign in instead?</span>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 underline underline-offset-2 cursor-pointer transition-colors"
                    >
                      Go to Sign In →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error.message}</span>
                </div>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 text-sm
                    focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
                    hover:border-white/15 transition-all duration-200"
                />
              </div>
            </div>

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
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 text-sm
                    focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
                    hover:border-white/15 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength meter */}
              {form.password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2 pt-1"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-white/6 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${strengthBarBg}`}
                        animate={{ width: strengthBarW }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${strengthColor}`}>
                      {strengthLabel}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {passwordRules.map((rule, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        {rule.pass
                          ? <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                          : <XCircle    className="w-3 h-3 text-white/20 shrink-0" />
                        }
                        <span className={`text-[10px] ${rule.pass ? "text-green-400/80" : "text-white/30"}`}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                  passwordsMatch    ? "text-green-400/50"
                  : passwordsMismatch ? "text-red-400/50"
                  : "text-white/25"
                }`} />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 text-white placeholder-white/25 text-sm
                    focus:outline-none transition-all duration-200
                    ${passwordsMatch
                      ? "border border-green-500/40 focus:ring-1 focus:ring-green-500/40"
                      : passwordsMismatch
                      ? "border border-red-500/40 focus:ring-1 focus:ring-red-500/40"
                      : "border border-white/8 hover:border-white/15 focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Match feedback */}
              {form.confirmPassword.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-1.5 text-[10px] font-medium ${
                    passwordsMatch ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {passwordsMatch
                    ? <><CheckCircle className="w-3 h-3" /> Passwords match</>
                    : <><XCircle    className="w-3 h-3" /> Passwords do not match</>
                  }
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading || passwordsMismatch}
                className="relative w-full py-3 rounded-xl font-semibold text-sm text-black
                  bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                  shadow-lg shadow-pink-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:shadow-pink-500/30 hover:shadow-xl
                  transition-all duration-200 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
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

          {/* Footer */}
          <p className="text-center text-sm text-white/40">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-white/20 mt-5">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </section>
  );
}
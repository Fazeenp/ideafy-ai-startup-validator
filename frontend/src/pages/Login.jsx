import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // 1️⃣ Save JWT token in localStorage
      localStorage.setItem("token", data.token);

      // 2️⃣ Save user info in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      // 3️⃣ Navigate to dashboard
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Floating blobs like Hero */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-black/50 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full py-2 cursor-pointer rounded-lg font-semibold text-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 shadow-lg"
          >
            Login
          </motion.button>
        </form>
        <p className="text-sm text-white/60 text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-pink-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </section>
  );
}

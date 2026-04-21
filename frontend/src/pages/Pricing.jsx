import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Zap, Shield, Headphones } from "lucide-react";

axios.defaults.baseURL = "http://localhost:5000";

const PACKS = [
  {
    name: "Starter",
    price: 99,
    credits: 10,
    description: "Perfect for testing the waters",
    features: ["10 idea validations", "Full AI analysis", "PDF export", "7-day access"],
    highlight: false,
  },
  {
    name: "Builder",
    price: 199,
    credits: 25,
    description: "For serious entrepreneurs",
    features: ["25 idea validations", "Full AI analysis", "PDF export", "Priority support", "30-day access"],
    highlight: true,
  },
  {
    name: "Founder",
    price: 499,
    credits: 70,
    description: "Best value for power users",
    features: ["70 idea validations", "Full AI analysis", "PDF export", "Priority support", "Unlimited access", "Team sharing (coming soon)"],
    highlight: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [loadingPack, setLoadingPack] = useState(null);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleBuy = async (pack) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingPack(pack.price);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Failed to load Razorpay. Check your internet connection.");
        return;
      }

      const { data } = await axios.post("/api/payment/create-order", {
        amount: pack.price,
      });

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Ideafy",
        description: `${pack.credits} Credits Pack`,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert(`✅ Payment successful! ${verifyRes.data.creditsAdded} credits added.`);
            navigate("/dashboard");
          } catch (err) {
            alert(err.response?.data?.message || "Verification failed. Contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#a855f7",
        },
        modal: {
          ondismiss: () => setLoadingPack(null),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to initiate payment.");
    } finally {
      setLoadingPack(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="pt-28 pb-16 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6"
        >
          <Zap className="w-3.5 h-3.5" /> Pay-as-you-go — No subscription
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Buy Credits
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">
          Each credit = one full AI-powered startup analysis. Buy once, use anytime.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {PACKS.map((pack, i) => (
            <motion.div
              key={pack.price}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                pack.highlight
                  ? "bg-gradient-to-b from-purple-900/50 to-pink-900/30 border-purple-500/40 shadow-lg shadow-purple-500/10"
                  : "bg-neutral-900/60 border-white/10"
              }`}
            >
              {pack.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{pack.name}</h3>
                <p className="text-white/50 text-sm">{pack.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">₹{pack.price}</span>
                  <span className="text-white/40 text-sm">one-time</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">{pack.credits} credits</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {pack.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2.5 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleBuy(pack)}
                disabled={loadingPack === pack.price}
                className={`w-full py-3 rounded-2xl font-bold text-sm transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed ${
                  pack.highlight
                    ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                {loadingPack === pack.price ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Buy for ₹${pack.price}`
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: Shield,      title: "Secure Payments",    desc: "256-bit SSL encryption via Razorpay" },
            { icon: Zap,         title: "Instant Credits",    desc: "Credits added immediately after payment" },
            { icon: Headphones,  title: "Support",            desc: "Email support within 24 hours" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/5">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-semibold text-sm">{title}</h4>
              <p className="text-white/40 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
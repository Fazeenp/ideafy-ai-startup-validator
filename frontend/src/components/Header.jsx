import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Zap, LayoutDashboard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/ideafy_logo-removebg-preview.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: "Pricing", to: "/pricing" },
    { name: "About", to: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-neutral-950/90 backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-pink-500/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-300" />
                <img
                  src={logo}
                  alt="Ideafy"
                  className="relative h-8 w-8 object-contain"
                />
              </div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Ideafy
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "text-white bg-white/8"
                      : "text-white/55 hover:text-white hover:bg-white/6"
                  }`}
                >
                  {link.name}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white/8 -z-10"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/6 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/8 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/6 transition-all duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-200"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-neutral-900 border-l border-white/8 shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/8">
                <span className="font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Ideafy
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/8 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.to)
                          ? "text-white bg-white/8"
                          : "text-white/60 hover:text-white hover:bg-white/6"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {isLoggedIn && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 }}
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/6 transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </nav>

              {/* Drawer footer */}
              <div className="p-4 border-t border-white/8 space-y-2">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-400/8 border border-red-400/15 hover:bg-red-400/15 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full text-center py-3 rounded-xl text-sm font-medium text-white/60 bg-white/5 border border-white/8 hover:bg-white/10 transition-all"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 transition-all"
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
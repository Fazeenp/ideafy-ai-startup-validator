import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/ideafy_logo-removebg-preview.png";

export default function SleekHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Solutions", to: "/solution" },
    { name: "Pricing", to: "/pricing" },
    { name: "Our Story", to: "/about" },
  ];

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl">
      {/* Floating nav container */}
      <div className="flex justify-between items-center px-6 h-14 backdrop-blur-xl bg-black/40 border border-white/10 rounded-full shadow-lg">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Ideafy Logo"
            className="h-8 w-8 object-contain drop-shadow-md cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1
            onClick={() => navigate("/")}
            className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer"
          >
            Ideafy
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5 text-sm">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="text-white/80 hover:text-yellow-400 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/form"
            className="px-4 py-1 rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black shadow hover:scale-105 transition-transform cursor-pointer"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 text-white backdrop-blur-lg flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
              <h1
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
                className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              >
                Ideafy
              </h1>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-7 w-7 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 px-6 py-8 text-lg font-semibold">
              {links.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/form"
                onClick={() => setIsOpen(false)}
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black font-semibold text-center shadow hover:scale-105 transition-transform"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

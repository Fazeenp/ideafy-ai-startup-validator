import React from "react";
import { Twitter, Linkedin, Mail, Globe } from "lucide-react";
import logo from "../assets/ideafy_logo-removebg-preview.png";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg">
                <img
                  src={logo}
                  alt="Ideafy Logo"
                  className="h-10 w-10 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ideafy</h3>
                <p className="text-xs text-slate-400">Validate Smarter</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ideafy helps you transform raw ideas into validated opportunities
              with AI-powered insights. Build what matters, faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ideafy. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {[Twitter, Linkedin, Mail, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-slate-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

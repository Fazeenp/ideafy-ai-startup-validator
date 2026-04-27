import React from "react";
import { Twitter, Linkedin, Mail, Globe } from "lucide-react";
import logo from "../assets/ideafy_logo-removebg-preview.png";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className=" gap-10">
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

         

         

          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ideafy. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}

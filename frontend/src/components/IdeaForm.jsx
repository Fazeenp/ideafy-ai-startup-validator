import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Building2, Layers, Target, Rocket } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const stepIcons = [Building2, Target, Layers, Rocket];

export default function IdeaForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    description: "",
    targetMarket: "",
    problemSolving: "",
    uniqueValue: "",
    businessModel: "",
    funding: "",
    timeline: "",
    experience: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      const response = await axios.post("/api/ideas", formData);
      const ideaId = response.data?.idea?._id;
      if (!ideaId) throw new Error("Idea ID not returned from backend");
      navigate(`/ideas/${ideaId}`);
    } catch (error) {
      console.error("Failed to validate idea:", error);
      const msg = error.response?.data?.message || "Something went wrong";
      if (msg.includes("No credits")) {
        alert(msg);
        navigate("/pricing");
      } else {
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleNext = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.businessName && formData.industry && formData.description;
      case 2: return formData.targetMarket && formData.problemSolving;
      case 3: return formData.uniqueValue && formData.businessModel;
      case 4: return formData.funding && formData.timeline && formData.experience;
      default: return false;
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 text-sm
    focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
    hover:border-white/15 transition-all duration-200 resize-none`;

  const selectClass = `w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/8 text-white text-sm
    focus:outline-none focus:ring-1 focus:ring-purple-500/60 focus:border-purple-500/40
    hover:border-white/15 transition-all duration-200 cursor-pointer`;

  const labelClass = "block text-xs font-medium text-white/50 uppercase tracking-wider mb-2";

  const stepsMeta = [
    { title: "Your Idea", subtitle: "Business basics" },
    { title: "Market", subtitle: "Target & problem" },
    { title: "Value", subtitle: "What sets you apart" },
    { title: "Launch", subtitle: "Implementation plan" },
  ];

  const stepsContent = [
    {
      title: "Tell us about your startup",
      description: "Start with the basics — what's your idea and what industry does it serve?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Business Name *</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className={inputClass}
              placeholder="e.g. EcoTrack, MediFlow, ShopSmart"
            />
          </div>
          <div>
            <label className={labelClass}>Industry *</label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className={selectClass}
            >
              <option value="">Select your industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="food">Food & Beverage</option>
              <option value="entertainment">Entertainment</option>
              <option value="real-estate">Real Estate</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Business Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              maxLength={500}
              className={inputClass}
              placeholder="Describe your business idea, what it does, and how it works..."
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/25">Be specific — better input = better analysis</span>
              <span className={`text-xs ${formData.description.length > 450 ? 'text-yellow-400' : 'text-white/30'}`}>
                {formData.description.length}/500
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Market & Problem Analysis",
      description: "Who are you building for, and what pain point does your idea solve?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Target Market *</label>
            <textarea
              value={formData.targetMarket}
              onChange={(e) => handleInputChange("targetMarket", e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Describe your target customers, market size, demographics, and market trends..."
            />
          </div>
          <div>
            <label className={labelClass}>Problem You're Solving *</label>
            <textarea
              value={formData.problemSolving}
              onChange={(e) => handleInputChange("problemSolving", e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="What problem does your business solve? How important is it to your target market?"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Value Proposition & Business Model",
      description: "What makes you different, and how will you make money?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Unique Value Proposition *</label>
            <textarea
              value={formData.uniqueValue}
              onChange={(e) => handleInputChange("uniqueValue", e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="What makes your solution unique? How do you stand out from competitors?"
            />
          </div>
          <div>
            <label className={labelClass}>Business Model *</label>
            <textarea
              value={formData.businessModel}
              onChange={(e) => handleInputChange("businessModel", e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="How will you make money? Revenue streams, pricing, etc..."
            />
          </div>
        </div>
      ),
    },
    {
      title: "Implementation & Background",
      description: "Where are you now, and how quickly can you move?",
      fields: (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Funding Status *</label>
            <select
              value={formData.funding}
              onChange={(e) => handleInputChange("funding", e.target.value)}
              className={selectClass}
            >
              <option value="">Select funding status</option>
              <option value="none">No funding yet</option>
              <option value="bootstrapping">Self-funded / Bootstrapping</option>
              <option value="seeking">Actively seeking funding</option>
              <option value="pre-seed">Pre-seed funding</option>
              <option value="seed">Seed funding</option>
              <option value="series-a">Series A or beyond</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Implementation Timeline *</label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
              className={selectClass}
            >
              <option value="">Select timeline</option>
              <option value="immediate">Ready to launch immediately</option>
              <option value="3-months">3–6 months</option>
              <option value="6-months">6–12 months</option>
              <option value="12-months">1–2 years</option>
              <option value="long-term">Long-term (2+ years)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Relevant Experience *</label>
            <textarea
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Describe your experience, skills, or background that will help you succeed..."
            />
          </div>
        </div>
      ),
    },
  ];

  const StepIcon = stepIcons[currentStep - 1];

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* BG orbs */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -top-64 -left-64 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "conic-gradient(from 0deg, transparent 65%, rgba(139,92,246,0.07) 75%, transparent 85%)",
          borderRadius: "50%",
        }}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "conic-gradient(from 180deg, transparent 65%, rgba(236,72,153,0.07) 75%, transparent 85%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">

        {/* Step indicators — top */}
        <div className="flex items-center justify-between mb-8 px-1">
          {stepsMeta.map((s, i) => {
            const Icon = stepIcons[i];
            const stepNum = i + 1;
            const isDone = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            return (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isDone
                      ? "bg-green-400/15 border border-green-400/30"
                      : isActive
                      ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/40"
                      : "bg-white/4 border border-white/8"
                  }`}>
                    {isDone
                      ? <CheckCircle className="w-4 h-4 text-green-400" />
                      : <Icon className={`w-4 h-4 ${isActive ? "text-purple-300" : "text-white/25"}`} />
                    }
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block ${isActive ? "text-white/70" : "text-white/25"}`}>
                    {s.title}
                  </span>
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-all duration-500 ${
                    stepNum < currentStep ? "bg-green-400/30" : "bg-white/6"
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/8 rounded-3xl shadow-2xl overflow-hidden">

          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white/35 uppercase tracking-widest">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-xs text-white/25">
                  {stepsMeta[currentStep - 1].subtitle}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {stepsContent[currentStep - 1].title}
              </h2>
              <p className="text-sm text-white/40 mt-1 leading-relaxed">
                {stepsContent[currentStep - 1].description}
              </p>
            </div>

            {/* Fields */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {stepsContent[currentStep - 1].fields}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/50
                  hover:text-white hover:bg-white/6 disabled:opacity-0 disabled:pointer-events-none
                  transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  whileHover={{ scale: isStepValid() ? 1.03 : 1 }}
                  whileTap={{ scale: isStepValid() ? 0.97 : 1 }}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold text-black
                    bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                    disabled:opacity-35 disabled:cursor-not-allowed
                    shadow-lg shadow-pink-500/15 hover:shadow-pink-500/25
                    transition-all duration-200 cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid() || loading}
                  whileHover={{ scale: isStepValid() && !loading ? 1.03 : 1 }}
                  whileTap={{ scale: isStepValid() && !loading ? 0.97 : 1 }}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold text-black
                    bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
                    disabled:opacity-35 disabled:cursor-not-allowed
                    shadow-lg shadow-pink-500/20
                    transition-all duration-200 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Validate Idea
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-xs text-white/20 mt-5">
          Uses 1 credit per validation · Your data is private and secure
        </p>
      </div>
    </div>
  );
}
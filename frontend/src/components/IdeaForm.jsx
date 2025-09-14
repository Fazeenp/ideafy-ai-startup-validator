import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function IdeaForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
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

   const handleSubmit = async() => {
    try {
      const response = await axios.post('http://localhost:5000/api/validate-startup',formData)
      const resultData = response.data;
      navigate("/results", { state: { idea: formData, result: resultData } });
    } catch (error) {
       console.error("Failed to validate idea:", error);
        alert("Something went wrong! Please try again.");
    }
    
    
    
  };
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.industry && formData.description;
      case 2:
        return formData.targetMarket && formData.problemSolving;
      case 3:
        return formData.uniqueValue && formData.businessModel;
      case 4:
        return formData.funding && formData.timeline && formData.experience;
      default:
        return false;
    }
  };

  const stepsContent = [
    {
      title: "Tell us about your startup idea",
      fields: (
        <>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Business Name *</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your business name or idea title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Industry *</label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className="w-full px-4 py-3 border border-white/20  bg-black/70 text-white rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
            <label className="block text-sm font-medium text-neutral-600 mb-2">Business Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              maxLength={500} // ✅ limit characters
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="Describe your business idea, what it does, and how it works..."
            />
            <p className="text-sm text-neutral-400 mt-1">{formData.description.length}/500 characters</p>
          </div>
        </>
      ),
    },
    {
      title: "Market and Problem Analysis",
      fields: (
        <>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Target Market *</label>
            <textarea
              value={formData.targetMarket}
              onChange={(e) => handleInputChange("targetMarket", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="Describe your target customers, market size, demographics, and market trends..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Problem You're Solving *</label>
            <textarea
              value={formData.problemSolving}
              onChange={(e) => handleInputChange("problemSolving", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="What problem does your business solve? How important is it to your target market?"
            />
          </div>
        </>
      ),
    },
    {
      title: "Value Proposition & Business Model",
      fields: (
        <>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Unique Value Proposition *</label>
            <textarea
              value={formData.uniqueValue}
              onChange={(e) => handleInputChange("uniqueValue", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="What makes your solution unique? How do you stand out from competitors?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Business Model *</label>
            <textarea
              value={formData.businessModel}
              onChange={(e) => handleInputChange("businessModel", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="How will you make money? Revenue streams, pricing, etc..."
            />
          </div>
        </>
      ),
    },
    {
      title: "Implementation & Background",
      fields: (
        <>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Funding Status *</label>
            <select
              value={formData.funding}
              onChange={(e) => handleInputChange("funding", e.target.value)}
              className="w-full px-4 py-3 border border-white/20 rounded-xl bg-black/70 text-white focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            >
              <option value="">Select funding status</option>
              <option value="none">No funding yet</option>
              <option value="bootstrapping">Self-funded/Bootstrapping</option>
              <option value="seeking">Actively seeking funding</option>
              <option value="pre-seed">Pre-seed funding</option>
              <option value="seed">Seed funding</option>
              <option value="series-a">Series A or beyond</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">Implementation Timeline *</label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
              className="w-full  px-4 py-3 borderborder-white/20 rounded-xl bg-black/70 text-white focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            >
              <option value="">Select timeline</option>
              <option value="immediate">Ready to launch immediately</option>
              <option value="3-months">3-6 months</option>
              <option value="6-months">6-12 months</option>
              <option value="12-months">1-2 years</option>
              <option value="long-term">Long-term (2+ years)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 m  b-2">Relevant Experience *</label>
            <textarea
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="Describe your experience, skills, or background that will help you succeed..."
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="bg-black min-h-screen flex items-center justify-center py-30 px-4 relative overflow-hidden">
      {/* Floating gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      {/* Center Card */}
      <div className="relative max-w-3xl w-full rounded-3xl backdrop-blur-xl bg-gradient-to-tr from-purple-900/70 via-black/80 to-blue-900/70 border border-white/10 shadow-2xl p-10">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-semibold text-white">Startup Validation</h2>
            <span className="text-sm text-white/70">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-medium text-white tracking-tight">
              {stepsContent[currentStep - 1].title}
            </h3>

            {/* Render fields directly */}
            <div className="space-y-6 text-white">
              {stepsContent[currentStep - 1].fields}
            </div>
          </motion.div>

        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer" 
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-white hover:text-white bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 disabled:opacity-40 disabled:cursor-not-allowed transition transform hover:scale-105 cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-white hover:text-white bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 disabled:opacity-40 disabled:cursor-not-allowed transition transform hover:scale-105 cursor-pointer"
            >
              <CheckCircle className="h-4 w-4" /> Validate Idea
            </button>
          )}
        </div>
      </div>
    </div>






  );
}

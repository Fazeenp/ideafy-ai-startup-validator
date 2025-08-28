import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

export default function IdeaForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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

  const handleSubmit = () => onSubmit(formData);
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
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
            <label className="block text-sm font-medium text-neutral-600 mb-2">Relevant Experience *</label>
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
    <div className='bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center py-20 px-4'>
      <div className='max-w-3xl w-full backdrop-blur-xl rounded-3xl border border-neutral-200 bg-white/90 shadow-2xl p-10'>
        {/* Progress */}
        <div className='mb-10'>
          <div className='flex justify-between items-center mb-3'>
            <h2 className='text-3xl font-semibold text-neutral-900'>Startup Validation</h2>
            <span className='text-sm text-neutral-700'>Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-medium text-neutral-900 tracking-tight">
              {stepsContent[currentStep - 1].title}
            </h3>
            {stepsContent[currentStep - 1].fields}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className='flex justify-between items-center pt-10 border-t border-neutral-200 mt-10'>
          <button
            type="button" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className='flex items-center gap-2 px-6 py-3 rounded-full text-white/90 hover:text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition bg-blue-500/80'
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button" 
              onClick={handleNext}
              disabled={!isStepValid()}
              className='flex items-center gap-2 px-8 py-3 rounded-full text-white/90 hover:text-white hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition bg-purple-600/80'
            >
              Next
            </button>
          ) : (
            <button
              type="button" 
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className='flex items-center gap-2 px-8 py-3 rounded-full text-white/90 hover:text-white hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition bg-purple-600/80'
            >
              <CheckCircle className="h-4 w-4" /> Validate Idea
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

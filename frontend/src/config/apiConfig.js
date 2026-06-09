// API Configuration - uses environment variables in production, localhost in development

const API_URL = import.meta.env.VITE_API_URL || "https://ideafy-ai-startup-validator-backend.onrender.com/";

export default API_URL;
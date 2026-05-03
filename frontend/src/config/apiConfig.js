// API Configuration - uses environment variables in production, localhost in development

const API_URL = import.meta.env.VITE_API_URL || "http://10.0.0.55:5000/";

export default API_URL;

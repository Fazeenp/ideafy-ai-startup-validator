// API Configuration - uses environment variables in production, localhost in development

const API_URL = import.meta.env.VITE_API_URL || "https://project.alightage.in";

export default API_URL;

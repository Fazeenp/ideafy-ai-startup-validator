import axios from "axios";
import API_URL from "../config/apiConfig";

const AUTH_URL = `${API_URL}/api/auth`;

export const login = async (data) => {
  const res = await axios.post(`${AUTH_URL}/login`, data);
  return res.data;
};

export const signup = async (data) => {
  const res = await axios.post(`${AUTH_URL}/signup`, data);
  return res.data;
};  
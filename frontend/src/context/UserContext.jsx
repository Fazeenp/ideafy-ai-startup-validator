import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/apiConfig";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [credits, setCredits] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${API_URL}/api/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredits(res.data.user.credits);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ credits, setCredits, user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
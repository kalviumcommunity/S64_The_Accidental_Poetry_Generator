import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Fetch user info when token changes
  const fetchUser = async (token) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("🔹 User fetched:", data);
        setUser(data.user); // ✅ Store user data separately
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  // Function to handle login
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser(newToken); // ✅ Fetch user after login
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) fetchUser(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

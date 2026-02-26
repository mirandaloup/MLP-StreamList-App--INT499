import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch {
      // ignore
    }
  }, [user]);

  const loginWithGoogleCredential = (credentialResponse) => {
    setUser({
      loggedIn: true,
      credential: credentialResponse?.credential || null,
      loggedInAt: new Date().toISOString(),
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user?.loggedIn, loginWithGoogleCredential, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
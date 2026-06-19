// CO4: Context API — provides auth state across the app
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Valid credentials (lightly simulated)
const USERS = {
  OPS_2847: { password: 'ops2024', role: 'user',  name: 'Cmd. Sharma',   initials: 'CS' },
  ADMIN_01: { password: 'admin123', role: 'admin', name: 'Admin Kumar',   initials: 'AK' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // CO5: simple form validation lives in Login.jsx; login logic here
  function login(id, password) {
    const found = USERS[id.trim().toUpperCase()];
    if (found && found.password === password) {
      setUser({ id, role: found.role, name: found.name, initials: found.initials });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — CO3: reusable hook pattern
export function useAuth() {
  return useContext(AuthContext);
}

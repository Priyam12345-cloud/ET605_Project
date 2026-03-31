import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthUser {
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; message: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_CURRENT_USER_KEY = 'its_auth_current_user';
const AUTH_USERS_KEY = 'its_auth_users';

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_CURRENT_USER_KEY);
      if (raw) {
        setUser(JSON.parse(raw) as AuthUser);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login: AuthContextType['login'] = (email, password) => {
    const safeEmail = normalizeEmail(email);
    const users = readUsers();
    const found = users.find((u) => normalizeEmail(u.email) === safeEmail);

    if (!found || found.password !== password) {
      return { ok: false, message: 'Invalid email or password' };
    }

    const authUser: AuthUser = { name: found.name, email: found.email };
    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { ok: true, message: 'Login successful' };
  };

  const signup: AuthContextType['signup'] = (name, email, password) => {
    const trimmedName = name.trim();
    const safeEmail = normalizeEmail(email);

    if (!trimmedName) {
      return { ok: false, message: 'Name is required' };
    }
    if (!safeEmail) {
      return { ok: false, message: 'Email is required' };
    }
    if (password.length < 4) {
      return { ok: false, message: 'Password must be at least 4 characters' };
    }

    const users = readUsers();
    const alreadyExists = users.some((u) => normalizeEmail(u.email) === safeEmail);
    if (alreadyExists) {
      return { ok: false, message: 'Account already exists for this email' };
    }

    const newUser: StoredUser = {
      name: trimmedName,
      email: safeEmail,
      password
    };

    const updatedUsers = [...users, newUser];
    writeUsers(updatedUsers);

    const authUser: AuthUser = { name: newUser.name, email: newUser.email };
    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { ok: true, message: 'Signup successful' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_CURRENT_USER_KEY);
    setUser(null);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

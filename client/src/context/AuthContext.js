import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const fetchUser = async () => {
        try {
          // In a real app, you would fetch user details from your API
          const decoded = JSON.parse(atob(token.split('.')[1]));
          setUser({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name
          });
        } catch (error) {
          logout();
        }
      };
      fetchUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate(response.data.user.role === 'employer' ? '/employer-dashboard' : '/job-seeker-dashboard');
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const register = async (email, password, role, name) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password, role, name });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate(role === 'employer' ? '/employer-dashboard' : '/job-seeker-dashboard');
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
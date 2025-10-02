// contexts/AuthContext.js - Simple version
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import endpoint from '@/constants/endpoint';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');

      if (storedToken && storedUser) {
     
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${endpoint.main}/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        const customToken = response.data.data.token;

        // Store user data and custom token
        await AsyncStorage.setItem('userToken', customToken);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        // Update state
        setUser(userData);
        setToken(customToken);
        setIsAuthenticated(true);

        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      if (error.response) {
        errorMessage = error.response.data.message || 'Login failed';
      } else if (error.request) {
        errorMessage = 'Unable to connect to server';
      }

      return { success: false, message: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${endpoint.main}/auth/register`, userData);

      if (response.data.success) {
        const userDataFromResponse = response.data.data.user;
        const customToken = response.data.data.token;

        // Store user data and custom token
        await AsyncStorage.setItem('userToken', customToken);
        await AsyncStorage.setItem('userData', JSON.stringify(userDataFromResponse));

        // Update state
        setUser(userDataFromResponse);
        setToken(customToken);
        setIsAuthenticated(true);

        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      if (error.response) {
        errorMessage = error.response.data.message || 'Registration failed';
      } else if (error.request) {
        errorMessage = 'Unable to connect to server';
      }

      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['userToken', 'userData']);
      
      // Reset state
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
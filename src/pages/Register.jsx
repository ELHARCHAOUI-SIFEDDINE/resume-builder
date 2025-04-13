import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';

const Register = () => {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearError();
    
    if (name === 'password') {
      // Check password strength
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
      
      // Check if passwords match
      if (formData.confirmPassword) {
        setPasswordMatch(value === formData.confirmPassword);
      }
    }
    
    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.password);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    try {
      setLoading(true);
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-400';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };
  
  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return 'Very weak';
      case 1: return 'Weak';
      case 2: return 'Medium';
      case 3: return 'Strong';
      case 4: return 'Very strong';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full pl-10 py-3 px-4 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full pl-10 py-3 px-4 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full pl-10 py-3 px-4 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="********"
                  minLength={8}
                />
              </div>
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                      <div className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`} style={{ width: `${passwordStrength * 25}%` }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[80px] text-right">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className="text-gray-600 dark:text-gray-400">8+ characters</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className="text-gray-600 dark:text-gray-400">Uppercase letter</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className="text-gray-600 dark:text-gray-400">Number</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <span className="text-gray-600 dark:text-gray-400">Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCheck className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full pl-10 py-3 px-4 border ${
                    formData.confirmPassword
                      ? passwordMatch
                        ? 'border-green-500 dark:border-green-600'
                        : 'border-red-500 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                  placeholder="********"
                />
              </div>
              {formData.confirmPassword && !passwordMatch && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !passwordMatch || passwordStrength < 2}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Privacy Policy
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register; 
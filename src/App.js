import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from './store';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';
import PreviewResume from './pages/PreviewResume';
import NotFound from './pages/NotFound';
import Templates from './pages/Templates';
import ViewSharedResume from './pages/ViewSharedResume';
import AIAssistantPage from './pages/AIAssistantPage';
import AIResumeInterview from './pages/AIResumeInterview';
import CoverLetters from './pages/CoverLetters';
import CoverLetterAssistant from './pages/CoverLetterAssistant';
import CreateCoverLetter from './pages/CreateCoverLetter';
import EditCoverLetter from './pages/EditCoverLetter';

// Protected Route Component
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Toaster position="top-center" />
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/view/:shareToken" element={<ViewSharedResume />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    <Route path="/ai-interview" element={<AIResumeInterview />} />
                    <Route path="/cover-letters" element={<CoverLetters />} />
                    <Route path="/cover-letter-assistant" element={<CoverLetterAssistant />} />
                    
                    {/* Protected Routes */}
                    <Route
                      path="/create-resume/:templateId"
                      element={
                        <PrivateRoute>
                          <CreateResume />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/create-cover-letter/:templateId"
                      element={
                        <PrivateRoute>
                          <CreateCoverLetter />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/edit-cover-letter/:id"
                      element={
                        <PrivateRoute>
                          <EditCoverLetter />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/edit-resume/:id"
                      element={
                        <PrivateRoute>
                          <EditResume />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/preview-resume/:id"
                      element={
                        <PrivateRoute>
                          <PreviewResume />
                        </PrivateRoute>
                      }
                    />
                    
                    {/* Redirect legacy routes if any */}
                    <Route path="/create/:templateId" element={<Navigate to="/create-resume/:templateId" replace />} />
                    
                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

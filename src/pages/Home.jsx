import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegFileAlt, FaUserTie, FaLaptopCode, FaFeatherAlt } from 'react-icons/fa';
import { FiCpu, FiSend, FiZap, FiLayout, FiClipboard, FiMessageCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

// Import template components
import templates from '../templates';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: <FaRegFileAlt className="h-10 w-10 text-blue-500" />,
      title: 'Professional Templates',
      description: 'Choose from a variety of ATS-friendly resume templates designed to impress employers.',
    },
    {
      icon: <FaUserTie className="h-10 w-10 text-blue-500" />,
      title: 'Easy Customization',
      description: 'Personalize your resume with ease using our intuitive editor and real-time preview.',
    },
    {
      icon: <FaLaptopCode className="h-10 w-10 text-blue-500" />,
      title: 'Smart Features',
      description: 'Version history, shareable links, and dark mode to enhance your resume building experience.',
    },
    {
      icon: <FaFeatherAlt className="h-10 w-10 text-blue-500" />,
      title: 'Download & Share',
      description: 'Export your resume as PDF and share it with potential employers with a single click.',
    },
  ];

  // Sample data for template previews
  const previewData = {
    personalInfo: {
      fullName: "Alex Johnson",
      position: "Software Developer",
      email: "alex@example.com",
      location: "New York, NY"
    },
    experience: [
      {
        position: "Frontend Developer",
        company: "Tech Solutions",
        startDate: "2020",
        endDate: "Present",
        current: true,
        achievements: [
          "Developed responsive web applications",
          "Improved site performance by 35%"
        ]
      }
    ],
    education: [
      {
        school: "City University",
        degree: "BS",
        fieldOfStudy: "Computer Science",
        startDate: "2016",
        endDate: "2020",
        gpa: "3.8"
      }
    ],
    skills: ["JavaScript", "React", "CSS", "HTML", "Node.js"],
    summary: "Passionate developer with 3+ years of experience building web applications."
  };
  
  // Templates data with styling information
  const featuredTemplates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and professional template with a modern design, inspired by Google's aesthetic",
      component: templates[0].component,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
      accent: "bg-blue-600 hover:bg-blue-700",
      textAccent: "text-blue-600"
    },
    {
      id: 3,
      name: "Photo Resume",
      description: "Professional template featuring candidate photo, perfect for personal branding",
      component: templates[2].component,
      bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30",
      accent: "bg-green-600 hover:bg-green-700",
      textAccent: "text-green-600"
    },
    {
      id: 5,
      name: "Executive Profile",
      description: "Sophisticated design for executive and senior professional positions",
      component: templates[4].component,
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30",
      accent: "bg-gray-700 hover:bg-gray-800",
      textAccent: "text-gray-700"
    },
    {
      id: 10,
      name: "Creative Minimal",
      description: "Modern creative design with subtle highlight accents and clean layout",
      component: templates[9].component,
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30",
      accent: "bg-yellow-600 hover:bg-yellow-700",
      textAccent: "text-yellow-600"
    },
    {
      id: 9,
      name: "Minimalist Two-Tone",
      description: "Modern two-column design with striking contrasting color scheme",
      component: templates[8].component,
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
      accent: "bg-purple-600 hover:bg-purple-700",
      textAccent: "text-purple-600"
    },
    {
      id: 14,
      name: "Tech Minimal",
      description: "Developer-focused template with code-inspired styling",
      component: templates[13].component,
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30",
      accent: "bg-indigo-600 hover:bg-indigo-700",
      textAccent: "text-indigo-600"
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Create Your Professional Resume in Minutes
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Stand out with a professionally designed resume that gets you noticed. 
                Choose from beautiful templates and customize easily with our intuitive builder.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/templates"}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </Link>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2"
            >
              <img 
                src="/images/hero-resume.png" 
                alt="Resume preview" 
                className="w-full h-auto rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Resume+Builder';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* AI Resume Assistant Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
            >
              NEW
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              AI-Powered Resume Builder
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Choose how you want AI to help create your perfect resume. Our intelligent assistant uses advanced AI to craft professional, job-winning resumes.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI Interview Option */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full"
            >
              <div className="p-8 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/30 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <FiClipboard className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Resume Interview
                  </h3>
                </div>
                
                <div className="space-y-6 flex-grow">
                  <p className="text-gray-700 dark:text-gray-300">
                    Answer simple questions about your career and let AI build your complete resume. Perfect for creating a resume from scratch.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FiZap />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Step-by-Step Process</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Guided interview that takes you through each section
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FiLayout />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Complete Resume</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Generates all sections of your resume at once
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <Link
                      to="/ai-interview"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
                    >
                      Start Interview <FiClipboard className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* AI Chat Assistant Option */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full"
            >
              <div className="p-8 bg-gradient-to-br from-purple-500/5 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/30 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <FiMessageCircle className="h-8 w-8 text-purple-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI Chat Assistant
                  </h3>
                </div>
                
                <div className="space-y-6 flex-grow">
                  <p className="text-gray-700 dark:text-gray-300">
                    Have a conversation with our AI assistant to generate content, get feedback, or improve specific parts of your resume.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <FiSend />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Conversational Help</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Chat naturally about any resume questions
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Section Assistance</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Get help with specific parts of your resume
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <Link
                      to="/ai-assistant"
                      className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors"
                    >
                      Open AI Chat <FiMessageCircle className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
            >
              Features
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform offers everything you need to create a professional, ATS-optimized resume that helps you land your dream job.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="mb-4 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Templates Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Professional Resume Templates
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Choose from our collection of 14 professionally designed templates, each crafted to showcase your skills and experience in the best possible light.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemplates.map((template) => (
              <motion.div 
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * template.id }}
                className={`rounded-xl shadow-lg overflow-hidden ${template.bgColor}`}
              >
                <div className="relative p-6 h-full flex flex-col">
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${template.textAccent}`}>
                    {template.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                    {template.description}
                  </p>
                  
                  {/* Template preview - reduced opacity for better visibility */}
                  <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-white shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform scale-[0.5] origin-center">
                      <template.component data={previewData} />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50"></div>
                  </div>
                  
                  <Link
                    to={isAuthenticated ? `/templates/${template.id}` : "/login?redirect=templates"}
                    className={`px-4 py-2 text-white rounded-lg ${template.accent} transition-colors text-center`}
                  >
                    Use This Template
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              View All Templates
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Your Professional Resume?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have created successful resumes with our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
            </Link>
            <Link
              to="/templates"
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-md border border-blue-500"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaPencilAlt, FaRobot } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

// Import cover letter templates
import coverLetterTemplates from '../coverLetterTemplates';

const CoverLetters = () => {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from templates
  const categories = ['All', ...new Set(coverLetterTemplates.map(template => template.category))];

  // Filter templates by category
  const filteredTemplates = selectedCategory === 'All'
    ? coverLetterTemplates
    : coverLetterTemplates.filter(template => template.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Cover Letter Templates</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Choose from our collection of professional cover letter templates or use our AI assistant to create one
          </p>
        </div>
        
        <Link
          to="/cover-letter-assistant"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          <FaRobot className="mr-2" />
          AI Cover Letter Assistant
        </Link>
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-[200px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Template+Preview';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-center">
                  {isAuthenticated ? (
                    <Link
                      to={`/create-cover-letter/${template.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Use Template
                    </Link>
                  ) : (
                    <Link
                      to="/login?redirect=cover-letters"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Sign in to use
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{template.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{template.description}</p>
              <div className="mt-3">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded">
                  {template.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CoverLetters;

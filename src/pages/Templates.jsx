import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import templates from '../templates';
import { useAuth } from '../contexts/AuthContext';

const Templates = () => {
  const { user } = useAuth();
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Filter templates based on search term and active filter
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes('') || 
                          template.description.toLowerCase().includes('') ||
                          template.tags.some(tag => tag.toLowerCase().includes(''));
    
    return matchesSearch;
  });

  // Get unique tags from all templates
  const allTags = [...new Set(templates.flatMap(template => template.tags))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
          >
            Choose your design
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Professional Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Select a professional template to start building your standout resume
          </motion.p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {filteredTemplates.map((template, index) => {
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ translateY: -8 }}
                className="group cursor-pointer h-[500px] rounded-xl overflow-hidden"
                onClick={() => setPreviewTemplate(template.id)}
              >
                {/* Card Container */}
                <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
                  {/* Template Preview */}
                  <div className={`h-3/4 bg-gray-100 dark:bg-gray-700 p-5 flex items-center justify-center relative overflow-hidden`}>
                    <div className="transform scale-[0.4] origin-center w-full relative shadow-2xl rounded-lg overflow-hidden bg-white">
                      <img 
                        src={template.previewImage || `/images/templates/default.png`} 
                        alt={template.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `/images/templates/default.png`;
                        }}
                      />
                    </div>
                    
                    {/* Premium Badge */}
                    {template.isPremium && !user?.isPremium && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-semibold rounded-full shadow-sm z-10">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                        </svg>
                        <span>Premium</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Info */}
                  <div className="flex-1 p-5 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {template.description}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template.id);
                        }}
                        className="flex-1 px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium transition-all duration-300"
                      >
                        Preview
                      </button>
                      <Link
                        to={`/create-resume/${template.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 px-4 py-2 text-sm text-white rounded-md font-medium transition-all duration-300 bg-blue-600 dark:bg-blue-800`}
                      >
                        Use
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {templates.find(t => t.id === previewTemplate)?.name} - Template Preview
                </h3>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="overflow-y-auto flex-1 p-6 bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  {previewTemplate && (() => {
                    const template = templates.find(t => t.id === previewTemplate);
                    return (
                      <img 
                        src={template.previewImage || `/images/templates/default.png`} 
                        alt={template.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `/images/templates/default.png`;
                        }}
                      />
                    );
                  })()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-gray-700 dark:text-gray-300"
                >
                  Close
                </button>
                <Link
                  to={`/create-resume/${previewTemplate}`}
                  className={`px-4 py-2 text-sm text-white rounded-lg font-medium transition-colors duration-300 bg-blue-600 dark:bg-blue-800`}
                >
                  Use this template
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Templates;
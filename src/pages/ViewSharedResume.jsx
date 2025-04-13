import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { templateService } from '../services/template.service';
import { resumeService } from '../services/resume.service';

// Import all templates from our new directory
import templates, { getTemplateById } from '../templates';

const ViewSharedResume = () => {
  const { shareToken } = useParams();
  const [resume, setResume] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedResume = async () => {
      try {
        setLoading(true);
        const resumeData = await resumeService.getResumeByShareToken(shareToken);
        setResume(resumeData);
        
        // Fetch template info
        const templateData = await getTemplateById(resumeData.templateId);
        setTemplate(templateData);
      } catch (err) {
        console.error('Error fetching shared resume:', err);
        setError('This shared resume link is invalid or has expired.');
        toast.error('Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedResume();
  }, [shareToken]);

  // Function to render the appropriate template component
  const renderTemplate = () => {
    if (!resume || !template) return null;
    
    // Map template components by name
    const TemplateComponent = templates[template.component];
    
    if (!TemplateComponent) {
      console.error(`Template component ${template.component} not found`);
      return <div className="text-red-500">Template not available</div>;
    }
    
    return <TemplateComponent data={resume.data} />;
  };

  // Function to copy the current URL to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  // Function to download resume as PDF (placeholder)
  const downloadPDF = () => {
    toast.success('PDF download functionality will be implemented here');
    // Actual implementation would use react-pdf or similar
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Link Expired or Invalid</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {resume && template && (
        <>
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {resume.name}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Template: {template.name}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={copyLink}
                    className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
                  >
                    <FiPrinter className="mr-2" />
                    Share
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FiDownload className="mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ViewSharedResume; 
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaSpinner, FaArrowLeft, FaSave, FaClipboard } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Import services
import { processChat } from '../services/ai.service';
import { resumeService } from '../services/resume.service';
import { useAuth } from '../contexts/AuthContext';

const CoverLetterAssistant = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeContent, setResumeContent] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState('professional');
  const resultRef = useRef(null);

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter the job description');
      return;
    }

    setIsGenerating(true);
    
    try {
      const prompt = `
        Generate a professional cover letter based on the following information:
        
        JOB DESCRIPTION:
        ${jobDescription}
        
        ${resumeContent ? `MY RESUME CONTENT OR RELEVANT EXPERIENCE:
        ${resumeContent}` : ''}
        
        ${companyInfo ? `COMPANY INFORMATION:
        ${companyInfo}` : ''}
        
        ${additionalNotes ? `ADDITIONAL NOTES OR REQUIREMENTS:
        ${additionalNotes}` : ''}
        
        TONE: ${tone}
        
        Please create a compelling cover letter that highlights my qualifications and enthusiasm for this position. Make it persuasive, specific to the job description, and about one page in length.
      `;
      
      const messages = [
        { role: "system", content: "You are a professional cover letter writer who creates personalized, compelling cover letters tailored to specific job descriptions." },
        { role: "user", content: prompt }
      ];
      
      const response = await processChat(messages);
      setGeneratedLetter(response.content.trim());
      
      // Scroll to result
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      toast.error('Failed to generate cover letter. Please try again.');
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Cover letter copied to clipboard!');
  };

  const handleSaveAsDraft = async () => {
    if (!isAuthenticated) {
      toast.error(t('coverLetters.signInToSave', 'Please sign in to save your cover letter'));
      navigate('/login?redirect=cover-letter-assistant');
      return;
    }

    try {
      // Extract company name and job title from the input fields
      const companyNameMatch = companyInfo.match(/company\s*name\s*:\s*([^\n]+)/i) || 
                             jobDescription.match(/company\s*name\s*:\s*([^\n]+)/i) ||
                             jobDescription.match(/at\s+([^,\.\n]+)/i);
      
      const jobTitleMatch = jobDescription.match(/job\s*title\s*:\s*([^\n]+)/i) || 
                          jobDescription.match(/position\s*:\s*([^\n]+)/i) ||
                          jobDescription.match(/\b(hiring|looking for|seeking)\s+a\s+([^,\.\n]+)/i);
      
      const companyName = companyNameMatch ? companyNameMatch[1].trim() : 'Company';
      const jobTitle = jobTitleMatch ? (jobTitleMatch[2] || jobTitleMatch[1]).trim() : 'Position';

      // Create a proper cover letter object
      const coverLetterData = {
        name: `${t('coverLetters.coverLetterFor')} ${companyName}`,
        templateId: 'creative', // Using the Creative template as default
        data: {
          fullName: user?.name || '',
          email: user?.email || '',
          phone: '',
          address: '',
          date: new Date().toLocaleDateString(),
          recipientName: '',
          recipientCompany: companyName,
          recipientAddress: '',
          jobTitle: jobTitle,
          letterContent: generatedLetter,
          signature: user?.name || '',
          companyName: companyName
        },
        language: localStorage.getItem('i18nextLng') || 'en'
      };

      // Save to the dashboard using the resumeService
      const savedCoverLetter = await resumeService.createCoverLetter(coverLetterData);
      
      toast.success(t('coverLetters.savedToDashboard', 'Cover letter saved to your dashboard'));
      
      // Optional: Navigate to the dashboard after saving
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving cover letter:', error);
      toast.error(t('coverLetters.saveError', 'Failed to save cover letter'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 max-w-5xl"
    >
      <div className="mb-6">
        <button
          onClick={() => navigate('/cover-letters')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Templates
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('coverLetterAssistant.title', 'AI Cover Letter Assistant')}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {t('coverLetterAssistant.subtitle', 'Generate a tailored cover letter for your job application using AI')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Job Information
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Job Description*
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here"
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Company Information
            </label>
            <textarea
              value={companyInfo}
              onChange={(e) => setCompanyInfo(e.target.value)}
              placeholder="Add any details about the company that you'd like to highlight"
              className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Your Experience
            </label>
            <textarea
              value={resumeContent}
              onChange={(e) => setResumeContent(e.target.value)}
              placeholder="Highlight your relevant experience, skills, or paste parts of your resume"
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any specific points you'd like to include in your cover letter"
              className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="professional">Professional</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="confident">Confident</option>
              <option value="formal">Formal</option>
              <option value="conversational">Conversational</option>
            </select>
          </div>

          <button
            onClick={handleGenerateCoverLetter}
            disabled={isGenerating || !jobDescription.trim()}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white font-medium ${
              isGenerating || !jobDescription.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isGenerating ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Generate Cover Letter
              </>
            )}
          </button>
        </div>

        <div ref={resultRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Generated Cover Letter
            </h2>
            {generatedLetter && (
              <div className="flex space-x-2">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FaClipboard className="mr-1" />
                  Copy
                </button>
                <button
                  onClick={handleSaveAsDraft}
                  className="flex items-center text-sm text-green-600 hover:text-green-800"
                >
                  <FaSave className="mr-1" />
                  {t('coverLetters.saveToDashboard', 'Save to Dashboard')}
                </button>
              </div>
            )}
          </div>

          {generatedLetter ? (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md whitespace-pre-line text-gray-800 dark:text-white h-[600px] overflow-y-auto">
              {generatedLetter}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md h-[600px] flex items-center justify-center text-gray-500 dark:text-gray-400 text-center">
              <div>
                <p className="mb-3">Your generated cover letter will appear here</p>
                <p className="text-sm">
                  Fill in the form and click "Generate Cover Letter" to create a personalized cover letter
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CoverLetterAssistant;

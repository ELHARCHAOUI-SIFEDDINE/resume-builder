import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaEye, FaTimes, FaArrowLeft, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

// Import cover letter templates
import coverLetterTemplates from '../coverLetterTemplates';

const EditCoverLetter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState(null);
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    recipientName: '',
    companyName: '',
    companyAddress: '',
    jobTitle: '',
    greeting: '',
    introduction: '',
    body: '',
    conclusion: '',
    closing: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        // Here you would fetch the cover letter data from your backend
        // For example:
        // const response = await fetch(`/api/cover-letters/${id}`);
        // const data = await response.json();
        
        // For now, we'll use mock data
        const mockCoverLetter = {
          id,
          templateId: 'professional', // This would come from your database
          userId: user.id,
          data: {
            fullName: user.name,
            email: user.email,
            phone: '(123) 456-7890',
            address: '123 Main St, Anytown',
            recipientName: 'Hiring Manager',
            companyName: 'Example Corp',
            companyAddress: '456 Business Ave, Commerce City',
            jobTitle: 'Software Developer',
            greeting: 'Dear',
            introduction: 'I am writing to express my interest in the Software Developer position at Example Corp as advertised on your website.',
            body: 'With over 3 years of experience in web development, I have developed strong skills in JavaScript, React, and Node.js. My most recent role at Previous Company allowed me to lead frontend development for a major product, resulting in a 40% improvement in user engagement.\n\nI am particularly drawn to Example Corp because of your innovative approach to solving real-world problems with technology. I believe my background in building accessible and performant web applications aligns perfectly with your needs as outlined in the job description.',
            conclusion: 'I am excited about the opportunity to bring my unique skills to your team and would welcome the chance to discuss how my background, skills and experience would be beneficial to Example Corp.\n\nThank you for your time and consideration. I look forward to speaking with you about this position.',
            closing: 'Sincerely',
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setCoverLetter(mockCoverLetter);
        setFormData(mockCoverLetter.data);
        
        const selectedTemplate = coverLetterTemplates.find(tmpl => tmpl.id === mockCoverLetter.templateId);
        if (!selectedTemplate) {
          throw new Error('Template not found');
        }
        
        setTemplate(selectedTemplate);
      } catch (error) {
        console.error('Error fetching cover letter:', error);
        toast.error('Failed to load cover letter');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoverLetter();
  }, [id, navigate, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.companyName || !formData.jobTitle) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Here you would update the cover letter in your database
      // For example:
      // await fetch(`/api/cover-letters/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ data: formData })
      // });
      
      toast.success('Cover letter updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating cover letter:', error);
      toast.error('Failed to update cover letter');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this cover letter? This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // Here you would delete the cover letter from your database
      // For example:
      // await fetch(`/api/cover-letters/${id}`, {
      //   method: 'DELETE'
      // });
      
      toast.success('Cover letter deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting cover letter:', error);
      toast.error('Failed to delete cover letter');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
          
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              previewMode
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {previewMode ? (
              <>
                <FaTimes className="mr-2" />
                Close Preview
              </>
            ) : (
              <>
                <FaEye className="mr-2" />
                Preview
              </>
            )}
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium ${
              isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {previewMode ? 'Preview: ' : 'Edit: '} {template.name} Cover Letter
          </h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {!previewMode ? (
            <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[calc(100vh-240px)]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Your Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Recipient Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name*
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Job Title*
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Content
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Greeting
                      </label>
                      <select
                        name="greeting"
                        value={formData.greeting}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="Dear">Dear</option>
                        <option value="Hello">Hello</option>
                        <option value="Greetings">Greetings</option>
                        <option value="To">To</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Introduction
                      </label>
                      <textarea
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white h-24"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Body
                      </label>
                      <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white h-32"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Conclusion
                      </label>
                      <textarea
                        name="conclusion"
                        value={formData.conclusion}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white h-24"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Closing
                      </label>
                      <select
                        name="closing"
                        value={formData.closing}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="Sincerely">Sincerely</option>
                        <option value="Best regards">Best regards</option>
                        <option value="Regards">Regards</option>
                        <option value="Thank you">Thank you</option>
                        <option value="Yours truly">Yours truly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className={`${previewMode ? 'w-full' : 'w-full md:w-1/2 border-l border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 overflow-y-auto max-h-[calc(100vh-240px)]`}>
            <div className="p-6">
              <TemplateComponent data={formData} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditCoverLetter;

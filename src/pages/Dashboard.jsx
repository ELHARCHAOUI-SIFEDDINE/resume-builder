import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaDownload, FaShare, FaTrash, FaEye, FaHistory, FaFileAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { resumeService } from '../services/resume.service';
import { templateService } from '../services/template.service';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setResumes, deleteResume as deleteResumeAction } from '../store/slices/resumeSlice';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resumes: reduxResumes, loading: reduxLoading } = useSelector(state => state.resume);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null); // 'resume' or 'coverLetter'
  const [activeTab, setActiveTab] = useState('resumes');
  const [coverLetters, setCoverLetters] = useState([]);
  const [coverLetterShareModalOpen, setCoverLetterShareModalOpen] = useState(false);
  const [currentCoverLetterId, setCurrentCoverLetterId] = useState(null);
  const [coverLetterShareLink, setCoverLetterShareLink] = useState('');
  const [coverLetterTemplates, setCoverLetterTemplates] = useState([]);

  // Filter resumes to only show those belonging to the current user
  const userResumes = reduxResumes.filter(resume => 
    user && resume.userId && (resume.userId === user.id || resume.userId === parseInt(user.id))
  );

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      toast.error(t('dashboard.mustBeLoggedIn'));
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data for user:', user.id);
        
        const [resumesData, templatesData, coverLettersData, coverLetterTemplatesData] = await Promise.all([
          resumeService.getUserResumes(),
          templateService.getAllTemplates(),
          // You'll need to implement this service method
          resumeService.getUserCoverLetters ? resumeService.getUserCoverLetters() : [],
          templateService.getCoverLetterTemplates ? templateService.getCoverLetterTemplates() : []
        ]);
        
        console.log('Fetched resumes:', resumesData);
        // Filter again on the client side to be extra safe
        const filteredResumes = resumesData.filter(resume => 
          resume.userId === user.id || resume.userId === parseInt(user.id)
        );
        console.log('Filtered resumes for user ID:', user.id, filteredResumes);
        
        dispatch(setResumes(filteredResumes));
        setTemplates(templatesData);
        setCoverLetters(Array.isArray(coverLettersData) ? coverLettersData : []);
        setCoverLetterTemplates(Array.isArray(coverLetterTemplatesData) ? coverLetterTemplatesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(t('dashboard.fetchError'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch, navigate, user, t]);

  const handleDeleteResume = async (id) => {
    try {
      await resumeService.deleteResume(id);
      dispatch(deleteResumeAction(id));
      toast.success(t('dashboard.resumeDeleted'));
      setDeleteConfirmId(null);
      setDeleteItemType(null);
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error(t('dashboard.deleteError'));
    }
  };

  const handleDeleteCoverLetter = async (id) => {
    try {
      await resumeService.deleteCoverLetter(id);
      // Update the local state after deletion
      setCoverLetters(prev => prev.filter(letter => letter.id !== id));
      toast.success(t('dashboard.coverLetterDeleted'));
      setDeleteConfirmId(null);
      setDeleteItemType(null);
    } catch (error) {
      console.error('Error deleting cover letter:', error);
      toast.error(t('dashboard.deleteError'));
    }
  };

  const handleShareResume = async (id) => {
    setCurrentResumeId(id);
    setShareModalOpen(true);
    setIsGeneratingLink(true);
    
    try {
      const link = await resumeService.generateShareableLink(id);
      setShareLink(link);
    } catch (error) {
      console.error('Error generating shareable link for resume:', error);
      toast.error(t('dashboard.shareError'));
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleShareCoverLetter = async (id) => {
    setCurrentCoverLetterId(id);
    setCoverLetterShareModalOpen(true);
    setIsGeneratingLink(true);
    
    try {
      const link = await resumeService.generateCoverLetterShareableLink(id);
      setCoverLetterShareLink(link);
    } catch (error) {
      console.error('Error generating shareable link for cover letter:', error);
      toast.error(t('dashboard.shareError'));
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const copyShareLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success(t('dashboard.linkCopied'));
  };

  const getTemplateName = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.name : 'Unknown Template';
  };

  const getTemplateColor = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    return template?.metadata?.primaryColor || '#3B82F6';
  };

  const countResumeSections = (resume) => {
    if (!resume?.data) return 0;
    
    let count = 0;
    const data = resume.data;
    
    if (data.personalInfo && Object.keys(data.personalInfo).length > 0) count++;
    if (data.summary && data.summary.trim() !== '') count++;
    if (data.experience && data.experience.length > 0) count++;
    if (data.education && data.education.length > 0) count++;
    if (data.skills && data.skills.length > 0) count++;
    if (data.projects && data.projects.length > 0) count++;
    if (data.certifications && data.certifications.length > 0) count++;
    
    return count;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('resumes')}
              className={`${
                activeTab === 'resumes'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm md:text-base flex items-center`}
            >
              <FaFileAlt className="mr-2" />
              {t('dashboard.myResumes')}
            </button>
            <button
              onClick={() => setActiveTab('coverLetters')}
              className={`${
                activeTab === 'coverLetters'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm md:text-base flex items-center`}
            >
              <FaFileAlt className="mr-2" />
              {t('dashboard.myCoverLetters')}
            </button>
          </nav>
        </div>

        {/* Resumes Tab Content */}
        {activeTab === 'resumes' && (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('dashboard.myResumes')}
                </h1>
                <Link
                  to="/templates"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaPlus className="mr-2" />
                  {t('dashboard.createNewResume')}
                </Link>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t('dashboard.manageResumes')}
              </p>
            </div>

            {loading || reduxLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : userResumes.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-10 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {t('dashboard.noResumesYet')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('dashboard.getStartedResume')}
                </p>
                <Link
                  to="/templates"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700"
                >
                  <FaPlus className="mr-2" />
                  {t('dashboard.createResume')}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userResumes.map(resume => (
                  <motion.div 
                    key={resume.id} 
                    className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Header with Template Color Accent */}
                    <div 
                      className="h-2 w-full"
                      style={{
                        backgroundColor: getTemplateColor(resume.templateId) || '#3B82F6'
                      }}
                    ></div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {resume.name}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                              {getTemplateName(resume.templateId)}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/40 dark:text-blue-300">
                              {resume.versions?.length || 1} {resume.versions?.length === 1 ? 'version' : 'versions'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Owner Information */}
                      <div className="mt-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 mr-2">
                          {resume.data?.personalInfo?.fullName ? resume.data.personalInfo.fullName.charAt(0) : user?.name?.charAt(0) || '?'}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-700 dark:text-gray-300">
                            {resume.data?.personalInfo?.fullName || user?.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {resume.data?.personalInfo?.position || 'No position specified'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Resume Details */}
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-x-2 gap-y-1">
                        <div className="flex items-center">
                          <span className="font-medium">Created:</span> 
                          <span className="ml-1">{formatDate(resume.createdAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">Updated:</span> 
                          <span className="ml-1">{formatDate(resume.updatedAt)}</span>
                        </div>
                        <div className="flex items-center col-span-2 mt-1">
                          <span className="font-medium">Sections:</span> 
                          <span className="ml-1">
                            {countResumeSections(resume)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3">
                      <div className="flex justify-between">
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-resume/${resume.id}`}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                          >
                            <FaEdit className="mr-1.5" />
                            {t('common.edit')}
                          </Link>
                          <button
                            onClick={() => handleShareResume(resume.id)}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                          >
                            <FaShare className="mr-1.5" />
                            {t('common.share')}
                          </button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link
                            to={`/preview-resume/${resume.id}`}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
                          >
                            <FaEye className="mr-1.5" />
                            {t('common.preview')}
                          </Link>
                          <button
                            onClick={() => {
                              setDeleteConfirmId(resume.id);
                              setDeleteItemType('resume');
                            }}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                          >
                            <FaTrash className="mr-1.5" />
                            {t('common.delete')}
                          </button>
                        </div>
                      </div>
                      
                      {/* Delete Confirmation UI */}
                      {deleteConfirmId === resume.id && (
                        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded flex items-center justify-between">
                          <p className="text-xs text-red-700 dark:text-red-400">
                            {t('dashboard.confirmDelete')}
                          </p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDeleteResume(resume.id)}
                              className="text-xs px-2 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700"
                            >
                              {t('common.yes')}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-xs px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-600"
                            >
                              {t('common.no')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Cover Letters Tab Content */}
        {activeTab === 'coverLetters' && (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('dashboard.myCoverLetters')}
                </h1>
                <Link
                  to="/cover-letters"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaPlus className="mr-2" />
                  {t('dashboard.createNewCoverLetter')}
                </Link>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t('dashboard.manageCoverLetters')}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : coverLetters.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-10 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {t('dashboard.noCoverLettersYet')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('dashboard.getStartedCoverLetter')}
                </p>
                <Link
                  to="/cover-letters"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700"
                >
                  <FaPlus className="mr-2" />
                  {t('dashboard.createCoverLetter')}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {coverLetters.map(letter => (
                  <motion.div 
                    key={letter.id} 
                    className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Header with Template Color Accent */}
                    <div 
                      className="h-2 w-full bg-purple-500"
                    ></div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {letter.name || `${t('dashboard.coverLetterFor')} ${letter.data?.companyName || t('dashboard.unknownCompany')}`}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                              {letter.templateId ? coverLetterTemplates.find(t => t.id === letter.templateId)?.name || t('dashboard.customTemplate') : t('dashboard.customTemplate')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Cover Letter Details */}
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-x-2 gap-y-1">
                        <div className="flex items-center">
                          <span className="font-medium">{t('dashboard.company')}:</span> 
                          <span className="ml-1 truncate">{letter.data?.companyName || t('dashboard.notSpecified')}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{t('dashboard.position')}:</span> 
                          <span className="ml-1 truncate">{letter.data?.jobTitle || t('dashboard.notSpecified')}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{t('dashboard.created')}:</span> 
                          <span className="ml-1">{formatDate(letter.createdAt || new Date())}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{t('dashboard.updated')}:</span> 
                          <span className="ml-1">{formatDate(letter.updatedAt || letter.createdAt || new Date())}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3">
                      <div className="flex justify-between">
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-cover-letter/${letter.id}`}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                          >
                            <FaEdit className="mr-1.5" />
                            {t('common.edit')}
                          </Link>
                          <button
                            onClick={() => handleShareCoverLetter(letter.id)}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                          >
                            <FaShare className="mr-1.5" />
                            {t('common.share')}
                          </button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link
                            to={`/preview-cover-letter/${letter.id}`}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
                          >
                            <FaEye className="mr-1.5" />
                            {t('common.preview')}
                          </Link>
                          <button
                            onClick={() => {
                              setDeleteConfirmId(letter.id);
                              setDeleteItemType('coverLetter');
                            }}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                          >
                            <FaTrash className="mr-1.5" />
                            {t('common.delete')}
                          </button>
                        </div>
                      </div>
                      
                      {/* Delete Confirmation UI */}
                      {deleteConfirmId === letter.id && (
                        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded flex items-center justify-between">
                          <p className="text-xs text-red-700 dark:text-red-400">
                            {t('dashboard.confirmDelete')}
                          </p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDeleteCoverLetter(letter.id)}
                              className="text-xs px-2 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700"
                            >
                              {t('common.yes')}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-xs px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-sm hover:bg-gray-400 dark:hover:bg-gray-600"
                            >
                              {t('common.no')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('dashboard.shareResume')}
              </h3>
              
              {isGeneratingLink ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('dashboard.shareLinkInfo')}
                  </p>
                  
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={shareLink}
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    <button
                      onClick={() => copyShareLink(shareLink)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t('dashboard.copyLink')}
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end rounded-b-lg">
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cover Letter Share Modal */}
      {coverLetterShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('dashboard.shareCoverLetter')}
              </h3>
              
              {isGeneratingLink ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('dashboard.shareCoverLetterLinkInfo')}
                  </p>
                  
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={coverLetterShareLink}
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    <button
                      onClick={() => copyShareLink(coverLetterShareLink)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t('dashboard.copyLink')}
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end rounded-b-lg">
              <button
                onClick={() => setCoverLetterShareModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
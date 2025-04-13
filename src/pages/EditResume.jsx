import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight, FiPlus, FiTrash, FiMove, FiEdit, FiSave, FiDownload, FiShare2, FiCopy } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentResume, updateResume } from '../store/slices/resumeSlice';
import { resumeService } from '../services/resume.service';
import { exportResumeToPDF } from '../utils/pdfExport';
import { useAuth } from '../contexts/AuthContext';

// Import templates from the new directory
import templates, { getTemplateById } from '../templates';

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { currentResume, loading } = useSelector(state => state.resume);
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert templates array to format expected by the component
  const templateList = templates.map(template => ({
    id: template.id,
    name: template.name,
    component: template.component
  }));

  useEffect(() => {
    const loadResume = async () => {
      try {
        // Validate user is authenticated
        if (!user) {
          toast.error('You must be logged in to edit a resume');
          navigate('/login');
          return;
        }

        setIsLoading(true);
        toast.loading('Loading resume data...');
        
        const resumeData = await resumeService.getResumeById(id);
        
        // Verify the resume belongs to the current user
        if (resumeData.userId !== user.id) {
          toast.error('You do not have permission to edit this resume');
          navigate('/dashboard');
          return;
        }
        
        dispatch(setCurrentResume(resumeData));
        
        // Set the form data from the loaded resume data
        if (resumeData && resumeData.data) {
          setFormData(resumeData.data);
          setCurrentTemplate(resumeData.templateId);
          toast.dismiss();
          toast.success('Resume loaded successfully');
        } else {
          throw new Error('Resume data is incomplete');
        }
      } catch (error) {
        console.error('Error loading resume:', error);
        toast.dismiss();
        toast.error('Failed to load resume');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [id, dispatch, navigate, user]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        achievements: ['']
      }]
    }));
  };

  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      setFormData(prev => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index)
      }));
    }
  };

  const addAchievement = (expIndex) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { ...exp, achievements: [...exp.achievements, ''] }
          : exp
      )
    }));
  };

  const removeAchievement = (expIndex, achievementIndex) => {
    if (formData.experience[expIndex].achievements.length > 1) {
      setFormData(prev => ({
        ...prev,
        experience: prev.experience.map((exp, i) => 
          i === expIndex 
            ? { 
                ...exp, 
                achievements: exp.achievements.filter((_, ai) => ai !== achievementIndex) 
              }
            : exp
        )
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: ['']
      }]
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      setFormData(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSummaryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      summary: e.target.value
    }));
  };

  const handleSkillChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index)
      }));
    }
  };

  const handleProjectChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        title: '',
        description: '',
        link: '',
        date: '',
        technologies: ['']
      }]
    }));
  };

  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      setFormData(prev => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index)
      }));
    }
  };

  const handleProjectTechnologyChange = (projectIndex, techIndex, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === projectIndex 
          ? { 
              ...project, 
              technologies: project.technologies.map((tech, j) => 
                j === techIndex ? value : tech
              ) 
            }
          : project
      )
    }));
  };

  const addProjectTechnology = (projectIndex) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === projectIndex 
          ? { ...project, technologies: [...project.technologies, ''] }
          : project
      )
    }));
  };

  const removeProjectTechnology = (projectIndex, techIndex) => {
    if (formData.projects[projectIndex].technologies.length > 1) {
      setFormData(prev => ({
        ...prev,
        projects: prev.projects.map((project, i) => 
          i === projectIndex 
            ? { 
                ...project, 
                technologies: project.technologies.filter((_, j) => j !== techIndex) 
              }
            : project
        )
      }));
    }
  };

  const handleCertificationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        url: ''
      }]
    }));
  };

  const removeCertification = (index) => {
    if (formData.certifications.length > 1) {
      setFormData(prev => ({
        ...prev,
        certifications: prev.certifications.filter((_, i) => i !== index)
      }));
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            photo: event.target.result
          }
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle save resume changes
  const handleSaveResume = async () => {
    try {
      toast.loading('Saving resume...');
      
      // Create updated resume object
      const updatedResume = {
        ...currentResume,
        data: formData,
        templateId: currentTemplate,
        updatedAt: new Date().toISOString()
      };
      
      console.log('Saving resume with data:', updatedResume);
      
      // Update in localStorage first
      try {
        const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        const resumeIndex = resumes.findIndex(r => r.id === id || r.id === String(id));
        
        if (resumeIndex !== -1) {
          resumes[resumeIndex] = updatedResume;
          localStorage.setItem('resumes', JSON.stringify(resumes));
        } else {
          console.log('Resume not found in localStorage, adding it');
          resumes.push(updatedResume);
          localStorage.setItem('resumes', JSON.stringify(resumes));
        }
        
        // Also update the individual resume entry
        localStorage.setItem(`resume_${id}`, JSON.stringify(updatedResume));
      } catch (e) {
        console.error('Error updating localStorage:', e);
      }
      
      // If connected to backend, also update there
      try {
        await resumeService.updateResume(id, updatedResume);
        dispatch(updateResume(updatedResume));
      } catch (e) {
        console.warn('Could not update resume in backend, but saved locally:', e);
      }
      
      toast.dismiss();
      toast.success('Resume saved successfully! Redirecting to dashboard...');
      
      // Navigate to dashboard after saving
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.dismiss();
      toast.error('Failed to save resume: ' + (error.message || 'Unknown error'));
    }
  };

  // Handle export to PDF
  const handleExportPDF = async () => {
    try {
      toast.loading('Generating PDF...');
      
      const resumeName = formData.personalInfo.fullName 
        ? `${formData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume`
        : 'MyResume';
        
      // Use the template ID from the resume element
      const resumeElement = document.getElementById('resume-preview');
      
      if (!resumeElement) {
        throw new Error('Resume preview element not found');
      }
      
      // Export using the utility function
      await exportResumeToPDF('resume-preview', `${resumeName}.pdf`);
      
      toast.dismiss();
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.dismiss();
      toast.error('Failed to export PDF: ' + (error.message || 'Unknown error'));
    }
  };

  const changeTemplate = (templateId) => {
    setCurrentTemplate(templateId);
  };

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const CurrentTemplateComponent = templateList.find(t => t.id === currentTemplate)?.component || templateList[0].component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Template Selection Bar */}
      <div className="bg-white dark:bg-gray-800 py-3 px-6 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Your Resume</h2>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Template:</span>
            <select 
              value={currentTemplate}
              onChange={(e) => changeTemplate(parseInt(e.target.value))}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {templateList.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Resume Information</h3>
            
            {/* Personal Information */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">1</span>
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Position/Job Title
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.personalInfo.position}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.personalInfo.location}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    name="linkedIn"
                    value={formData.personalInfo.linkedIn}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website/Portfolio
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.personalInfo.website}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">2</span>
                Professional Summary
              </h4>
              <textarea
                rows="4"
                value={formData.summary}
                onChange={handleSummaryChange}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Brief summary of your professional background and strengths..."
              />
            </section>

            {/* Work Experience Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">3</span>
                  Work Experience
                </h4>
                <button
                  onClick={addExperience}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Experience
                </button>
              </div>
              
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg dark:border-gray-600 relative">
                  {formData.experience.length > 1 && (
                    <button 
                      onClick={() => removeExperience(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove experience"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Key Achievements/Responsibilities
                      </label>
                      <button
                        onClick={() => addAchievement(index)}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        + Add Achievement
                      </button>
                    </div>
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = [...exp.achievements];
                            newAchievements[achievementIndex] = e.target.value;
                            handleExperienceChange(index, 'achievements', newAchievements);
                          }}
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Describe an achievement..."
                        />
                        {exp.achievements.length > 1 && (
                          <button 
                            onClick={() => removeAchievement(index, achievementIndex)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Education Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">4</span>
                  Education
                </h4>
                <button
                  onClick={addEducation}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Education
                </button>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg dark:border-gray-600 relative">
                  {formData.education.length > 1 && (
                    <button 
                      onClick={() => removeEducation(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove education"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        School
                      </label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="University or school name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="MM/YYYY or Expected MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Skills Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">5</span>
                  Skills
                </h4>
                <button
                  onClick={addSkill}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Skill
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g., JavaScript, Project Management, etc."
                    />
                    {formData.skills.length > 1 && (
                      <button 
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">6</span>
                  Projects
                </h4>
                <button
                  onClick={addProject}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Project
                </button>
              </div>
              
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg dark:border-gray-600 relative">
                  {formData.projects.length > 1 && (
                    <button 
                      onClick={() => removeProject(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove project"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={project.date}
                        onChange={(e) => handleProjectChange(index, 'date', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="MM/YYYY or date range"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24"
                      placeholder="Describe your project, its purpose, and your role"
                    />
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Technologies Used
                      </label>
                      <button
                        onClick={() => addProjectTechnology(index)}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        + Add Technology
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => handleProjectTechnologyChange(index, techIndex, e.target.value)}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., React, Node.js"
                          />
                          {project.technologies.length > 1 && (
                            <button 
                              onClick={() => removeProjectTechnology(index, techIndex)}
                              className="ml-2 text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Certifications Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">7</span>
                  Certifications
                </h4>
                <button
                  onClick={addCertification}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Certification
                </button>
              </div>
              
              {formData.certifications.map((cert, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg dark:border-gray-600 relative">
                  {formData.certifications.length > 1 && (
                    <button 
                      onClick={() => removeCertification(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove certification"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Certification Name
                      </label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date Issued
                      </label>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., June 2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Credential URL
                      </label>
                      <input
                        type="text"
                        value={cert.url}
                        onChange={(e) => handleCertificationChange(index, 'url', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., https://www.credential.net/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Photo Upload Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center space-x-4">
                {formData.personalInfo.photo && (
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                    <img 
                      src={formData.personalInfo.photo} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">For best results, use a square image (1:1 ratio)</p>
            </div>

            {/* Add more sections as needed to match the CreateResume form */}
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2 print:w-full">
            <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 py-2 mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Preview</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveResume}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  <FiDownload className="mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
            <div className="border rounded-lg p-4 dark:border-gray-600 overflow-hidden">
              <div id="resume-preview" className="transform scale-[0.75] origin-top-left min-h-[800px]">
                <CurrentTemplateComponent data={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditResume; 
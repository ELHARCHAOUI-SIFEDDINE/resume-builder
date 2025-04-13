import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { exportResumeToPDF } from '../utils/pdfExport';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { resumeService } from '../services/resume.service';
import { addResume } from '../store/slices/resumeSlice';
import { useAuth } from '../contexts/AuthContext';
import { FiCpu } from 'react-icons/fi';
import aiService from '../services/ai.service';

// Import templates from the new directory
import templates, { getTemplateById } from '../templates';

const CreateResume = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      website: '',
      position: '',
      photo: ''
    },
    education: [{
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: ['']
    }],
    experience: [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    }],
    projects: [{
      title: '',
      description: '',
      link: '',
      date: '',
      technologies: ['']
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      url: ''
    }],
    skills: [''],
    summary: ''
  });

  const [currentTemplate, setCurrentTemplate] = useState(parseInt(templateId) || 1);
  const [aiJobTitle, setAiJobTitle] = useState('');
  const [aiIndustry, setAiIndustry] = useState('');
  const [isGeneratingAiResume, setIsGeneratingAiResume] = useState(false);

  const templateList = templates.map(template => ({
    id: template.id,
    name: template.name,
    component: template.component
  }));

  // Set the template based on URL param when component loads
  useEffect(() => {
    if (templateId) {
      const templateIdNum = parseInt(templateId);
      if (templateList.some(t => t.id === templateIdNum)) {
        setCurrentTemplate(templateIdNum);
      }
    }
  }, [templateId]);

  // Check for AI generated resume in session storage on mount
  useEffect(() => {
    console.log('Checking for AI generated resume...');
    const aiGeneratedResume = sessionStorage.getItem('aiGeneratedResume');
    
    if (aiGeneratedResume) {
      console.log('Found AI generated resume data:', aiGeneratedResume);
      
      try {
        const resumeData = JSON.parse(aiGeneratedResume);
        console.log('Parsed resume data:', resumeData);
        
        if (!resumeData || !resumeData.personalInfo) {
          throw new Error('Invalid resume data structure');
        }
        
        // Map the AI generated data to our form structure
        const updatedFormData = {
          personalInfo: {
            ...formData.personalInfo,
            fullName: resumeData.personalInfo?.fullName || '',
            email: resumeData.personalInfo?.email || '',
            phone: resumeData.personalInfo?.phone || '',
            location: resumeData.personalInfo?.location || '',
            linkedIn: resumeData.personalInfo?.linkedIn || '',
            position: resumeData.personalInfo?.position || ''
          },
          summary: resumeData.summary || '',
          experience: resumeData.experience ? resumeData.experience.map(exp => ({
            company: exp.company || '',
            position: exp.position || '',
            location: exp.location || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            current: exp.endDate === 'Present',
            achievements: Array.isArray(exp.achievements) ? exp.achievements : [exp.achievements || '']
          })) : formData.experience,
          education: resumeData.education ? resumeData.education.map(edu => ({
            school: edu.school || '',
            degree: edu.degree || '',
            fieldOfStudy: edu.fieldOfStudy || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            gpa: edu.gpa || '',
            achievements: Array.isArray(edu.achievements) ? edu.achievements : [edu.achievements || '']
          })) : formData.education,
          skills: Array.isArray(resumeData.skills) ? resumeData.skills : formData.skills,
          projects: resumeData.projects ? resumeData.projects.map(proj => ({
            title: proj.title || '',
            description: proj.description || '',
            link: proj.link || '',
            date: proj.date || '',
            technologies: Array.isArray(proj.technologies) ? proj.technologies : [proj.technologies || '']
          })) : formData.projects,
          certifications: resumeData.certifications ? resumeData.certifications.map(cert => ({
            name: cert.name || '',
            issuer: cert.issuer || '',
            date: cert.date || '',
            url: cert.url || ''
          })) : formData.certifications
        };
        
        console.log('Setting form data to:', updatedFormData);
        setFormData(updatedFormData);
        
        toast.success('AI-generated resume loaded successfully!');
        
        // Clear the session storage
        sessionStorage.removeItem('aiGeneratedResume');
      } catch (error) {
        console.error('Error parsing AI resume data:', error);
        toast.error('Failed to load AI-generated resume: ' + error.message);
        
        // Clear the corrupted data
        sessionStorage.removeItem('aiGeneratedResume');
      }
    } else {
      console.log('No AI generated resume found in session storage');
    }
  }, []);

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

  const handleSummaryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      summary: e.target.value
    }));
  };

  const changeTemplate = (templateId) => {
    setCurrentTemplate(templateId);
    navigate(`/create-resume/${templateId}`, { replace: true });
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
              technologies: project.technologies.map((tech, ti) => 
                ti === techIndex ? value : tech
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
                technologies: project.technologies.filter((_, ti) => ti !== techIndex)
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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            photo: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveResume = async () => {
    // Basic validation
    if (!formData.personalInfo.fullName) {
      toast.error('Please enter your name');
      return;
    }

    try {
      toast.loading('Saving resume...', { id: 'save-resume' });
      
      // Add resume to database
      const resumeData = {
        ...formData,
        templateId: currentTemplate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id
      };
      
      const savedResume = await resumeService.createResume(resumeData);
      
      // Update Redux store
      dispatch(addResume(savedResume));
      
      toast.success('Resume saved successfully!', { id: 'save-resume' });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume. Please try again.', { id: 'save-resume' });
    }
  };

  const handleExportPDF = async () => {
    // Basic validation
    if (!formData.personalInfo.fullName) {
      toast.error('Please enter your name');
      return;
    }

    toast.loading('Generating PDF...', { id: 'export-pdf' });
    
    try {
      // First, find the resume template container element
      const templateElement = document.getElementById('resume-template-container');
      if (!templateElement) {
        toast.error('Could not find resume template element', { id: 'export-pdf' });
        return;
      }
      
      let success = await exportResumeToPDF('resume-template-container', `${formData.personalInfo.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      
      if (success) {
        toast.success('PDF generated successfully!', { id: 'export-pdf' });
      } else {
        toast.error('Failed to generate PDF', { id: 'export-pdf' });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.', { id: 'export-pdf' });
    }
  };

  const generateFullAiResume = async () => {
    if (!aiJobTitle || !aiIndustry) {
      toast.error('Please provide job title and industry');
      return;
    }
    
    setIsGeneratingAiResume(true);
    toast.loading('Generating AI resume...', { id: 'ai-resume' });
    
    try {
      const resumeData = await aiService.generateFullResume({
        name: formData.personalInfo.fullName || user?.name || '',
        jobTitle: aiJobTitle,
        industry: aiIndustry,
        yearsExperience: ''
      });
      
      // Update form data with AI generated content
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          ...(resumeData.personalInfo || {}),
          position: resumeData.personalInfo?.position || aiJobTitle
        },
        summary: resumeData.summary || '',
        experience: resumeData.experience ? resumeData.experience.map(exp => ({
          company: exp.company || '',
          position: exp.position || '',
          location: exp.location || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          current: exp.endDate === 'Present',
          achievements: Array.isArray(exp.achievements) ? exp.achievements : [exp.achievements || '']
        })) : formData.experience,
        education: resumeData.education ? resumeData.education.map(edu => ({
          school: edu.school || '',
          degree: edu.degree || '',
          fieldOfStudy: edu.fieldOfStudy || '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
          gpa: '',
          achievements: Array.isArray(edu.achievements) ? edu.achievements : [edu.achievements || '']
        })) : formData.education,
        skills: Array.isArray(resumeData.skills) ? resumeData.skills : formData.skills
      });
      
      toast.success('Resume generated successfully!', { id: 'ai-resume' });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error(`Failed to generate resume: ${error.message}`, { id: 'ai-resume' });
    } finally {
      setIsGeneratingAiResume(false);
    }
  };

  // Get the selected template component
  const SelectedTemplate = templateList.find(t => t.id === currentTemplate)?.component;

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
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Create Your Resume</h2>
          
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
            
            {/* AI Resume Generator */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-2">
                <FiCpu className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">AI Resume Generator</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Get a head start by letting our AI create a complete resume draft based on your basic information.
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Job Title (e.g. Software Engineer)"
                  className="px-3 py-2 border rounded flex-1 min-w-[200px] dark:bg-gray-800 dark:border-gray-700"
                  value={aiJobTitle}
                  onChange={(e) => setAiJobTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Industry (e.g. Technology)"
                  className="px-3 py-2 border rounded flex-1 min-w-[200px] dark:bg-gray-800 dark:border-gray-700"
                  value={aiIndustry}
                  onChange={(e) => setAiIndustry(e.target.value)}
                />
                <button
                  onClick={generateFullAiResume}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!aiJobTitle || !aiIndustry || isGeneratingAiResume}
                >
                  {isGeneratingAiResume ? 'Generating...' : 'Generate Resume'}
                </button>
              </div>
            </div>
            
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

            {/* Experience Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">3</span>
                  Experience
                </h4>
                <button
                  onClick={addExperience}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Experience
                </button>
              </div>
              
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 border rounded-lg dark:border-gray-600 relative">
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
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="YYYY"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        Current Position
                      </label>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Achievements/Responsibilities
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
                          placeholder="Enter an achievement..."
                        />
                        {exp.achievements.length > 1 && (
                          <button 
                            onClick={() => removeAchievement(index, achievementIndex)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                            aria-label="Remove achievement"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div key={index} className="mb-6 p-4 border rounded-lg dark:border-gray-600 relative">
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
                        placeholder="BS, MS, PhD, etc."
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
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="YYYY"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="YYYY"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GPA (optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g. 3.8"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g. JavaScript, Project Management, etc."
                    />
                    {formData.skills.length > 1 && (
                      <button 
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                        aria-label="Remove skill"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div key={index} className="mb-6 p-4 border rounded-lg dark:border-gray-600 relative">
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
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., E-commerce Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date/Timeframe
                      </label>
                      <input
                        type="text"
                        value={project.date}
                        onChange={(e) => handleProjectChange(index, 'date', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g., June 2022 - August 2022"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Link
                    </label>
                    <input
                      type="text"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g., https://github.com/yourusername/project"
                    />
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

            {/* Photo Upload Section - Add this to the Personal Information section */}
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
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2 print:w-full">
            <div className="sticky top-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 print:shadow-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Preview</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={saveResume}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Save CV
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
              <div className="border rounded-lg p-4 dark:border-gray-600 overflow-hidden">
                <div id="resume-template-container" className="min-h-full">
                  {SelectedTemplate && (
                    <SelectedTemplate data={formData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateResume;
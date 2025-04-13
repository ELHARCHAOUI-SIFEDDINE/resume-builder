import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Template1 from '../components/templates/Template1';

const Create = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Sample data for initial template preview
  const [formData, setFormData] = useState({
    personal: {
      name: "Your Name",
      title: "Professional Title",
      email: "email@example.com",
      phone: "+1 (555) 000-0000",
      location: "City, Country",
      linkedin: "",
      github: "",
      summary: "Write a brief summary of your professional background and key strengths..."
    },
    experience: [
      {
        title: "Job Title",
        company: "Company Name",
        location: "Company Location",
        period: "Start Date - End Date",
        achievements: ["Achievement 1", "Achievement 2"]
      }
    ],
    education: [
      {
        degree: "Your Degree",
        school: "University Name",
        location: "University Location",
        period: "Start Year - End Year",
        achievements: ["Achievement or GPA"]
      }
    ],
    skills: {
      technical: ["Skill 1", "Skill 2", "Skill 3"],
      soft: ["Soft Skill 1", "Soft Skill 2"]
    }
  });

  useEffect(() => {
    // Validate template ID
    if (!["1", "2", "3"].includes(templateId)) {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
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

  const handleAchievementChange = (expIndex, achieveIndex, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: exp.achievements.map((ach, j) => 
            j === achieveIndex ? value : ach
          )
        } : exp
      )
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: "",
        company: "",
        location: "",
        period: "",
        achievements: [""]
      }]
    }));
  };

  const addAchievement = (expIndex) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: [...exp.achievements, ""]
        } : exp
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Form Section */}
          <div className="w-1/2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.personal.name}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.personal.title}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.personal.email}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.personal.phone}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.personal.location}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea
                    name="summary"
                    value={formData.personal.summary}
                    onChange={handlePersonalChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Experience
                </button>
              </div>
              <div className="space-y-6">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
                        {exp.achievements.map((achievement, achieveIndex) => (
                          <div key={achieveIndex} className="mb-2">
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => handleAchievementChange(index, achieveIndex, e.target.value)}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => addAchievement(index)}
                          className="text-sm text-blue-600 hover:text-blue-700 mt-2"
                        >
                          + Add Achievement
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-1/2 bg-white rounded-xl shadow-sm overflow-hidden sticky top-8 max-h-[calc(100vh-4rem)]">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <Template1 data={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
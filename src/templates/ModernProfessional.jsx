import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const ModernProfessional = ({ data = {} }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    summary = ''
  } = data;

  return (
    <div className="max-w-[21cm] mx-auto bg-white print:shadow-none font-sans">
      {/* Google-inspired header with clean layout */}
      <header className="px-8 pt-10 pb-6 bg-white">
        <div className="border-b border-blue-600 pb-4">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl text-blue-600 font-medium mt-1">
            {personalInfo.position || 'Your Position'}
          </h2>
          
          {/* Contact details in a clean row */}
          <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600 gap-y-1">
            {personalInfo.email && (
              <div className="flex items-center mr-6 mb-1">
                <FaEnvelope className="text-blue-600 mr-2" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-600 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center mr-6 mb-1">
                <FaPhone className="text-blue-600 mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center mr-6 mb-1">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedIn && (
              <div className="flex items-center mr-6 mb-1">
                <FaLinkedin className="text-blue-600 mr-2" />
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  LinkedIn
                </a>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center mr-6 mb-1">
                <FaGithub className="text-blue-600 mr-2" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  GitHub
                </a>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center mr-6 mb-1">
                <FaGlobe className="text-blue-600 mr-2" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="px-8 py-6">
        {/* Summary Section */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
              Professional Experience
            </h3>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                    <h4 className="text-lg font-semibold text-gray-900">{job.position}</h4>
                    <span className="text-sm text-gray-600 md:text-right">
                      {job.startDate} — {job.current ? 'Present' : job.endDate}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 font-medium mb-2">
                    {job.company}{job.location && `, ${job.location}`}
                  </div>
                  
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="space-y-1 text-gray-700">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
              Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-semibold text-gray-900">{project.title}</h4>
                    {project.date && (
                      <span className="text-xs text-gray-500">
                        {project.date}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1 mb-2">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            {/* Education Section */}
            {education.length > 0 && education[0].school && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
                  Education
                </h3>
                
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="relative">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">
                            {edu.school}
                          </h4>
                          <div className="text-gray-700">
                            {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 md:text-right">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                      
                      {edu.gpa && (
                        <div className="text-gray-600 text-sm mt-1">
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
                  Certifications
                </h3>
                
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="relative">
                      <h4 className="text-base font-semibold text-gray-800">{cert.name}</h4>
                      <div className="text-sm text-gray-600 flex justify-between">
                        <span>{cert.issuer}</span>
                        {cert.date && <span>{cert.date}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="md:w-1/2">
            {/* Skills Section */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
                  Skills
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModernProfessional;

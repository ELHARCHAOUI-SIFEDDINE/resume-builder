import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const MicrosoftInspired = ({ data = {} }) => {
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
      {/* Microsoft-inspired header with accent color */}
      <header className="p-8 bg-gradient-to-r from-indigo-900 to-indigo-800">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 className="text-xl text-indigo-200 font-medium mt-1">
              {personalInfo.position || 'Your Position'}
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 space-y-1 text-white text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <FaEnvelope className="text-indigo-300 mr-2" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-300 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <FaPhone className="text-indigo-300 mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-indigo-300 mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedIn && (
              <div className="flex items-center">
                <FaLinkedin className="text-indigo-300 mr-2" />
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors">
                  LinkedIn
                </a>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center">
                <FaGithub className="text-indigo-300 mr-2" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors">
                  GitHub
                </a>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center">
                <FaGlobe className="text-indigo-300 mr-2" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors">
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
            <h3 className="text-lg font-semibold text-indigo-800 uppercase tracking-wide mb-4 flex items-center">
              <div className="w-10 h-1 bg-indigo-700 mr-3"></div>
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Two column layout for main content */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 md:pr-6">
            {/* Experience Section */}
            {experience.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-indigo-800 uppercase tracking-wide mb-4 flex items-center">
                  <div className="w-10 h-1 bg-indigo-700 mr-3"></div>
                  Experience
                </h3>
                
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="relative pb-6 last:pb-0 border-l-2 border-indigo-100 pl-6">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-indigo-700"></div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{job.position}</h4>
                        <span className="text-sm text-indigo-600 mt-1 md:mt-0 font-medium">
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
                              <span className="text-indigo-600 mr-2">•</span>
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
                <h3 className="text-lg font-semibold text-indigo-800 uppercase tracking-wide mb-4 flex items-center">
                  <div className="w-10 h-1 bg-indigo-700 mr-3"></div>
                  Projects
                </h3>
                
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="p-4 border border-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <h4 className="text-base font-semibold text-indigo-800">{project.title}</h4>
                        {project.date && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {project.date}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mt-1 mb-2">{project.description}</p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
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
          </div>
          
          <div className="md:w-1/3">
            {/* Skills Section */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-indigo-800 uppercase tracking-wide mb-4 flex items-center">
                  <div className="w-8 h-1 bg-indigo-700 mr-2"></div>
                  Skills
                </h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-indigo-50 text-indigo-800 rounded-lg text-sm font-medium flex items-center"
                    >
                      <div className="mr-2 w-2 h-2 bg-indigo-600 rounded-full"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && education[0].school && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-indigo-800 uppercase tracking-wide mb-4 flex items-center">
                  <div className="w-8 h-1 bg-indigo-700 mr-2"></div>
                  Education
                </h3>
                
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="text-base font-semibold text-gray-900">
                        {edu.school}
                      </h4>
                      <div className="text-gray-700 text-sm mt-1">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </div>
                      <div className="text-indigo-600 text-xs mt-1">
                        {edu.startDate} — {edu.endDate}
                      </div>
                      {edu.gpa && (
                        <div className="text-gray-600 text-xs mt-1">
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
                <h3 className="text-lg font-semibold text-indigo-800 uppercase tracking-wide mb-4 flex items-center">
                  <div className="w-8 h-1 bg-indigo-700 mr-2"></div>
                  Certifications
                </h3>
                
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-indigo-400 pl-3 py-1">
                      <h4 className="text-base font-medium text-gray-800">{cert.name}</h4>
                      <div className="text-sm text-gray-600 flex justify-between">
                        <span>{cert.issuer}</span>
                        {cert.date && <span className="text-indigo-600">{cert.date}</span>}
                      </div>
                    </div>
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

export default MicrosoftInspired;

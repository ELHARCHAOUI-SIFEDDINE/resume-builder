import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const CreativeBold = ({ data = {} }) => {
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
      {/* Bold, creative header with accent color */}
      <header className="relative bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 py-10 overflow-hidden">
        {/* Creative geometric shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-30 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full opacity-20 translate-x-24 translate-y-24"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-400 rounded-full opacity-20 -translate-y-1/2"></div>
        
        <div className="relative z-10 text-center px-8">
          <h1 className="text-5xl font-bold text-white tracking-wide">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 className="text-2xl text-purple-100 font-light mt-2 mb-6">
            {personalInfo.position || 'Your Position'}
          </h2>
          
          {/* Contact details in a stylish row */}
          <div className="mt-4 flex flex-wrap justify-center items-center text-sm text-white gap-x-6 gap-y-2">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-yellow-300 transition-colors">
                <FaEnvelope className="mr-2 text-yellow-300" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo.phone && (
              <span className="flex items-center">
                <FaPhone className="mr-2 text-yellow-300" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            
            {personalInfo.location && (
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-300" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            
            {personalInfo.linkedIn && (
              <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-yellow-300 transition-colors">
                <FaLinkedin className="mr-2 text-yellow-300" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-yellow-300 transition-colors">
                <FaGithub className="mr-2 text-yellow-300" />
                <span>GitHub</span>
              </a>
            )}
            
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-yellow-300 transition-colors">
                <FaGlobe className="mr-2 text-yellow-300" />
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Summary Section */}
        {summary && (
          <section className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-purple-700 mb-3 uppercase">
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Two column layout for skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2">
            {/* Experience Section */}
            {experience.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-purple-700 mb-6 uppercase flex items-center">
                  <div className="w-6 h-6 bg-purple-700 mr-3 transform rotate-45"></div>
                  Experience
                </h3>
                
                <div className="space-y-8">
                  {experience.map((job, index) => (
                    <div key={index} className="relative">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{job.position}</h4>
                        <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                          {job.startDate} — {job.current ? 'Present' : job.endDate}
                        </span>
                      </div>
                      
                      <div className="text-purple-600 font-semibold mb-3">
                        {job.company}{job.location && `, ${job.location}`}
                      </div>
                      
                      {job.achievements && job.achievements.length > 0 && (
                        <ul className="space-y-2 text-gray-700">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-pink-500 mr-2 font-bold">•</span>
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

            {/* Education Section */}
            {education.length > 0 && education[0].school && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-purple-700 mb-6 uppercase flex items-center">
                  <div className="w-6 h-6 bg-purple-700 mr-3 transform rotate-45"></div>
                  Education
                </h3>
                
                <div className="space-y-5">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">
                            {edu.school}
                          </h4>
                          <div className="text-purple-600 font-medium">
                            {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                          </div>
                        </div>
                        <span className="text-sm bg-white text-purple-700 px-3 py-1 rounded-full font-medium mt-2 md:mt-0">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                      
                      {edu.gpa && (
                        <div className="text-gray-600 text-sm mt-2">
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div>
            {/* Skills Section */}
            {skills.length > 0 && (
              <section className="mb-8 bg-purple-800 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-6 uppercase flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 mr-3 transform rotate-45"></div>
                  Skills
                </h3>
                
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 transform rotate-45 mr-3"></div>
                      <span className="text-purple-100">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className="mb-8 bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-pink-700 mb-6 uppercase flex items-center">
                  <div className="w-6 h-6 bg-pink-600 mr-3 transform rotate-45"></div>
                  Certifications
                </h3>
                
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-4 border-pink-400 pl-3 py-2">
                      <h4 className="font-bold text-gray-800">{cert.name}</h4>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                      {cert.date && <div className="text-xs text-pink-600 font-medium mt-1">{cert.date}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-purple-700 mb-6 uppercase flex items-center">
              <div className="w-6 h-6 bg-purple-700 mr-3 transform rotate-45"></div>
              Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white border-2 border-purple-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-purple-700">{project.title}</h4>
                    {project.date && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {project.date}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
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
      </main>
    </div>
  );
};

export default CreativeBold;

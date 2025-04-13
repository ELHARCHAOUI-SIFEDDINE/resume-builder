import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe, FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const TechFocused = ({ data = {} }) => {
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
      {/* Modern tech-focused header with gradient */}
      <header className="p-8 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-white">
            <h1 className="text-3xl font-bold tracking-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 className="text-xl text-teal-100 font-medium mt-1">
              {personalInfo.position || 'Your Position'}
            </h2>
            
            {summary && (
              <p className="mt-4 text-teal-50 max-w-lg text-sm">
                {summary}
              </p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-white text-sm space-y-2">
            {personalInfo.email && (
              <div className="flex items-center">
                <FaEnvelope className="text-teal-200 mr-2" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-teal-200 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <FaPhone className="text-teal-200 mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-teal-200 mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedIn && (
              <div className="flex items-center">
                <FaLinkedin className="text-teal-200 mr-2" />
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
                  LinkedIn
                </a>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center">
                <FaGithub className="text-teal-200 mr-2" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
                  GitHub
                </a>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center">
                <FaGlobe className="text-teal-200 mr-2" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="p-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Skills Section - Tech focused with categories */}
          {skills.length > 0 && (
            <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaCode className="text-teal-600 mr-2" />
                Technical Skills
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => {
                  // Color based on type of skill (you could enhance this with actual categories)
                  const colors = [
                    'bg-teal-100 text-teal-800', 
                    'bg-cyan-100 text-cyan-800',
                    'bg-blue-100 text-blue-800',
                    'bg-indigo-100 text-indigo-800'
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <span
                      key={index}
                      className={`px-3 py-1.5 ${colorClass} rounded-md text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <FaServer className="text-teal-600 mr-2" />
                Professional Experience
              </h3>
              
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="relative pb-6 last:pb-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{job.position}</h4>
                        <div className="text-teal-600 font-medium">
                          {job.company}{job.location && `, ${job.location}`}
                        </div>
                      </div>
                      <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-1 md:mt-0">
                        {job.startDate} — {job.current ? 'Present' : job.endDate}
                      </span>
                    </div>
                    
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="space-y-2 text-gray-700 mt-3">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-teal-500 mr-2 font-bold">→</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {index < experience.length - 1 && (
                      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-100"></div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Project Section - Important for tech resumes */}
          {projects && projects.length > 0 && (
            <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <FaDatabase className="text-teal-600 mr-2" />
                Projects
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 hover:border-teal-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-bold text-teal-700">{project.title}</h4>
                      {project.date && (
                        <span className="text-xs text-gray-500">
                          {project.date}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Section */}
            {education.length > 0 && education[0].school && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0
                    01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  Education
                </h3>
                
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-teal-400 pl-4 py-1">
                      <h4 className="text-base font-bold text-gray-900">
                        {edu.school}
                      </h4>
                      <div className="text-gray-700">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </div>
                      <div className="text-gray-500 text-sm mt-1 flex justify-between">
                        <span>{edu.startDate} — {edu.endDate}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certifications
                </h3>
                
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-bold text-gray-800">{cert.name}</h4>
                      <div className="text-sm text-gray-600 flex justify-between items-center mt-1">
                        <span>{cert.issuer}</span>
                        {cert.date && <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded">{cert.date}</span>}
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

export default TechFocused;

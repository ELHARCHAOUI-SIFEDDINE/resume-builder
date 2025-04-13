import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const MinimalistApple = ({ data = {} }) => {
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
      {/* Apple-inspired minimal header */}
      <header className="p-10 text-center">
        <h1 className="text-4xl font-light text-gray-900 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-xl text-gray-600 font-light mt-1">
          {personalInfo.position || 'Your Position'}
        </h2>
        
        {/* Contact details in a minimalist row */}
        <div className="mt-6 flex flex-wrap justify-center items-center text-sm text-gray-500 space-x-4">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-black transition-colors">
              <FaEnvelope className="mr-1 text-gray-400" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          
          {personalInfo.phone && (
            <span className="flex items-center">
              <FaPhone className="mr-1 text-gray-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          
          {personalInfo.location && (
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-1 text-gray-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          
          {personalInfo.linkedIn && (
            <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-black transition-colors">
              <FaLinkedin className="mr-1 text-gray-400" />
              <span>LinkedIn</span>
            </a>
          )}
          
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-black transition-colors">
              <FaGithub className="mr-1 text-gray-400" />
              <span>GitHub</span>
            </a>
          )}
          
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-black transition-colors">
              <FaGlobe className="mr-1 text-gray-400" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </header>

      <main className="px-10 py-6">
        {/* Summary Section - Apple inspired subtle border */}
        {summary && (
          <section className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
              Summary
            </h3>
            <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              {summary}
            </p>
          </section>
        )}

        <div className="border-t border-gray-100 pt-8"></div>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
              Experience
            </h3>
            
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-base font-medium text-black">{job.position}</h4>
                    <span className="text-sm text-gray-500">
                      {job.startDate} — {job.current ? 'Present' : job.endDate}
                    </span>
                  </div>
                  
                  <div className="text-center md:text-left text-gray-600 mb-3">
                    {job.company}{job.location && `, ${job.location}`}
                  </div>
                  
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="space-y-1 text-gray-600 max-w-2xl mx-auto">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
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

        <div className="border-t border-gray-100 pt-8"></div>

        {/* Skills in a minimal grid layout */}
        {skills.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
              Skills
            </h3>
            
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-gray-100 pt-8"></div>

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
              Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-5">
                  <div className="mb-2">
                    <h4 className="text-base font-medium text-gray-900">{project.title}</h4>
                    {project.date && (
                      <div className="text-xs text-gray-500 mt-1">
                        {project.date}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded">
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

        <div className="border-t border-gray-100 pt-8"></div>

        {/* Education and Certifications side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section */}
          {education.length > 0 && education[0].school && (
            <section className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
                Education
              </h3>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="text-center">
                    <h4 className="text-base font-medium text-gray-900">
                      {edu.school}
                    </h4>
                    <div className="text-gray-600 mt-1">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {edu.startDate} — {edu.endDate}
                    </div>
                    {edu.gpa && (
                      <div className="text-gray-500 text-sm mt-1">
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
              <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center p-3 border border-gray-100 rounded-lg">
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <div className="text-sm text-gray-600 mt-1">{cert.issuer}</div>
                    {cert.date && <div className="text-xs text-gray-500 mt-1">{cert.date}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default MinimalistApple;

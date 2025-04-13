import React from 'react';

const CreativeMinimal = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-8">
        {/* Header with bold creative design */}
        <header className="mb-10">
          <div className="relative pb-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2 relative z-10">
              {personalInfo?.fullName || 'Your Name'}
              <div className="absolute h-4 bg-yellow-300 bottom-1 left-0 w-full -z-10 opacity-70"></div>
            </h1>
            <h2 className="text-xl text-gray-600 font-medium tracking-wider mt-3">
              {personalInfo?.position || 'Professional Title'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span>{personalInfo?.email || 'email@example.com'}</span>
            </div>
            {personalInfo?.phone && (
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedIn && (
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </span>
                <span>{personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </header>
        
        {/* Divider */}
        <div className="w-full h-0.5 bg-gray-200 mb-8"></div>

        {/* Summary with creative highlight */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3 inline-block relative">
              About Me
              <div className="absolute h-2 bg-yellow-300 bottom-0 left-0 w-full -z-10 opacity-70"></div>
            </h3>
            <p className="text-gray-700 leading-relaxed mt-3">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 inline-block relative">
              Experience
              <div className="absolute h-2 bg-yellow-300 bottom-0 left-0 w-full -z-10 opacity-70"></div>
            </h3>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{job.position}</h4>
                      <h5 className="text-md text-gray-600">{job.company}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </div>
                  </div>
                  {job.achievements && (
                    <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 inline-block relative">
              Education
              <div className="absolute h-2 bg-yellow-300 bottom-0 left-0 w-full -z-10 opacity-70"></div>
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <h5 className="text-md text-gray-600">{edu.school}</h5>
                    {edu.gpa && <span className="text-sm text-gray-500">GPA: {edu.gpa}</span>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 inline-block relative">
              Skills
              <div className="absolute h-2 bg-yellow-300 bottom-0 left-0 w-full -z-10 opacity-70"></div>
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 inline-block relative">
              Projects
              <div className="absolute h-2 bg-yellow-300 bottom-0 left-0 w-full -z-10 opacity-70"></div>
            </h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h4 className="text-lg font-medium text-gray-800">{project.title}</h4>
                    {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                  </div>
                  <p className="text-gray-700 my-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
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

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 inline-block relative">
              Certifications
              <div className="absolute h-2 bg-yellow-300 bottom-0 left-0 w-full -z-10 opacity-70"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-800 font-medium">{cert.name}</span>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeMinimal;

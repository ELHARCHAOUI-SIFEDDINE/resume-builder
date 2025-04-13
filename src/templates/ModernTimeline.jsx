import React from 'react';

const ModernTimeline = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-8">
        {/* Header section */}
        <header className="mb-10 pb-6 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo?.fullName || 'Your Name'}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{personalInfo?.position || 'Professional Title'}</h2>
          
          <div className="flex flex-wrap gap-6 text-sm mt-4">
            {personalInfo?.email && (
              <div className="flex items-center">
                <span className="w-5 h-5 flex items-center justify-center mr-2 text-gray-500">
                  ✉️
                </span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <span className="w-5 h-5 flex items-center justify-center mr-2 text-gray-500">
                  📱
                </span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <span className="w-5 h-5 flex items-center justify-center mr-2 text-gray-500">
                  📍
                </span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedIn && (
              <div className="flex items-center">
                <span className="w-5 h-5 flex items-center justify-center mr-2 text-gray-500">
                  💼
                </span>
                <span>{personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience with timeline */}
        {experience && experience.length > 0 && (
          <section className="mb-8 relative">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Professional Experience
            </h3>
            
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-14 bottom-4 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6 relative">
              {experience.map((job, index) => (
                <div key={index} className="pl-10 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white"></div>
                  
                  <div className="flex flex-col mb-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-gray-800">{job.position}</h4>
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {job.startDate} - {job.current ? 'Present' : job.endDate}
                      </span>
                    </div>
                    <div className="text-md text-gray-700 mb-1">{job.company}, {job.location}</div>
                  </div>
                  
                  {job.achievements && (
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
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

        {/* Education with timeline */}
        {education && education.length > 0 && (
          <section className="mb-8 relative">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Education
            </h3>
            
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-14 bottom-4 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="pl-10 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <div className="text-md text-gray-700">{edu.school}</div>
                      {edu.gpa && <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>}
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects with timeline */}
        {projects && projects.length > 0 && (
          <section className="mb-8 relative">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Projects
            </h3>
            
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-14 bottom-4 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="pl-10 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-purple-500 rounded-full border-2 border-white"></div>
                  
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-gray-800">{project.title}</h4>
                    {project.date && (
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {project.date}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 my-2">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full mr-3">
                    🏆
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer} • {cert.date}</div>
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

export default ModernTimeline;

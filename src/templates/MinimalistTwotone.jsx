import React from 'react';

const MinimalistTwotone = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="grid grid-cols-3 max-w-[850px] mx-auto min-h-screen">
        {/* Left sidebar with dark background */}
        <div className="col-span-1 bg-gray-900 text-white p-8">
          {/* Profile section */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-1 text-white">{personalInfo?.fullName || 'Your Name'}</h1>
            <h2 className="text-md text-gray-300 mb-4">{personalInfo?.position || 'Professional Title'}</h2>
            
            <div className="mt-6 space-y-3 text-sm">
              {personalInfo?.email && (
                <div className="flex items-start">
                  <span className="mr-3 text-gray-400">Email</span>
                  <span className="text-gray-200 break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-start">
                  <span className="mr-3 text-gray-400">Phone</span>
                  <span className="text-gray-200">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-start">
                  <span className="mr-3 text-gray-400">Location</span>
                  <span className="text-gray-200">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo?.linkedIn && (
                <div className="flex items-start">
                  <span className="mr-3 text-gray-400">LinkedIn</span>
                  <span className="text-gray-200 break-all">{personalInfo.linkedIn}</span>
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-start">
                  <span className="mr-3 text-gray-400">Website</span>
                  <span className="text-gray-200 break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Skills section */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-white">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Education section */}
          {education && education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-white">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <h4 className="text-md font-medium text-white">{edu.degree}</h4>
                    <p className="text-gray-300 text-sm">{edu.fieldOfStudy}</p>
                    <p className="text-gray-300 text-sm">{edu.school}</p>
                    <p className="text-gray-400 text-xs mt-1">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications section */}
          {certifications && certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-white">
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="mb-2">
                    <div className="text-md text-white font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-300">{cert.issuer}</div>
                    <div className="text-xs text-gray-400">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Main content area */}
        <div className="col-span-2 p-8">
          {/* Summary section */}
          {summary && (
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                Professional Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )}
          
          {/* Experience section */}
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Work Experience
              </h3>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-1">
                      <h4 className="text-lg font-semibold text-gray-800">{job.position}</h4>
                      <span className="text-sm text-gray-600 font-medium">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-3">
                      <h5 className="text-md text-gray-700">{job.company}</h5>
                      <span className="text-sm text-gray-600 italic">{job.location}</span>
                    </div>
                    {job.achievements && (
                      <ul className="list-disc pl-5 text-gray-700 space-y-1.5 text-sm">
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
          
          {/* Projects section */}
          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Projects
              </h3>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                      {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                    </div>
                    <p className="text-gray-700 my-2 text-sm">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
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
      </div>
    </div>
  );
};

export default MinimalistTwotone;

import React from 'react';

const BusinessModern = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto">
        {/* Header with accent color top bar */}
        <div className="h-12 bg-blue-900 w-full"></div>
        
        <div className="p-8">
          <header className="mb-10 flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo?.fullName || 'Your Name'}</h1>
              <h2 className="text-xl text-blue-800 font-medium mb-3">{personalInfo?.position || 'Professional Title'}</h2>
              <p className="text-gray-700 max-w-lg">{summary}</p>
            </div>
            
            <div className="mt-6 md:mt-0 md:text-right">
              {personalInfo?.email && <div className="text-gray-700 mb-1">{personalInfo.email}</div>}
              {personalInfo?.phone && <div className="text-gray-700 mb-1">{personalInfo.phone}</div>}
              {personalInfo?.location && <div className="text-gray-700 mb-1">{personalInfo.location}</div>}
              {personalInfo?.linkedIn && <div className="text-blue-800 mb-1">{personalInfo.linkedIn}</div>}
              {personalInfo?.website && <div className="text-blue-800 mb-1">{personalInfo.website}</div>}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="md:col-span-2">
              {/* Experience */}
              {experience && experience.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
                    Professional Experience
                  </h3>
                  <div className="space-y-6">
                    {experience.map((job, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">{job.position}</h4>
                          <span className="text-sm text-gray-600 font-medium">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                          <h5 className="text-md text-gray-700">{job.company}</h5>
                          <span className="text-sm text-gray-600 italic">{job.location}</span>
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

              {/* Projects */}
              {projects && projects.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
                    Key Projects
                  </h3>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-md font-semibold text-gray-800">{project.title}</h4>
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
            </div>

            {/* Right column */}
            <div className="md:col-span-1">
              {/* Skills */}
              {skills && skills.length > 0 && (
                <section className="mb-8 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
                    Skills
                  </h3>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-800">{skill}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-800 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <section className="mb-8 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
                    Education
                  </h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="mb-2">
                        <h4 className="text-md font-semibold text-gray-800">{edu.degree}</h4>
                        <p className="text-gray-700">{edu.fieldOfStudy}</p>
                        <p className="text-gray-700">{edu.school}</p>
                        <p className="text-gray-600 text-sm mt-1">{edu.startDate} - {edu.endDate}</p>
                        {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <section className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="mb-2">
                        <div className="text-md text-gray-800 font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-700">{cert.issuer}</div>
                        <div className="text-xs text-gray-600 mt-1">{cert.date}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModern;

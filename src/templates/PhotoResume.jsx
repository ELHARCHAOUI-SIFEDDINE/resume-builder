import React from 'react';

const PhotoResume = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-8 shadow-lg">
        {/* Header with photo section */}
        <header className="grid grid-cols-3 gap-6 pb-6 border-b-2 border-gray-200 mb-6">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo?.fullName || 'Your Name'}</h1>
            <h2 className="text-xl text-blue-700 mb-3">{personalInfo?.position || 'Professional Title'}</h2>
            
            <div className="text-sm space-y-1 mt-4">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <span className="mr-2">📱</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo?.linkedIn && (
                <div className="flex items-center">
                  <span className="mr-2">🔗</span>
                  <span>{personalInfo.linkedIn}</span>
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-center">
                  <span className="mr-2">🌐</span>
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo?.github && (
                <div className="flex items-center">
                  <span className="mr-2">💻</span>
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 flex justify-end">
            {/* Candidate Photo */}
            <div className="w-40 h-40 rounded-full border-4 border-blue-700 overflow-hidden bg-gray-100">
              {personalInfo?.photo ? (
                <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h3>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL EXPERIENCE</h3>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-gray-800 font-semibold">{job.position}</h4>
                    <span className="text-sm text-gray-600">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-gray-700">{job.company}</h5>
                    <span className="text-sm text-gray-500">{job.location}</span>
                  </div>
                  {job.achievements && (
                    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
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
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">EDUCATION</h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-gray-800 font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h5 className="text-gray-700">{edu.school}</h5>
                    {edu.gpa && <span className="text-sm text-gray-600">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">PROJECTS</h3>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-gray-800 font-semibold">{project.title}</h4>
                    {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
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
            <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b border-gray-200 pb-1">CERTIFICATIONS</h3>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-800">{cert.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm">{cert.issuer}</span>
                    <span className="text-gray-500 text-sm">{cert.date}</span>
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

export default PhotoResume;

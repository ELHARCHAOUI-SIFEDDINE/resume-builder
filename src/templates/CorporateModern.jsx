import React from 'react';

const CorporateModern = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-10">
        {/* Header with corporate styling */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-4 border-blue-800 pb-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-1">{personalInfo?.fullName || 'Your Name'}</h1>
              <h2 className="text-xl text-gray-600 mb-2">{personalInfo?.position || 'Professional Title'}</h2>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              {personalInfo?.email && <div className="text-gray-700">{personalInfo.email}</div>}
              {personalInfo?.phone && <div className="text-gray-700">{personalInfo.phone}</div>}
              {personalInfo?.location && <div className="text-gray-700">{personalInfo.location}</div>}
            </div>
          </div>
          <div className="flex flex-wrap justify-start gap-4 text-sm mt-3">
            {personalInfo?.linkedIn && (
              <a href={personalInfo.linkedIn} className="text-blue-600 hover:underline">
                LinkedIn Profile
              </a>
            )}
            {personalInfo?.website && (
              <a href={personalInfo.website} className="text-blue-600 hover:underline">
                Personal Website
              </a>
            )}
            {personalInfo?.github && (
              <a href={personalInfo.github} className="text-blue-600 hover:underline">
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-2 uppercase tracking-wider border-b border-gray-300 pb-1">
              Summary
            </h3>
            <p className="text-gray-700 leading-relaxed mt-2">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
              Professional Experience
            </h3>
            <div className="space-y-5">
              {experience.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                    <h4 className="text-lg font-semibold text-gray-800">{job.position}</h4>
                    <span className="text-sm text-gray-600 font-medium">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <h5 className="text-md text-gray-700 font-medium">{job.company}</h5>
                    <span className="text-sm text-gray-600 italic">{job.location}</span>
                  </div>
                  {job.achievements && (
                    <ul className="list-disc pl-5 text-gray-700 space-y-1.5">
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

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h4 className="text-md font-semibold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h5 className="text-md text-gray-700">{edu.school}</h5>
                    {edu.gpa && <span className="text-sm text-gray-600">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
              Key Projects
            </h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h4 className="text-md font-semibold text-gray-800">{project.title}</h4>
                    {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                  </div>
                  <p className="text-gray-700 my-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-1">
                      <span className="text-sm font-medium text-gray-600">Technologies: </span>
                      <span className="text-sm text-gray-600">{project.technologies.join(', ')}</span>
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
            <h3 className="text-lg font-bold text-blue-800 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

export default CorporateModern;

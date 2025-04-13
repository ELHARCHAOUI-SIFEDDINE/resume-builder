import React from 'react';

const SimpleElegant = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-8">
        {/* Clean, minimal header */}
        <header className="text-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-light text-gray-900 tracking-wide uppercase mb-1">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <h2 className="text-lg text-gray-600 mb-3">
            {personalInfo?.position || 'Professional Title'}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm mt-4">
            {personalInfo?.email && (
              <span className="text-gray-600">{personalInfo.email}</span>
            )}
            {personalInfo?.phone && (
              <span className="text-gray-600">{personalInfo.phone}</span>
            )}
            {personalInfo?.location && (
              <span className="text-gray-600">{personalInfo.location}</span>
            )}
            {personalInfo?.linkedIn && (
              <span className="text-gray-600">{personalInfo.linkedIn}</span>
            )}
            {personalInfo?.website && (
              <span className="text-gray-600">{personalInfo.website}</span>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-lg uppercase tracking-wider font-light text-gray-800 mb-3 text-center">
              Professional Profile
            </h3>
            <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              {summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg uppercase tracking-wider font-light text-gray-800 mb-3 border-b border-gray-200 pb-2">
                  Expertise
                </h3>
                <ul className="space-y-1">
                  {skills.map((skill, index) => (
                    <li key={index} className="text-gray-700">
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg uppercase tracking-wider font-light text-gray-800 mb-3 border-b border-gray-200 pb-2">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-800">{edu.degree}</p>
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                      <p className="text-gray-700">{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section className="mb-6">
                <h3 className="text-lg uppercase tracking-wider font-light text-gray-800 mb-3 border-b border-gray-200 pb-2">
                  Certifications
                </h3>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-800">{cert.name}</p>
                      <p className="text-gray-700 text-sm">{cert.issuer}</p>
                      <p className="text-gray-600 text-sm">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Experience and Projects) */}
          <div className="md:col-span-2">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg uppercase tracking-wider font-light text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="mb-4">
                      <div className="mb-1">
                        <h4 className="text-md font-medium text-gray-800">
                          {job.position}
                        </h4>
                        <div className="flex justify-between items-center">
                          <h5 className="text-gray-700">
                            {job.company}, {job.location}
                          </h5>
                          <span className="text-sm text-gray-600">
                            {job.startDate} - {job.current ? 'Present' : job.endDate}
                          </span>
                        </div>
                      </div>
                      {job.achievements && (
                        <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mt-2">
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
                <h3 className="text-lg uppercase tracking-wider font-light text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Notable Projects
                </h3>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-md font-medium text-gray-800">{project.title}</h4>
                        {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                      </div>
                      <p className="text-gray-700 text-sm">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="italic">Technologies: </span>
                          {project.technologies.join(', ')}
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
    </div>
  );
};

export default SimpleElegant;

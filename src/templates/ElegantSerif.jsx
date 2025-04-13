import React from 'react';

const ElegantSerif = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="min-h-screen bg-white text-gray-800 print:text-black">
      <div className="max-w-[850px] mx-auto p-10 print:p-6">
        {/* Header with elegant serif styling */}
        <header className="mb-8 text-center border-b-2 border-gray-200 pb-6">
          <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-wide mb-1">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl font-serif text-gray-600 mb-4 italic">
            {personalInfo?.position || 'Professional Title'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-3">
            {personalInfo?.email && (
              <div className="flex items-center">
                <span className="font-medium">Email:</span>
                <span className="ml-1">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <span className="font-medium">Phone:</span>
                <span className="ml-1">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <span className="font-medium">Location:</span>
                <span className="ml-1">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedIn && (
              <div className="flex items-center">
                <span className="font-medium">LinkedIn:</span>
                <span className="ml-1">{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center">
                <span className="font-medium">Website:</span>
                <span className="ml-1">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">
              Professional Summary
            </h3>
            <p className="text-gray-700 font-serif leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-serif font-semibold text-gray-800">{job.position}</h4>
                    <span className="text-sm text-gray-600">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-base font-serif italic text-gray-700">{job.company}</h5>
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  {job.achievements && (
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="font-serif">{achievement}</li>
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
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-serif font-semibold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h5 className="text-base font-serif italic text-gray-700">{edu.school}</h5>
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
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
              Skills
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span className="font-serif">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-serif font-semibold text-gray-800">{project.title}</h4>
                    {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                  </div>
                  <p className="text-gray-700 mb-1 font-serif">{project.description}</p>
                  {project.technologies && (
                    <div className="text-sm text-gray-600 italic">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
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
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-serif text-gray-800">{cert.name}</span>
                  <div className="text-gray-600 text-sm">
                    <span className="mr-3">{cert.issuer}</span>
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

export default ElegantSerif;

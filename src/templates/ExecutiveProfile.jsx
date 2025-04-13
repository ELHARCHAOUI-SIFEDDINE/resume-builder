import React from 'react';

const ExecutiveProfile = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-10 shadow-lg">
        {/* Header Section with elegant border */}
        <header className="relative border-b-2 border-gray-300 mb-8 pb-6">
          <div className="absolute left-0 bottom-0 w-1/3 h-1 bg-gray-800 -mb-0.5"></div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1 uppercase">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl font-medium text-gray-700 mb-4 tracking-wide">
            {personalInfo?.position || 'Executive Title'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="space-y-1 text-sm">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">Email:</span>
                  <span className="text-gray-800">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">Phone:</span>
                  <span className="text-gray-800">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">Location:</span>
                  <span className="text-gray-800">{personalInfo.location}</span>
                </div>
              )}
            </div>
            <div className="space-y-1 text-sm">
              {personalInfo?.linkedIn && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">LinkedIn:</span>
                  <span className="text-gray-800">{personalInfo.linkedIn}</span>
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">Website:</span>
                  <span className="text-gray-800">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo?.github && (
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-24">GitHub:</span>
                  <span className="text-gray-800">{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-lg uppercase font-semibold text-gray-800 mb-4 tracking-wider border-b border-gray-200 pb-1">
              Executive Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg uppercase font-semibold text-gray-800 mb-4 tracking-wider border-b border-gray-200 pb-1">
              Leadership Experience
            </h3>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-gray-900 font-semibold text-lg">{job.position}</h4>
                    <span className="text-sm text-gray-600 font-medium">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-3">
                    <h5 className="text-gray-700 font-medium">{job.company}</h5>
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  {job.achievements && (
                    <ul className="list-disc pl-5 text-gray-700 space-y-1.5 leading-relaxed">
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

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          <section className="mb-6">
            {education && education.length > 0 && (
              <>
                <h3 className="text-lg uppercase font-semibold text-gray-800 mb-4 tracking-wider border-b border-gray-200 pb-1">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h4 className="text-gray-900 font-semibold">{edu.degree}</h4>
                      <p className="text-gray-700">{edu.fieldOfStudy}</p>
                      <p className="text-gray-700">{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Skills */}
          <section className="mb-6">
            {skills && skills.length > 0 && (
              <>
                <h3 className="text-lg uppercase font-semibold text-gray-800 mb-4 tracking-wider border-b border-gray-200 pb-1">
                  Core Competencies
                </h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-gray-700">
                      • {skill}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg uppercase font-semibold text-gray-800 mb-4 tracking-wider border-b border-gray-200 pb-1">
              Strategic Projects
            </h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-gray-900 font-semibold">{project.title}</h4>
                    {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                  </div>
                  <p className="text-gray-700 my-1">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg uppercase font-semibold text-gray-800 mb-4 tracking-wider border-b border-gray-200 pb-1">
              Certifications & Affiliations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-800 font-medium">{cert.name}</span>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{cert.issuer}</span>
                    <span className="text-gray-600">{cert.date}</span>
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

export default ExecutiveProfile;

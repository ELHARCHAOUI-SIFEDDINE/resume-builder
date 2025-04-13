import React from 'react';

const TechMinimal = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data || {};

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-[850px] mx-auto p-8">
        {/* Minimalist technical header with accent line */}
        <header className="mb-10 relative pb-4">
          <div className="absolute bottom-0 left-0 h-1 w-24 bg-indigo-500"></div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{personalInfo?.fullName || 'Your Name'}</h1>
          <h2 className="text-xl text-indigo-600 font-medium mb-3">{personalInfo?.position || 'Professional Title'}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm mt-4">
            {personalInfo?.email && (
              <span className="inline-flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                {personalInfo.email}
              </span>
            )}
            {personalInfo?.phone && (
              <span className="inline-flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo?.location && (
              <span className="inline-flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                {personalInfo.location}
              </span>
            )}
            {personalInfo?.github && (
              <span className="inline-flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {personalInfo.github}
              </span>
            )}
            {personalInfo?.linkedIn && (
              <span className="inline-flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                {personalInfo.linkedIn}
              </span>
            )}
            {personalInfo?.website && (
              <span className="inline-flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                </svg>
                {personalInfo.website}
              </span>
            )}
          </div>
        </header>

        {/* Summary with code-like formatting */}
        {summary && (
          <section className="mb-8 bg-gray-50 p-4 rounded border border-gray-200 font-mono">
            <div className="text-gray-400 mb-2">// Profile</div>
            <p className="text-gray-800 whitespace-pre-line">{summary}</p>
          </section>
        )}

        {/* Two column layout for main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - 2/3 width */}
          <div className="md:col-span-2">
            {/* Experience with code-inspired sections */}
            {experience && experience.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 relative pb-2">
                  <span className="text-gray-400 font-mono">01.</span> Work Experience
                  <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-indigo-500"></div>
                </h3>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline flex-wrap">
                        <h4 className="text-lg font-medium text-gray-900">{job.position}</h4>
                        <span className="text-sm text-indigo-600 font-mono">
                          {job.startDate} → {job.current ? 'Present' : job.endDate}
                        </span>
                      </div>
                      <div className="text-md text-gray-700 mb-2">
                        <span className="font-medium">{job.company}</span> | {job.location}
                      </div>
                      {job.achievements && (
                        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
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

            {/* Projects with tech tags */}
            {projects && projects.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 relative pb-2">
                  <span className="text-gray-400 font-mono">02.</span> Projects
                  <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-indigo-500"></div>
                </h3>
                <div className="space-y-5">
                  {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-baseline flex-wrap">
                        <h4 className="text-md font-medium text-gray-900">{project.title}</h4>
                        {project.date && <span className="text-sm text-gray-500">{project.date}</span>}
                      </div>
                      <p className="text-gray-700 my-1 text-sm">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-mono">
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

          {/* Right column - 1/3 width */}
          <div className="md:col-span-1">
            {/* Skills with code-like formatting */}
            {skills && skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 relative pb-2">
                  <span className="text-gray-400 font-mono">03.</span> Skills
                  <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-indigo-500"></div>
                </h3>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 font-mono text-sm">
                  <div className="text-gray-400 mb-2">// Technical skills</div>
                  {skills.map((skill, index) => (
                    <div key={index} className="text-gray-800 mb-1">
                      const <span className="text-indigo-600">{skill.replace(/\s+/g, '_')}</span>;
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education with minimal styling */}
            {education && education.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 relative pb-2">
                  <span className="text-gray-400 font-mono">04.</span> Education
                  <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-indigo-500"></div>
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h4 className="text-md font-medium text-gray-900">{edu.degree}</h4>
                      <p className="text-sm text-gray-700">{edu.fieldOfStudy}</p>
                      <p className="text-sm text-gray-700">{edu.school}</p>
                      <p className="text-xs text-gray-500 mt-1">{edu.startDate} → {edu.endDate}</p>
                      {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section className="mb-6">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 relative pb-2">
                  <span className="text-gray-400 font-mono">05.</span> Certifications
                  <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-indigo-500"></div>
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="mb-2">
                      <div className="text-md text-gray-900 font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-700">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
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

export default TechMinimal;

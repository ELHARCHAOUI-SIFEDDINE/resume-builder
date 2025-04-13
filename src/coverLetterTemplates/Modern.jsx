import React from 'react';
import { format } from 'date-fns';

const Modern = ({ data }) => {
  const {
    fullName = 'Your Name',
    email = 'your.email@example.com',
    phone = '(123) 456-7890',
    linkedin = 'linkedin.com/in/yourprofile',
    recipientName = 'Hiring Manager',
    companyName = 'Company Name',
    jobTitle = 'Job Title',
    date = format(new Date(), 'MMMM dd, yyyy'),
    greeting = 'Dear',
    introduction = 'I am applying for the [Job Title] position at [Company Name]. With my background in [relevant field] and passion for [industry/sector], I believe I would be a valuable addition to your team.',
    body = 'Throughout my career at [Previous Company], I have developed expertise in [key skill] and [key skill], consistently delivering [specific achievement]. I am particularly skilled at [specific skill], which has enabled me to [specific accomplishment].\n\nWhat attracts me to [Company Name] is your commitment to [company value/mission]. I admire how your organization has [specific company achievement], and I am excited about contributing to future initiatives in this area.\n\nMy experience with [relevant experience] has equipped me with the necessary skills to excel in this role. I am adept at [technical skill] and have a proven track record of [relevant achievement].',
    conclusion = 'I would welcome the opportunity to discuss how my skills and experience align with your needs for this position. I am confident that my approach to [relevant aspect of job] would bring valuable insights to your team.\n\nThank you for considering my application. I look forward to the possibility of contributing to [Company Name]\'s continued success.',
    closing = 'Regards',
  } = data || {};

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white text-gray-800 font-sans">
      {/* Header with colored background */}
      <div className="bg-blue-600 text-white p-6 mb-6">
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <div className="flex flex-wrap gap-x-4 mt-2 text-sm">
          <div>{email}</div>
          <div>{phone}</div>
          {linkedin && <div>{linkedin}</div>}
        </div>
      </div>

      {/* Date */}
      <div className="mb-6 text-gray-600">
        {date}
      </div>

      {/* Recipient Info */}
      <div className="mb-6">
        <div className="font-medium">{recipientName}</div>
        <div>{companyName}</div>
        <div>Re: {jobTitle} Position</div>
      </div>

      {/* Greeting */}
      <div className="mb-4">
        {greeting} {recipientName},
      </div>

      {/* Content */}
      <div className="space-y-4 whitespace-pre-line">
        <p>{introduction}</p>
        <p>{body}</p>
        <p>{conclusion}</p>
      </div>

      {/* Closing */}
      <div className="mt-8">
        <div className="mb-6">{closing},</div>
        <div className="font-semibold">{fullName}</div>
      </div>
    </div>
  );
};

export default Modern;

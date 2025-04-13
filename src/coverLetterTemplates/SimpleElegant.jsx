import React from 'react';
import { format } from 'date-fns';

const SimpleElegant = ({ data }) => {
  const {
    fullName = 'Your Name',
    email = 'your.email@example.com',
    phone = '(123) 456-7890',
    address = 'Your Address',
    recipientName = 'Hiring Manager',
    companyName = 'Company Name',
    companyAddress = 'Company Address',
    jobTitle = 'Job Title',
    date = format(new Date(), 'MMMM dd, yyyy'),
    greeting = 'Dear',
    introduction = 'I am writing to express my interest in the [Job Title] position at [Company Name]. With my background in [relevant field], I am confident in my ability to make a valuable contribution to your team.',
    body = 'My professional experience includes [key experience], where I developed strong skills in [key skill] and [key skill]. During my time at [Previous Company], I successfully [key achievement], which resulted in [positive outcome].\n\nI am particularly interested in joining [Company Name] because of your reputation for [company strength/value]. I am impressed by your recent [project/initiative], and I believe my experience in [relevant experience] would allow me to contribute effectively to similar endeavors.\n\nMy approach to [relevant aspect of job] is characterized by [quality] and [quality], which has enabled me to [achievement]. I am adept at [skill] and committed to [relevant value in industry].',
    conclusion = 'I would welcome the opportunity to discuss how my qualifications align with your needs for this position. I am available for an interview at your convenience and look forward to learning more about this opportunity.\n\nThank you for considering my application.',
    closing = 'Sincerely',
  } = data || {};

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white text-gray-800 font-serif">
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center">{fullName}</h1>
        <div className="text-center text-gray-600 text-sm">
          <div>{email} | {phone}</div>
          {address && <div>{address}</div>}
        </div>
      </div>

      {/* Horizontal line */}
      <div className="border-t border-gray-300 mb-6"></div>

      {/* Date */}
      <div className="mb-6">
        {date}
      </div>

      {/* Recipient Info */}
      <div className="mb-6">
        <div>{recipientName}</div>
        <div>{companyName}</div>
        {companyAddress && <div>{companyAddress}</div>}
      </div>

      {/* Subject Line */}
      <div className="mb-6 font-medium">
        Re: Application for {jobTitle}
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
        <div className="mb-8">{closing},</div>
        <div>{fullName}</div>
      </div>
    </div>
  );
};

export default SimpleElegant;

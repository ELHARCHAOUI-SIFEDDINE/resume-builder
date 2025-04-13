import React from 'react';
import { format } from 'date-fns';

const Professional = ({ data }) => {
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
    introduction = 'I am writing to express my interest in the [Job Title] position at [Company Name] as advertised on [Job Board/Website].',
    body = 'With [X years] of experience in [relevant field], I have developed strong skills in [key skill] and [key skill]. My most recent role at [Previous Company] allowed me to [major accomplishment], resulting in [quantifiable result].\n\nI am particularly drawn to [Company Name] because of [specific company attribute/project/innovation]. I believe my background in [relevant experience] aligns perfectly with your needs as outlined in the job description.\n\nIn my previous role, I [specific responsibility] which resulted in [specific achievement]. I also [another responsibility] and [another achievement].',
    conclusion = 'I am excited about the opportunity to bring my unique skills to your team and would welcome the chance to discuss how my background, skills and experience would be beneficial to your organization.\n\nThank you for your time and consideration. I look forward to speaking with you about this position.',
    closing = 'Sincerely',
  } = data || {};

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white text-gray-800 font-serif">
      {/* Sender Info */}
      <div className="text-right mb-6">
        <div className="font-bold text-xl">{fullName}</div>
        <div>{email}</div>
        <div>{phone}</div>
        <div>{address}</div>
      </div>

      {/* Date */}
      <div className="mb-6">
        {date}
      </div>

      {/* Recipient Info */}
      <div className="mb-6">
        <div>{recipientName}</div>
        <div>{companyName}</div>
        <div>{companyAddress}</div>
      </div>

      {/* Subject Line */}
      <div className="mb-6">
        <strong>Re: Application for {jobTitle} Position</strong>
      </div>

      {/* Greeting */}
      <div className="mb-4">
        {greeting} {recipientName},
      </div>

      {/* Content */}
      <div className="mb-4 whitespace-pre-line">
        {introduction}
      </div>
      
      <div className="mb-4 whitespace-pre-line">
        {body}
      </div>
      
      <div className="mb-8 whitespace-pre-line">
        {conclusion}
      </div>

      {/* Closing */}
      <div>
        <div className="mb-8">{closing},</div>
        <div>{fullName}</div>
      </div>
    </div>
  );
};

export default Professional;

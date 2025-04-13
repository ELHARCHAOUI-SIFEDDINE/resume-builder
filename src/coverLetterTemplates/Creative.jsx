import React from 'react';
import { format } from 'date-fns';

const Creative = ({ data }) => {
  const {
    fullName = 'Your Name',
    email = 'your.email@example.com',
    phone = '(123) 456-7890',
    portfolio = 'yourportfolio.com',
    recipientName = 'Hiring Manager',
    companyName = 'Company Name',
    jobTitle = 'Job Title',
    date = format(new Date(), 'MMMM dd, yyyy'),
    greeting = 'Hello',
    introduction = "I'm excited to apply for the [Job Title] position at [Company Name]. As a creative professional with [X years] of experience, I'm eager to bring my unique perspective and skills to your team.",
    body = "My passion for [industry/field] has led me to develop expertise in [key skill], [key skill], and [key skill]. I thrive in environments that challenge me to think outside the box and push creative boundaries.\n\nAt [Previous Company], I spearheaded [specific project], which resulted in [specific achievement]. This experience taught me the value of [lesson learned] and strengthened my abilities in [relevant skill].\n\nWhat excites me most about [Company Name] is [specific company project/culture/value]. I'm particularly impressed by [recent company work], and I'm confident I can contribute meaningfully to your creative initiatives.",
    conclusion = "I'd love the opportunity to discuss how my creative approach and technical skills could benefit your team. I've attached my portfolio showcasing my recent work in [relevant field].\n\nThank you for considering my application. I look forward to the possibility of creating amazing work together!",
    closing = 'Best regards',
  } = data || {};

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white text-gray-800 font-sans">
      {/* Header with Name */}
      <div className="border-b-4 border-purple-500 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-purple-600">{fullName}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <div>{email}</div>
          <div>{phone}</div>
          {portfolio && <div>{portfolio}</div>}
        </div>
      </div>

      {/* Date */}
      <div className="mb-6 text-right italic">
        {date}
      </div>

      {/* Job Application Title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-purple-600">Application for: {jobTitle}</h2>
        <div className="font-medium">{companyName}</div>
      </div>

      {/* Greeting */}
      <div className="mb-4 text-lg">
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
        <div className="font-bold">{fullName}</div>
      </div>
    </div>
  );
};

export default Creative;

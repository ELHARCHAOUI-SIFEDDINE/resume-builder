import React from 'react';

const ModernSimple = ({ data }) => {
  const {
    fullName = '',
    email = '',
    phone = '',
    address = '',
    date = new Date().toLocaleDateString(),
    recipientName = '',
    recipientCompany = '',
    recipientAddress = '',
    letterContent = '',
    signature = ''
  } = data || {};

  return (
    <div className="bg-white p-8 w-full max-w-[800px] mx-auto">
      {/* Sender Information */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{fullName}</h1>
        <div className="text-gray-600">
          {email && <div>{email}</div>}
          {phone && <div>{phone}</div>}
          {address && <div>{address}</div>}
        </div>
      </div>
      
      {/* Date */}
      <div className="mb-6 text-gray-600">
        {date}
      </div>
      
      {/* Recipient Information */}
      <div className="mb-8">
        {recipientName && <div className="font-medium">{recipientName}</div>}
        {recipientCompany && <div>{recipientCompany}</div>}
        {recipientAddress && <div>{recipientAddress}</div>}
      </div>
      
      {/* Greeting */}
      <div className="mb-6">
        <p>Dear {recipientName || 'Hiring Manager'},</p>
      </div>
      
      {/* Letter Content */}
      <div className="mb-8">
        {letterContent ? (
          <div dangerouslySetInnerHTML={{ __html: letterContent.replace(/\n/g, '<br />') }} />
        ) : (
          <p>I am writing to express my interest in [Position] at [Company]...</p>
        )}
      </div>
      
      {/* Closing */}
      <div className="mb-8">
        <p>Sincerely,</p>
        <div className="mt-8 font-bold">
          {signature || fullName}
        </div>
      </div>
    </div>
  );
};

export default ModernSimple;

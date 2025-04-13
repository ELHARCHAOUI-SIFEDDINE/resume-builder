import React from 'react';
import { useTranslation } from 'react-i18next';

const Creative = ({ data }) => {
  const { t } = useTranslation();
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
      {/* Stylish header */}
      <div className="mb-8 border-l-4 border-blue-500 pl-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{fullName}</h1>
        <div className="text-gray-600 flex flex-col">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {address && <span>{address}</span>}
        </div>
      </div>
      
      {/* Date with accent */}
      <div className="mb-6 text-blue-600 font-medium">
        {date}
      </div>
      
      {/* Recipient Information */}
      <div className="mb-8">
        {recipientName && <div className="font-medium">{recipientName}</div>}
        {recipientCompany && <div className="font-bold text-gray-700">{recipientCompany}</div>}
        {recipientAddress && <div className="text-gray-600">{recipientAddress}</div>}
      </div>
      
      {/* Greeting with accent */}
      <div className="mb-6 text-lg">
        <p>{t('coverLetters.greeting', 'Dear')} {recipientName || t('coverLetters.hiringManager', 'Hiring Manager')},</p>
      </div>
      
      {/* Letter Content */}
      <div className="mb-8 leading-relaxed">
        {letterContent ? (
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: letterContent.replace(/\n/g, '<br />') }} />
        ) : (
          <p className="text-gray-700">{t('coverLetters.defaultContent', 'I am writing to express my interest in [Position] at [Company]...')}</p>
        )}
      </div>
      
      {/* Letter close */}
      <div className="mb-8 text-lg">
        <p>{t('coverLetters.closing', 'Sincerely')},</p>
      </div>
      
      {/* Closing with styled signature */}
      <div className="mb-8">
        <div className="mt-10 font-bold border-b-2 border-blue-500 inline-block pb-1">
          {signature || fullName}
        </div>
      </div>
    </div>
  );
};

export default Creative;

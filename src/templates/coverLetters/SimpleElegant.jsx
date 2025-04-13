import React from 'react';
import { useTranslation } from 'react-i18next';

const SimpleElegant = ({ data }) => {
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
    <div className="bg-white p-10 w-full max-w-[800px] mx-auto">
      {/* Simple, elegant header with minimal styling */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-light text-gray-800 tracking-wide uppercase mb-1">{fullName}</h1>
        <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-x-4">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {address && <span>{address}</span>}
        </div>
      </div>
      
      {/* Date, right-aligned */}
      <div className="text-right mb-8 text-gray-600 text-sm">
        {date}
      </div>
      
      {/* Recipient information, left-aligned */}
      <div className="mb-8">
        {recipientName && <div className="font-medium">{recipientName}</div>}
        {recipientCompany && <div>{recipientCompany}</div>}
        {recipientAddress && <div className="text-gray-600">{recipientAddress}</div>}
      </div>
      
      {/* Greeting */}
      <div className="mb-8">
        <p>{t('coverLetters.greeting', 'Dear')} {recipientName || t('coverLetters.hiringManager', 'Hiring Manager')},</p>
      </div>
      
      {/* Letter content */}
      <div className="mb-10 leading-relaxed">
        {letterContent ? (
          <div dangerouslySetInnerHTML={{ __html: letterContent.replace(/\n/g, '<br />') }} />
        ) : (
          <p>{t('coverLetters.defaultContent', 'I am writing to express my interest in [Position] at [Company]...')}</p>
        )}
      </div>
      
      {/* Simple closing */}
      <div className="mb-2">
        <p>{t('coverLetters.closing', 'Sincerely')},</p>
      </div>
      
      {/* Signature with minimal styling */}
      <div className="mt-10">
        <div className="border-t border-gray-200 pt-2 inline-block">
          {signature || fullName}
        </div>
      </div>
    </div>
  );
};

export default SimpleElegant;

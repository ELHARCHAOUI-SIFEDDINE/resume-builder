import React from 'react';
import { useTranslation } from 'react-i18next';

const Modern = ({ data }) => {
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
      {/* Header with contact info */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-10 border-b border-gray-300 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{fullName}</h1>
        </div>
        <div className="text-gray-600 text-sm mt-2 sm:mt-0 text-left sm:text-right">
          {email && <div>{email}</div>}
          {phone && <div>{phone}</div>}
          {address && <div>{address}</div>}
        </div>
      </div>
      
      {/* Date */}
      <div className="mb-4 text-gray-600">
        {date}
      </div>
      
      {/* Recipient */}
      <div className="mb-6">
        {recipientName && <div className="font-medium">{recipientName}</div>}
        {recipientCompany && <div className="font-bold">{recipientCompany}</div>}
        {recipientAddress && <div className="text-gray-600">{recipientAddress}</div>}
      </div>
      
      {/* Greeting */}
      <div className="mb-6">
        <p>{t('coverLetters.greeting', 'Dear')} {recipientName || t('coverLetters.hiringManager', 'Hiring Manager')},</p>
      </div>
      
      {/* Content */}
      <div className="mb-8 text-gray-700 leading-relaxed">
        {letterContent ? (
          <div dangerouslySetInnerHTML={{ __html: letterContent.replace(/\n/g, '<br />') }} />
        ) : (
          <p>{t('coverLetters.defaultContent', 'I am writing to express my interest in [Position] at [Company]...')}</p>
        )}
      </div>
      
      {/* Closing */}
      <div className="mb-2">
        <p>{t('coverLetters.closing', 'Sincerely')},</p>
      </div>
      
      {/* Signature */}
      <div className="mt-8">
        <div className="font-semibold">
          {signature || fullName}
        </div>
      </div>
    </div>
  );
};

export default Modern;

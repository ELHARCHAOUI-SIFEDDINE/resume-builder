import React from 'react';
import { useTranslation } from 'react-i18next';

const Professional = ({ data }) => {
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
    <div className="bg-white p-8 w-full max-w-[800px] mx-auto font-serif">
      {/* Header with sender info */}
      <div className="text-center mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{fullName}</h1>
        <div className="text-gray-600 flex justify-center gap-4 flex-wrap">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {address && <span>{address}</span>}
        </div>
      </div>
      
      {/* Date */}
      <div className="mb-6 text-gray-600">
        {date}
      </div>
      
      {/* Recipient Information */}
      <div className="mb-8">
        {recipientName && <div className="font-medium">{recipientName}</div>}
        {recipientCompany && <div className="font-medium">{recipientCompany}</div>}
        {recipientAddress && <div>{recipientAddress}</div>}
      </div>
      
      {/* Greeting */}
      <div className="mb-6">
        <p>{t('coverLetters.greeting', 'Dear')} {recipientName || t('coverLetters.hiringManager', 'Hiring Manager')},</p>
      </div>
      
      {/* Letter Content */}
      <div className="mb-8 leading-relaxed">
        {letterContent ? (
          <div dangerouslySetInnerHTML={{ __html: letterContent.replace(/\n/g, '<br />') }} />
        ) : (
          <p>{t('coverLetters.defaultContent', 'I am writing to express my interest in [Position] at [Company]...')}</p>
        )}
      </div>
      
      {/* Closing */}
      <div className="mb-4">
        <p>{t('coverLetters.closing', 'Sincerely')},</p>
        <div className="mt-12 font-bold">
          {signature || fullName}
        </div>
      </div>
    </div>
  );
};

export default Professional;

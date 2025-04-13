import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsOpen(false);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('language.changeLanguage')}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiGlobe className="text-blue-500" />
        <span className="text-sm font-medium text-white">
          {currentLanguage === 'fr' ? 'FR' : 'EN'}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="p-2 min-w-[120px]">
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                currentLanguage === 'en'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('language.english')}
            </button>
            <button
              onClick={() => changeLanguage('fr')}
              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                currentLanguage === 'fr'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('language.french')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 
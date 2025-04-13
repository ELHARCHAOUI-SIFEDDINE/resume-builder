import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const TemplatePreview = ({ template }) => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleSelectTemplate = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/create-resume/${template.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative pb-[133%]">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{template.description}</p>
        <button
          onClick={handleSelectTemplate}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};

export default TemplatePreview; 
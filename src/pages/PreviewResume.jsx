import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PreviewResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    // TODO: Fetch resume data based on id
    // This is a placeholder
    setResume({
      id,
      title: 'Sample Resume',
      template: 'modern',
      sections: []
    });
  }, [id]);

  if (!resume) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100"
    >
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Preview: {resume.title}</h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate(`/edit-resume/${id}`)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {/* TODO: Implement download logic */}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          {/* Preview Container */}
          <div className="p-8">
            {/* This is a placeholder for the actual resume preview */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold">John Doe</h2>
                <p className="text-gray-600">Software Developer</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>john.doe@example.com | (555) 123-4567</p>
                  <p>San Francisco, CA</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Summary</h3>
                <p className="text-gray-700">
                  Experienced software developer with a passion for creating elegant solutions...
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Experience</h3>
                <p className="text-gray-500 italic">No experience added yet</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Education</h3>
                <p className="text-gray-500 italic">No education added yet</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Skills</h3>
                <p className="text-gray-500 italic">No skills added yet</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default PreviewResume; 
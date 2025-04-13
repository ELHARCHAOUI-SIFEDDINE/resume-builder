import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCpu, FiEdit, FiCheck, FiRefreshCw } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import aiService from '../services/ai.service';
import ReactMarkdown from 'react-markdown';
import templates from '../templates';

const AIAssistantPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `You are a professional resume assistant. Help users create compelling resume content. 
When asked to generate a complete resume, respond with valid JSON in a code block with this structure:
\`\`\`json
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedIn": "string",
    "position": "string",
    "github": "string",
    "website": "string"
  },
  "summary": "string",
  "experience": [
    {
      "company": "string",
      "position": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "current": boolean,
      "achievements": ["string", "string"]
    }
  ],
  "education": [
    {
      "school": "string",
      "degree": "string",
      "fieldOfStudy": "string",
      "startDate": "string",
      "endDate": "string",
      "gpa": "string"
    }
  ],
  "skills": ["string", "string"],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "date": "string",
      "technologies": ["string", "string"]
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string"
    }
  ]
}
\`\`\`

IMPORTANT: Always include ALL sections listed above, even if with minimal placeholder data. Each section is required for the resume to render properly.
Make achievements and skills arrays of strings. Format dates like "Jan 2022" or "2020 - Present".
Ensure the response is complete and valid JSON that can be parsed without errors.`
    },
    {
      role: 'assistant',
      content: "Hi! I'm your resume assistant. I can help you create professional resume content or generate a complete resume. Just tell me what you need help with."
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [activeTemplateId, setActiveTemplateId] = useState(1);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await aiService.processChat([...messages, userMessage]);
      
      setMessages(prev => [...prev, aiResponse]);

      // Check if the response contains resume content
      const resumeData = aiService.parseAIResponse(aiResponse.content);
      if (resumeData) {
        console.log('Resume data detected:', resumeData);
        setGeneratedResume(resumeData);
        toast.success('Resume data generated! Use the Edit button to continue.');
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to get response. Please try again.';
      toast.error(errorMessage);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I'm sorry, I encountered an error: ${errorMessage} Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveGeneratedResume = async () => {
    if (!generatedResume) {
      toast.error("No resume data has been generated yet!");
      return;
    }
    
    try {
      toast.loading('Creating your resume...');
      
      // Ensure all required sections are present with default values
      const completeResume = {
        personalInfo: {
          fullName: generatedResume.personalInfo?.fullName || 'Your Name',
          position: generatedResume.personalInfo?.position || 'Professional Title',
          email: generatedResume.personalInfo?.email || 'email@example.com',
          phone: generatedResume.personalInfo?.phone || '',
          location: generatedResume.personalInfo?.location || '',
          linkedIn: generatedResume.personalInfo?.linkedIn || '',
          github: generatedResume.personalInfo?.github || '',
          website: generatedResume.personalInfo?.website || '',
          photo: generatedResume.personalInfo?.photo || ''
        },
        experience: Array.isArray(generatedResume.experience) ? generatedResume.experience : [],
        education: Array.isArray(generatedResume.education) ? generatedResume.education : [],
        skills: Array.isArray(generatedResume.skills) ? generatedResume.skills : [],
        projects: Array.isArray(generatedResume.projects) ? generatedResume.projects : [],
        certifications: Array.isArray(generatedResume.certifications) ? generatedResume.certifications : [],
        summary: generatedResume.summary || ''
      };
      
      // Generate a unique ID for the resume
      const resumeId = Date.now().toString();
      
      // Create resume object
      const newResume = {
        id: resumeId,
        name: `${completeResume.personalInfo.fullName}'s Resume`,
        templateId: activeTemplateId || 1, // Default to first template if none selected
        data: completeResume,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id || 'guest',
        versions: [
          {
            versionId: Date.now() + '-1',
            date: new Date().toISOString(),
            data: completeResume
          }
        ]
      };
      
      console.log('Saving resume with data:', newResume);
      
      // Save to localStorage for immediate access
      try {
        const savedResumes = localStorage.getItem('resumes');
        const resumes = savedResumes ? JSON.parse(savedResumes) : [];
        resumes.push(newResume);
        localStorage.setItem('resumes', JSON.stringify(resumes));
        localStorage.setItem(`resume_${resumeId}`, JSON.stringify(newResume));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      
      // Save to backend via JSON server
      try {
        const response = await fetch('http://localhost:3001/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newResume)
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        // Get the saved resume from server (with any server-side modifications)
        const savedResume = await response.json();
        console.log('Resume saved to server:', savedResume);
      } catch (serverError) {
        console.warn('Could not save to server, but saved locally:', serverError);
      }
      
      toast.dismiss();
      toast.success('Resume created! Redirecting to dashboard...');
      
      // Redirect to dashboard after saving
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.dismiss();
      toast.error('Failed to create resume: ' + (error.message || 'Unknown error'));
    }
  };

  const formatMessageContent = (content) => {
    // Check for JSON content
    let hasResumeData = false;
    
    if ((content.includes('```json') || content.includes('```')) && 
        (content.includes('"personalInfo"') || content.includes('"experience"'))) {
      hasResumeData = true;
    }
    
    // Also check for unformatted JSON
    if (content.includes('{') && 
        (content.includes('"personalInfo"') || content.includes('"experience"'))) {
      hasResumeData = true;
    }
    
    // If resume data is found, try to extract it
    if (hasResumeData && !generatedResume) {
      try {
        const extractedData = aiService.parseAIResponse(content);
        if (extractedData && extractedData.personalInfo) {
          console.log('Resume data extracted during formatting:', extractedData);
          setGeneratedResume(extractedData);
          toast.success('Resume data detected! Use the Edit button to continue.');
        }
      } catch (error) {
        console.error('Error extracting resume during formatting:', error);
      }
    }
    
    return content;
  };

  const suggestionPrompts = [
    "Help me write a professional summary for a software developer",
    "Generate bullet points for my experience as a marketing manager",
    "What skills should I include for a data analyst position?",
    "Create a complete resume for a UX designer",
    "How can I improve my resume to pass ATS systems?"
  ];
  
  const templateOptions = templates.map(template => (
    { id: template.id, name: template.name }
  ));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto rounded-lg bg-white dark:bg-gray-800 shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Simple header with title */}
        <div className="bg-blue-600 dark:bg-blue-800 p-4 text-white flex items-center justify-between">
          <div className="flex items-center">
            <FiCpu className="mr-2 h-5 w-5" />
            <h1 className="font-medium">Resume AI Assistant</h1>
          </div>
          <button
            onClick={() => setMessages([
              messages[0],
              {
                role: 'assistant',
                content: "Hi! I'm your resume assistant. I can help you create professional resume content or generate a complete resume. Just tell me what you need help with."
              }
            ])}
            className="text-white/80 hover:text-white p-1 rounded"
            title="Reset conversation"
          >
            <FiRefreshCw className="h-4 w-4" />
          </button>
        </div>
        
        {/* Chat container */}
        <div className="flex flex-col h-[75vh]">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Quick suggestions */}
            {messages.length <= 2 && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestionPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInputMessage(prompt)}
                      className="text-xs px-3 py-1.5 bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Messages */}
            {messages.slice(1).map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-700 text-gray-800 dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}>
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="prose-sm dark:prose-invert" {...props} />,
                      ul: ({node, ...props}) => <ul className="prose-sm dark:prose-invert pl-5 mt-2 mb-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="prose-sm dark:prose-invert pl-5 mt-2 mb-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-lg font-bold mt-3 mb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-md font-bold mt-3 mb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-bold mt-2 mb-1" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
                      code: ({node, inline, ...props}) => 
                        inline 
                          ? <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-sm" {...props} />
                          : <code className="block bg-gray-200 dark:bg-gray-800 p-2 rounded-md text-sm my-2 overflow-x-auto" {...props} />
                    }}
                  >
                    {formatMessageContent(message.content)}
                  </ReactMarkdown>
                  
                  {/* For assistant messages with resume data, show edit button */}
                  {message.role === 'assistant' && 
                   aiService.parseAIResponse(message.content) && (
                    <div className="mt-3 text-right">
                      <button
                        onClick={saveGeneratedResume}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                      >
                        <FiEdit className="mr-1.5 h-3.5 w-3.5" />
                        Edit Resume
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Template selection (only shown when resume is generated) */}
          {generatedResume && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 border-t border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiCheck className="mr-2 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Resume generated!</span>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={activeTemplateId}
                    onChange={(e) => setActiveTemplateId(Number(e.target.value))}
                    className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    {templateOptions.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={saveGeneratedResume}
                    className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                  >
                    <FiEdit className="mr-1.5 h-3.5 w-3.5" />
                    Edit Resume
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about resume creation..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
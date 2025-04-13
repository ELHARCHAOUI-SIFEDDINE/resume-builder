import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiArrowRight, FiCheck, FiEdit, FiDownload, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import OpenAI from 'openai';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Get API key from environment variables
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

// Initialize OpenAI client with OpenRouter configuration
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://resume-builder.app',
    'X-Title': 'Resume Builder App',
  },
});

// Questions for the AI interview - these will be replaced with translations
const getInterviewQuestions = (t) => [
  {
    id: 'personal',
    title: t('resumeSections.personalInfo'),
    questions: [
      { id: 'name', text: t('questions.personalName') },
      { id: 'email', text: t('questions.personalEmail') },
      { id: 'phone', text: t('questions.personalPhone') },
      { id: 'location', text: t('questions.personalLocation') },
      { id: 'linkedin', text: t('questions.personalLinkedin') }
    ]
  },
  {
    id: 'career',
    title: t('header.createResume'),
    questions: [
      { id: 'position', text: t('questions.careerPosition') },
      { id: 'industry', text: t('questions.careerIndustry') },
      { id: 'years_experience', text: t('questions.careerExperience') }
    ]
  },
  {
    id: 'experience',
    title: t('resumeSections.experience'),
    questions: [
      { id: 'recent_job', text: t('questions.recentJob') },
      { id: 'achievements', text: t('questions.achievements') },
      { id: 'previous_job', text: t('questions.previousJob') },
      { id: 'previous_achievements', text: t('questions.previousAchievements') }
    ]
  },
  {
    id: 'education',
    title: t('resumeSections.education'),
    questions: [
      { id: 'highest_education', text: t('questions.highestEducation') },
      { id: 'institution', text: t('questions.institution') },
      { id: 'graduation_year', text: t('questions.graduationYear') },
      { id: 'field_of_study', text: t('questions.fieldOfStudy') }
    ]
  },
  {
    id: 'skills',
    title: t('resumeSections.skills'),
    questions: [
      { id: 'technical_skills', text: t('questions.technicalSkills') },
      { id: 'soft_skills', text: t('questions.softSkills') },
      { id: 'certifications', text: t('questions.certifications') }
    ]
  },
  {
    id: 'summary',
    title: t('resumeSections.summary'),
    questions: [
      { id: 'career_goals', text: t('questions.careerGoals') },
      { id: 'strengths', text: t('questions.strengths') },
      { id: 'unique_value', text: t('questions.uniqueValue') }
    ]
  }
];

const AIResumeInterview = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  
  const interviewQuestions = getInterviewQuestions(t);
  const currentSection = interviewQuestions[currentSectionIndex];
  const currentQuestionData = currentSection?.questions[currentQuestionIndex];
  const answerRef = useRef(null);

  // Focus on the answer input when the question changes
  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.focus();
    }
  }, [currentSectionIndex, currentQuestionIndex]);

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (!currentAnswer.trim()) {
      toast.error(t('aiInterview.pleaseProvide'));
      return;
    }

    // Save the current answer
    const questionId = `${currentSection.id}_${currentQuestionData.id}`;
    setAnswers(prev => ({
      ...prev,
      [questionId]: currentAnswer
    }));
    
    // Clear current answer
    setCurrentAnswer('');
    
    // Move to the next question or section
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < interviewQuestions.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Interview is complete
      setIsComplete(true);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleNextQuestion();
    }
  };

  // Generate resume from collected answers
  const generateResume = async () => {
    setIsGenerating(true);
    toast.loading(t('aiInterview.generating'), { id: 'generating' });
    
    try {
      // Prepare the message with all collected information
      const userInfo = {
        personal: {
          name: answers['personal_name'] || '',
          email: answers['personal_email'] || '',
          phone: answers['personal_phone'] || '',
          location: answers['personal_location'] || '',
          linkedin: answers['personal_linkedin'] || '',
        },
        career: {
          position: answers['career_position'] || '',
          industry: answers['career_industry'] || '',
          yearsExperience: answers['career_years_experience'] || '',
        },
        experience: {
          recent: {
            description: answers['experience_recent_job'] || '',
            achievements: answers['experience_achievements'] || '',
          },
          previous: {
            description: answers['experience_previous_job'] || '',
            achievements: answers['experience_previous_achievements'] || '',
          }
        },
        education: {
          level: answers['education_highest_education'] || '',
          institution: answers['education_institution'] || '',
          graduationYear: answers['education_graduation_year'] || '',
          fieldOfStudy: answers['education_field_of_study'] || '',
        },
        skills: {
          technical: answers['skills_technical_skills'] || '',
          soft: answers['skills_soft_skills'] || '',
          certifications: answers['skills_certifications'] || '',
        },
        summary: {
          goals: answers['summary_career_goals'] || '',
          strengths: answers['summary_strengths'] || '',
          uniqueValue: answers['summary_unique_value'] || '',
        }
      };
      
      // Construct the prompt for the AI based on the current language
      const currentLanguage = i18n.language;
      
      let systemPrompt = '';
      let userPrompt = '';
      
      if (currentLanguage === 'fr') {
        systemPrompt = `Vous êtes un rédacteur professionnel de CV. Créez un CV complet au format JSON basé sur les informations fournies.
        Formatez votre réponse comme un objet JSON strict avec cette structure:
        {
          "personalInfo": {
            "fullName": string,
            "email": string,
            "phone": string,
            "location": string,
            "linkedIn": string,
            "position": string
          },
          "summary": string,
          "experience": [
            {
              "company": string,
              "position": string,
              "location": string,
              "startDate": string,
              "endDate": string,
              "achievements": string[]
            }
          ],
          "education": [
            {
              "school": string,
              "degree": string,
              "fieldOfStudy": string,
              "startDate": string,
              "endDate": string,
              "achievements": string[]
            }
          ],
          "skills": string[]
        }
        La réponse doit être un JSON valide et analysable sans texte supplémentaire avant ou après. Utilisez exactement la structure indiquée.`;
        
        userPrompt = `Créez un CV professionnel avec ces détails:
        
        INFORMATIONS PERSONNELLES:
        Nom: ${userInfo.personal.name}
        Email: ${userInfo.personal.email}
        Téléphone: ${userInfo.personal.phone}
        Localisation: ${userInfo.personal.location}
        LinkedIn: ${userInfo.personal.linkedin}
        
        CARRIÈRE:
        Poste Ciblé: ${userInfo.career.position}
        Industrie: ${userInfo.career.industry}
        Années d'Expérience: ${userInfo.career.yearsExperience}
        
        EXPÉRIENCE:
        Poste Récent: ${userInfo.experience.recent.description}
        Réalisations: ${userInfo.experience.recent.achievements}
        
        Poste Précédent: ${userInfo.experience.previous.description}
        Réalisations Précédentes: ${userInfo.experience.previous.achievements}
        
        FORMATION:
        Niveau d'Études: ${userInfo.education.level}
        Institution: ${userInfo.education.institution}
        Année d'Obtention: ${userInfo.education.graduationYear}
        Domaine d'Étude: ${userInfo.education.fieldOfStudy}
        
        COMPÉTENCES:
        Compétences Techniques: ${userInfo.skills.technical}
        Compétences Interpersonnelles: ${userInfo.skills.soft}
        Certifications: ${userInfo.skills.certifications}
        
        RÉSUMÉ PROFESSIONNEL:
        Objectifs de Carrière: ${userInfo.summary.goals}
        Forces Professionnelles: ${userInfo.summary.strengths}
        Valeur Unique: ${userInfo.summary.uniqueValue}
        
        Analysez ces informations pour créer un CV professionnel. Pour la section expérience, extrayez les noms d'entreprises, les postes, les dates, et formatez les réalisations sous forme de puces. Créez un paragraphe de résumé convaincant. Renvoyez UNIQUEMENT un format JSON valide qui correspond exactement à la structure requise.`;
      } else {
        systemPrompt = `You are a professional resume writer. Create a complete resume in JSON format based on the provided information.
        Format your response as a strict JSON object with this structure:
        {
          "personalInfo": {
            "fullName": string,
            "email": string,
            "phone": string,
            "location": string,
            "linkedIn": string,
            "position": string
          },
          "summary": string,
          "experience": [
            {
              "company": string,
              "position": string,
              "location": string,
              "startDate": string,
              "endDate": string,
              "achievements": string[]
            }
          ],
          "education": [
            {
              "school": string,
              "degree": string,
              "fieldOfStudy": string,
              "startDate": string,
              "endDate": string,
              "achievements": string[]
            }
          ],
          "skills": string[]
        }
        The response must be parseable valid JSON with no extra text before or after. Use the structure exactly as shown.`;
        
        userPrompt = `Create a professional resume with these details:
        
        PERSONAL INFORMATION:
        Name: ${userInfo.personal.name}
        Email: ${userInfo.personal.email}
        Phone: ${userInfo.personal.phone}
        Location: ${userInfo.personal.location}
        LinkedIn: ${userInfo.personal.linkedin}
        
        CAREER:
        Target Position: ${userInfo.career.position}
        Industry: ${userInfo.career.industry}
        Years of Experience: ${userInfo.career.yearsExperience}
        
        EXPERIENCE:
        Recent Position: ${userInfo.experience.recent.description}
        Achievements: ${userInfo.experience.recent.achievements}
        
        Previous Position: ${userInfo.experience.previous.description}
        Previous Achievements: ${userInfo.experience.previous.achievements}
        
        EDUCATION:
        Highest Education: ${userInfo.education.level}
        Institution: ${userInfo.education.institution}
        Graduation Year: ${userInfo.education.graduationYear}
        Field of Study: ${userInfo.education.fieldOfStudy}
        
        SKILLS:
        Technical Skills: ${userInfo.skills.technical}
        Soft Skills: ${userInfo.skills.soft}
        Certifications: ${userInfo.skills.certifications}
        
        PROFESSIONAL SUMMARY INFO:
        Career Goals: ${userInfo.summary.goals}
        Professional Strengths: ${userInfo.summary.strengths}
        Unique Value: ${userInfo.summary.uniqueValue}
        
        Parse this information to create a professional resume. For the experience section, extract company names, positions, dates, and format achievements as bullet points. Create a compelling summary paragraph. Return ONLY valid JSON format that matches the required structure exactly.`;
      }

      // Make the API call
      console.log('Calling OpenAI API to generate resume...');
      
      const response = await openai.chat.completions.create({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      });
      
      console.log('Received response from OpenAI API:', response);
      
      const content = response.choices[0].message.content;
      console.log('Raw response content:', content);
      
      // Parse the JSON response
      let resumeData;
      try {
        resumeData = JSON.parse(content);
        console.log('Successfully parsed resume data:', resumeData);
        
        // Validate the resume data has the required structure
        if (!resumeData.personalInfo || !resumeData.experience || !resumeData.education || !resumeData.skills) {
          throw new Error('The generated resume is missing required sections');
        }
        
        // Store the generated resume
        setGeneratedResume(resumeData);
        
        // Save to session storage for the CreateResume page to use
        sessionStorage.setItem('aiGeneratedResume', JSON.stringify(resumeData));
        
        toast.success(t('aiInterview.success'), { id: 'generating' });
        
        // Navigate to the create resume page with template 1
        navigate('/create-resume/1');
        
      } catch (parseError) {
        console.error('Error parsing response as JSON:', parseError);
        console.error('Response content:', content);
        throw new Error(`Failed to parse AI response: ${parseError.message}`);
      }
      
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error(t('aiInterview.error') + ': ' + error.message, { id: 'generating' });
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset the interview
  const resetInterview = () => {
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer('');
    setIsComplete(false);
    setGeneratedResume(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiCpu className="w-8 h-8" />
            <h1 className="text-2xl font-bold">{t('aiInterview.title')}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="mt-2 opacity-90">
          {t('aiInterview.subtitle')}
        </p>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ 
              width: `${isComplete ? 100 : (currentSectionIndex / interviewQuestions.length) * 100}%` 
            }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
          {interviewQuestions.map((section, index) => (
            <div 
              key={section.id}
              className={`${
                index <= currentSectionIndex 
                  ? 'text-blue-600 dark:text-blue-400 font-medium' 
                  : ''
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="flex mt-1 mb-6">
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {isComplete 
              ? t('aiInterview.complete')
              : `${t('aiInterview.step')} ${currentSectionIndex + 1}: ${currentSection.title}`
            }
          </div>
          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {isComplete 
              ? '' 
              : `${t('aiInterview.question')} ${currentQuestionIndex + 1} ${t('aiInterview.of')} ${currentSection.questions.length}`
            }
          </div>
        </div>
      </div>

      {/* Interview content */}
      <div className="p-6">
        {!isComplete ? (
          /* Question & Answer section */
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                {currentQuestionData.text}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('aiInterview.placeholderAnswer')}
              </p>
            </div>
            
            <div>
              <textarea
                ref={answerRef}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[120px]"
                placeholder={t('aiInterview.placeholderAnswer')}
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {t('aiInterview.keyboardShortcut')}
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={!currentAnswer.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentSectionIndex === interviewQuestions.length - 1 && 
                 currentQuestionIndex === currentSection.questions.length - 1 
                  ? t('aiInterview.finishInterview')
                  : t('aiInterview.nextQuestion')
                }
                <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Resume generation section */
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center text-green-800 dark:text-green-400">
                <FiCheck className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold">{t('aiInterview.interviewComplete')}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {t('aiInterview.thankYou')}
              </p>
            </div>
            
            {generatedResume ? (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">{t('aiInterview.resumeReady')}</h3>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {t('aiInterview.resumeGenerated')}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetInterview}
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <FiRefreshCw className="mr-2" /> {t('aiInterview.startOver')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCpu className="mr-2" /> 
                  {isGenerating ? t('aiInterview.generating') : t('aiInterview.generateResume')}
                </button>
                
                <button
                  onClick={resetInterview}
                  disabled={isGenerating}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiRefreshCw className="mr-2" /> {t('aiInterview.startOver')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review answers panel */}
      {Object.keys(answers).length > 0 && !isComplete && (
        <div className="px-6 pb-6">
          <div className="mt-8 border-t dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('aiInterview.answersTitle')}
            </h4>
            <div className="max-h-[200px] overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-sm">
              {Object.entries(answers).map(([key, value]) => {
                const [sectionId, questionId] = key.split('_');
                const section = interviewQuestions.find(s => s.id === sectionId);
                const question = section?.questions.find(q => q.id === questionId);
                
                return (
                  <div key={key} className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="font-medium text-gray-700 dark:text-gray-300">{question?.text}</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIResumeInterview; 
import OpenAI from 'openai';
import i18next from 'i18next';

// API configuration - using OpenRouter API key from environment variables
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

/**
 * Generic OpenRouter API call with error handling and retries
 * @param {Array} messages - Array of message objects
 * @param {Object} options - Additional options like temperature, max_tokens
 * @returns {Promise<object>} AI response
 */
const callOpenAI = async (messages, options = {}) => {
  const maxRetries = 2;
  let retryCount = 0;
  let lastError = null;

  while (retryCount <= maxRetries) {
    try {
      // Set default model to OpenAI's GPT-3.5
      const model = options.model || "openai/gpt-3.5-turbo";
      
      const response = await openai.chat.completions.create({
        model,
        messages,
        temperature: options.temperature || 0.5,
        max_tokens: options.max_tokens || 1000,
        ...(options.response_format && { response_format: options.response_format })
      });
      
      return response.choices[0].message;
    } catch (error) {
      lastError = error;
      
      // Check if it's a rate limit error or server error
      if (error.status === 429 || error.status >= 500) {
        // Exponential backoff: wait longer with each retry
        const waitTime = 1000 * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        retryCount++;
        continue;
      }
      
      // For other errors, don't retry
      break;
    }
  }
  
  // If we got here, all retries failed or we hit a non-retryable error
  console.error('Error calling OpenRouter API:', lastError);
  
  if (lastError) {
    const status = lastError.status;
    const message = lastError.message;
    
    if (status === 401) {
      throw new Error('API key is invalid. Please check your OpenRouter API key.');
    } else if (status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a few moments.');
    } else if (status >= 500) {
      throw new Error('OpenRouter service is currently unavailable. Please try again later.');
    } else {
      throw new Error(`API error: ${message || 'Unknown error'}`);
    }
  } else {
    throw new Error('Network error. Please check your internet connection.');
  }
};

/**
 * Generate content for a specific resume section
 * @param {object} userInfo - User information like job title, industry, experience
 * @param {string} section - The resume section (e.g., 'summary', 'experience', 'skills')
 * @returns {Promise<string>} Generated content
 */
export const generateContent = async (userInfo, section) => {
  try {
    const currentLanguage = i18next.language || 'en';
    
    // Determine the system prompt language
    const systemPromptContent = currentLanguage === 'fr' 
      ? `Vous êtes un rédacteur professionnel de CV spécialisé dans la création de sections ${section} percutantes pour les chercheurs d'emploi. 
         Créez une section ${section} professionnelle pour un CV basée sur les informations fournies.
         Soyez concis, percutant, et concentrez-vous sur les réalisations et compétences pertinentes pour le poste.`
      : `You are a professional resume writer with expertise in creating compelling ${section} sections for job seekers. 
         Create a professional ${section} section for a resume based on the provided information. 
         Be concise, impactful, and focus on achievements and skills relevant to the role.`;
    
    let userPromptContent;
    if (currentLanguage === 'fr') {
      userPromptContent = `Créez une section ${section} pour mon CV avec ces détails:
      - Poste: ${userInfo.jobTitle}
      - Industrie: ${userInfo.industry}
      - Années d'expérience: ${userInfo.yearsExperience || 'Non spécifié'}`;
      
      if (userInfo.keyStrengths) {
        userPromptContent += `\n- Compétences clés: ${userInfo.keyStrengths}`;
      }
      
      if (section === 'experience' && userInfo.companyName) {
        userPromptContent += `\n- Entreprise: ${userInfo.companyName}`;
        if (userInfo.duration) {
          userPromptContent += `\n- Durée: ${userInfo.duration}`;
        }
      }
    } else {
      userPromptContent = `Create a ${section} section for my resume with these details:
      - Job Title: ${userInfo.jobTitle}
      - Industry: ${userInfo.industry}
      - Years of Experience: ${userInfo.yearsExperience || 'Not specified'}`;
      
      if (userInfo.keyStrengths) {
        userPromptContent += `\n- Key Strengths: ${userInfo.keyStrengths}`;
      }
      
      if (section === 'experience' && userInfo.companyName) {
        userPromptContent += `\n- Company: ${userInfo.companyName}`;
        if (userInfo.duration) {
          userPromptContent += `\n- Duration: ${userInfo.duration}`;
        }
      }
    }
    
    const messages = [
      { role: "system", content: systemPromptContent },
      { role: "user", content: userPromptContent }
    ];

    const response = await callOpenAI(messages, {
      model: "openai/gpt-3.5-turbo",
      temperature: 0.6,
      max_tokens: 500
    });
    
    return response.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

/**
 * Enhance existing content with AI suggestions
 * @param {string} currentContent - The current content to enhance
 * @param {string} section - The resume section
 * @returns {Promise<string>} Enhanced content
 */
export const enhanceContent = async (currentContent, section) => {
  try {
    const currentLanguage = i18next.language || 'en';
    
    // Determine the system prompt language
    const systemPromptContent = currentLanguage === 'fr' 
      ? `Vous êtes un rédacteur professionnel de CV spécialisé dans la création de sections ${section} percutantes pour les chercheurs d'emploi.
         Améliorez le contenu ${section} fourni pour le rendre plus percutant, professionnel et adapté aux systèmes ATS.
         Concentrez-vous sur les réalisations spécifiques, les résultats quantifiables et les compétences pertinentes.
         Conservez les mêmes informations générales mais rendez-les plus convaincantes.`
      : `You are a professional resume writer with expertise in creating compelling ${section} sections for job seekers.
         Enhance the provided ${section} content to make it more impactful, professional, and ATS-friendly.
         Focus on specific achievements, quantifiable results, and relevant skills.
         Maintain the same general information but make it more compelling.`;
    
    let userPromptContent;
    if (currentLanguage === 'fr') {
      userPromptContent = `Veuillez améliorer ce contenu de la section ${section} pour mon CV:
      
      ${currentContent}`;
    } else {
      userPromptContent = `Please enhance this ${section} content for my resume:
      
      ${currentContent}`;
    }
    
    const messages = [
      { role: "system", content: systemPromptContent },
      { role: "user", content: userPromptContent }
    ];

    const response = await callOpenAI(messages, {
      model: "openai/gpt-3.5-turbo",
      temperature: 0.6,
      max_tokens: 500
    });
    
    return response.content;
  } catch (error) {
    console.error('Error enhancing content:', error);
    throw error;
  }
};

/**
 * Generate a complete resume based on minimal user input
 * @param {object} userInfo - Basic user information
 * @returns {Promise<object>} Complete resume data
 */
export const generateFullResume = async (userInfo) => {
  try {
    const currentLanguage = i18next.language || 'en';
    
    // Create a more detailed system prompt to generate better resumes
    const systemPrompt = currentLanguage === 'fr' 
      ? `Vous êtes un expert en rédaction de CV professionnel. Vous allez créer un CV complet et détaillé basé sur les informations fournies par l'utilisateur.
         Votre objectif est de créer un CV optimisé pour les systèmes ATS (Application Tracking Systems) tout en étant attrayant pour les recruteurs.
         Incluez des réalisations quantifiables et des compétences pertinentes. Utilisez un langage professionnel et concis.`
      : `You are an expert professional resume writer. You will create a complete, detailed resume based on the user's information.
         Your goal is to craft a resume optimized for ATS (Applicant Tracking Systems) while being appealing to human recruiters.
         Include quantifiable achievements and relevant skills. Use professional, concise language.
         Focus on creating achievement-oriented bullet points that demonstrate impact, not just job duties.`;
    
    // Create a more detailed user prompt to get better information
    let userPrompt;
    if (currentLanguage === 'fr') {
      userPrompt = `Veuillez créer un CV complet avec les sections suivantes: informations personnelles, résumé professionnel, expérience, formation, compétences, projets et certifications.
      
      Voici mes informations:
      - Nom: ${userInfo.name || 'Non spécifié'}
      - Titre professionnel: ${userInfo.jobTitle || 'Non spécifié'}
      - Industrie: ${userInfo.industry || 'Non spécifié'}
      - Années d'expérience: ${userInfo.yearsExperience || 'Non spécifié'}
      - Niveau d'éducation: ${userInfo.education || 'Non spécifié'}
      - Compétences clés: ${userInfo.skills || 'Non spécifié'}
      - Informations supplémentaires: ${userInfo.additionalInfo || 'Non spécifié'}
      
      Formatez votre réponse sous forme d'objet JSON valide avec la structure suivante:
      
      {
        "personalInfo": { ... },
        "summary": "...",
        "experience": [ ... ],
        "education": [ ... ],
        "skills": [ ... ],
        "projects": [ ... ],
        "certifications": [ ... ]
      }`;
    } else {
      userPrompt = `Please create a complete resume with the following sections: personal information, professional summary, experience, education, skills, projects, and certifications.
      
      Here's my information:
      - Name: ${userInfo.name || 'Not specified'}
      - Job Title: ${userInfo.jobTitle || 'Not specified'}
      - Industry: ${userInfo.industry || 'Not specified'}
      - Years of Experience: ${userInfo.yearsExperience || 'Not specified'}
      - Education Level: ${userInfo.education || 'Not specified'}
      - Key Skills: ${userInfo.skills || 'Not specified'}
      - Additional Information: ${userInfo.additionalInfo || 'Not specified'}
      
      Format your response as a valid JSON object with the following structure:
      
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
      
      Ensure the JSON is valid and can be parsed. Include ALL sections even if with minimal data. Make achievements and skills arrays of strings.`;
    }
    
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    // Explicitly request JSON formatting from the model
    const response = await callOpenAI(messages, {
      model: "openai/gpt-4o", // Use a more capable model for better resume generation
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: "json_object" }
    });
    
    try {
      // Try to parse the JSON response
      let resumeData;
      
      // First, check if the response is already in JSON format
      if (typeof response.content === 'object') {
        resumeData = response.content;
      } else {
        // If it's a string, try to extract and parse the JSON
        // This handles cases where the API doesn't return proper JSON format
        resumeData = parseAIResponse(response.content);
      }
      
      if (!resumeData) {
        throw new Error('Could not parse resume data from response');
      }
      
      // Ensure all required sections are present and properly formatted
      return validateAndCompleteResumeData(resumeData, userInfo);
      
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to generate resume: Invalid response format');
    }
  } catch (error) {
    console.error('Error generating full resume:', error);
    throw error;
  }
};

/**
 * Validates and ensures all required resume sections are present
 * @param {object} resumeData - The resume data from AI
 * @param {object} userInfo - Original user info to fall back on
 * @returns {object} - Complete and validated resume data
 */
const validateAndCompleteResumeData = (resumeData, userInfo) => {
  // Create a template for the complete resume structure
  const complete = {
    personalInfo: {
      fullName: resumeData.personalInfo?.fullName || userInfo.name || 'Your Name',
      email: resumeData.personalInfo?.email || 'email@example.com',
      phone: resumeData.personalInfo?.phone || '',
      location: resumeData.personalInfo?.location || '',
      linkedIn: resumeData.personalInfo?.linkedIn || '',
      position: resumeData.personalInfo?.position || userInfo.jobTitle || 'Professional Title',
      github: resumeData.personalInfo?.github || '',
      website: resumeData.personalInfo?.website || ''
    },
    summary: resumeData.summary || `Professional with ${userInfo.yearsExperience || 'several'} years of experience in ${userInfo.industry || 'the industry'}.`,
    experience: Array.isArray(resumeData.experience) && resumeData.experience.length > 0 
      ? resumeData.experience 
      : [{
          company: 'Company Name',
          position: userInfo.jobTitle || 'Position Title',
          location: 'Location',
          startDate: 'Jan 2020',
          endDate: 'Present',
          current: true,
          achievements: ['Accomplishment 1', 'Accomplishment 2']
        }],
    education: Array.isArray(resumeData.education) && resumeData.education.length > 0
      ? resumeData.education
      : [{
          school: 'University Name',
          degree: 'Degree Type',
          fieldOfStudy: 'Field of Study',
          startDate: '2016',
          endDate: '2020',
          gpa: ''
        }],
    skills: Array.isArray(resumeData.skills) && resumeData.skills.length > 0
      ? resumeData.skills
      : (userInfo.skills ? userInfo.skills.split(',').map(s => s.trim()) : ['Skill 1', 'Skill 2', 'Skill 3']),
    projects: Array.isArray(resumeData.projects) ? resumeData.projects : [],
    certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : []
  };
  
  // Ensure the achievements field in experience is always an array of strings
  complete.experience = complete.experience.map(exp => ({
    ...exp,
    achievements: Array.isArray(exp.achievements) ? exp.achievements : 
      (typeof exp.achievements === 'string' ? [exp.achievements] : ['Accomplishment'])
  }));
  
  // Ensure that project technologies are always an array
  if (complete.projects.length > 0) {
    complete.projects = complete.projects.map(proj => ({
      ...proj,
      technologies: Array.isArray(proj.technologies) ? proj.technologies : 
        (typeof proj.technologies === 'string' ? [proj.technologies] : [])
    }));
  }
  
  return complete;
};

/**
 * Process a chat conversation with the AI resume assistant
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<object>} AI response message
 */
export const processChat = async (messages) => {
  try {
    const response = await callOpenAI(messages, {
      model: "openai/gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000
    });
    
    return response;
  } catch (error) {
    console.error('Error processing chat:', error);
    throw error;
  }
};

/**
 * Extract resume data from AI response
 * @param {string} aiResponse - The AI response content
 * @returns {Object|null} Parsed resume data or null if not found
 */
export const parseAIResponse = (aiResponse) => {
  try {
    console.log('Parsing AI response:', aiResponse);
    
    // Enhanced regex pattern to better detect JSON structures
    const jsonPattern = /```json([\s\S]*?)```|{[\s\S]*"personalInfo"[\s\S]*}(?!\w)/;
    let match = aiResponse.match(jsonPattern);
    
    if (!match || !match[0]) {
      console.log('No JSON pattern found in AI response');
      // Try another approach - find anything that looks like a JSON object
      const fallbackPattern = /{[\s\S]*}(?!\w)/;
      match = aiResponse.match(fallbackPattern);
      
      if (!match || !match[0]) {
        console.error('Failed to extract any JSON data from AI response');
        return null;
      }
    }
    
    let jsonString = match[1] || match[0];
    
    // Clean up the extracted JSON string
    jsonString = jsonString.trim();
    
    // Remove markdown code block syntax if present
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/```json|```/g, '').trim();
    }
    
    // Ensure we have a valid JSON string
    if (!jsonString.startsWith('{')) {
      jsonString = '{' + jsonString;
    }
    
    if (!jsonString.endsWith('}')) {
      jsonString = jsonString + '}';
    }
    
    console.log('Extracted JSON string:', jsonString);
    
    // Parse the JSON string into an object
    const resumeData = JSON.parse(jsonString);
    console.log('Parsed resume data:', resumeData);
    
    // Ensure the resume data has the expected structure
    const validatedData = {
      personalInfo: {
        fullName: resumeData.personalInfo?.fullName || '',
        position: resumeData.personalInfo?.position || '',
        email: resumeData.personalInfo?.email || '',
        phone: resumeData.personalInfo?.phone || '',
        location: resumeData.personalInfo?.location || '',
        linkedIn: resumeData.personalInfo?.linkedIn || '',
        github: resumeData.personalInfo?.github || '',
        website: resumeData.personalInfo?.website || '',
        photo: resumeData.personalInfo?.photo || ''
      },
      summary: resumeData.summary || '',
      experience: Array.isArray(resumeData.experience) 
        ? resumeData.experience.map(exp => ({
            company: exp.company || '',
            position: exp.position || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            current: exp.current || false,
            location: exp.location || '',
            achievements: Array.isArray(exp.achievements) ? exp.achievements : []
          }))
        : [],
      education: Array.isArray(resumeData.education)
        ? resumeData.education.map(edu => ({
            school: edu.school || '',
            degree: edu.degree || '',
            fieldOfStudy: edu.fieldOfStudy || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            gpa: edu.gpa || ''
          }))
        : [],
      skills: Array.isArray(resumeData.skills) 
        ? resumeData.skills 
        : typeof resumeData.skills === 'string' 
          ? resumeData.skills.split(',').map(skill => skill.trim())
          : [],
      projects: Array.isArray(resumeData.projects)
        ? resumeData.projects.map(proj => ({
            title: proj.title || '',
            description: proj.description || '',
            technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
            date: proj.date || ''
          }))
        : [],
      certifications: Array.isArray(resumeData.certifications)
        ? resumeData.certifications.map(cert => ({
            name: cert.name || '',
            issuer: cert.issuer || '',
            date: cert.date || ''
          }))
        : []
    };
    
    console.log('Validated resume data structure:', validatedData);
    return validatedData;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    console.log('Original AI response:', aiResponse);
    return null;
  }
};

const aiService = {
  generateContent,
  enhanceContent,
  generateFullResume,
  processChat,
  parseAIResponse
};

export default aiService; 
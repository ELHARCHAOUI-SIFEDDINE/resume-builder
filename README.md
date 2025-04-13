# Multilingual Resume & Cover Letter Builder

A modern, fully-featured resume and cover letter builder application with AI assistance, multilingual support (English and French), and a rich set of professional templates. Built with React.js and JSON Server.

## Features

### General Features
- **Multilingual Support**: Switch seamlessly between English and French throughout the entire application
- **User Authentication**: Secure login and registration system
- **Dashboard Management**: Organize and manage your resumes and cover letters in one place
- **Version History**: Keep track of changes with built-in versioning for your documents
- **Sharing Capability**: Generate shareable links to your resumes and cover letters
- **Responsive Design**: Works on all devices from mobile to desktop
- **Dark Mode Support**: Easy on the eyes with light and dark themes
- **Auto-save Functionality**: Never lose your work

### Resume Features
- **Professional Templates**: Choose from a variety of professionally designed resume templates
- **AI Assistant**: Generate content for your resume with AI help
- **Real-time Editing**: Edit your resume with instant previews
- **Export to PDF**: Download your finished resume

### Cover Letter Features
- **Cover Letter Templates**: Multiple designs to match your resume
- **AI Cover Letter Generation**: Create personalized cover letters based on job descriptions
- **Template Matching**: Ensure your cover letter complements your resume's style

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the JSON Server (mock backend):

```bash
npm run server
```

4. In a new terminal, start the React application:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Authentication

The application uses a simplified JSON Server authentication system. You can use the following credentials to login:

- Regular User:
  - Email: demo@example.com
  - Password: password123

- Premium User:
  - Email: premium@example.com
  - Password: premium123

You can also register new users through the application.

## Multilingual Support

The application fully supports:
- 🇬🇧 English (en)
- 🇫🇷 French (fr)

All UI elements, templates, and AI-generated content adapt to the selected language. You can change the language using the language selector in the navigation bar.

## Document Creation

### Resume Creation
1. Choose a template from the templates page
2. Fill in your information in the editor or use the AI assistant
3. See real-time preview of your changes
4. Save to your dashboard or export to PDF

### Cover Letter Creation
1. Select a cover letter template or use the AI assistant
2. For AI-generated cover letters, provide the job description and your experience
3. Customize the generated content as needed
4. Save to your dashboard alongside matching resumes

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **State Management**: React Context API, Redux
- **Routing**: React Router
- **Internationalization**: i18next for multilingual support
- **Backend**: JSON Server for mock backend
- **AI Integration**: OpenAI API for content generation

## Project Structure

```
resume-build/
├── public/                 # Public assets
├── src/
│   ├── components/         # Reusable components
│   ├── contexts/           # React contexts (auth, theme)
│   ├── coverLetterTemplates/ # Cover letter template components
│   ├── i18n/               # Internationalization settings
│   │   └── locales/        # Language files (en.json, fr.json)
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── store/              # Redux store and slices
│   ├── templates/          # Resume template components
│   ├── utils/              # Utility functions
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── db.json                 # JSON Server database
└── package.json            # Project dependencies
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run server` - Starts the JSON Server mock backend
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## License

This project is licensed under the MIT License - see the LICENSE file for details.

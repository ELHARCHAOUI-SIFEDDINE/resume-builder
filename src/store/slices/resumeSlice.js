import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resumes: [],
  currentResume: null,
  selectedTemplate: 'modern',
  loading: false,
  error: null,
  autosaveStatus: 'idle', // 'idle' | 'saving' | 'saved' | 'error'
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setResumes: (state, action) => {
      state.resumes = action.payload;
      state.loading = false;
    },
    setCurrentResume: (state, action) => {
      state.currentResume = action.payload;
    },
    updateCurrentResume: (state, action) => {
      state.currentResume = {
        ...state.currentResume,
        ...action.payload,
      };
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    addResume: (state, action) => {
      state.resumes.push(action.payload);
    },
    updateResume: (state, action) => {
      const index = state.resumes.findIndex(
        (resume) => resume.id === action.payload.id
      );
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
    deleteResume: (state, action) => {
      state.resumes = state.resumes.filter(
        (resume) => resume.id !== action.payload
      );
    },
    setAutosaveStatus: (state, action) => {
      state.autosaveStatus = action.payload;
    },
    reorderSection: (state, action) => {
      const { sectionType, sourceIndex, destinationIndex } = action.payload;
      if (state.currentResume && state.currentResume[sectionType]) {
        const items = Array.from(state.currentResume[sectionType]);
        const [removed] = items.splice(sourceIndex, 1);
        items.splice(destinationIndex, 0, removed);
        state.currentResume[sectionType] = items;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setResumes,
  setCurrentResume,
  updateCurrentResume,
  setSelectedTemplate,
  addResume,
  updateResume,
  deleteResume,
  setAutosaveStatus,
  reorderSection,
} = resumeSlice.actions;

export default resumeSlice.reducer; 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  activeSection: 'personal',
  visibleSections: {
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    interests: true,
  },
  previewMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleSectionVisibility: (state, action) => {
      const section = action.payload;
      state.visibleSections[section] = !state.visibleSections[section];
    },
    togglePreviewMode: (state) => {
      state.previewMode = !state.previewMode;
    },
    updateSectionVisibility: (state, action) => {
      state.visibleSections = {
        ...state.visibleSections,
        ...action.payload,
      };
    },
  },
});

export const {
  toggleSidebar,
  setActiveSection,
  toggleSectionVisibility,
  togglePreviewMode,
  updateSectionVisibility,
} = uiSlice.actions;

export default uiSlice.reducer; 
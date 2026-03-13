import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Story API
export const getStory = () => api.get('/story');
export const getChapters = () => api.get('/chapters');

// Scene API
export const getScene = (id) => api.get(`/scene/${id}`);
export const getChoices = (id) => api.get(`/scene/${id}/choices`);

// Game Engine API
export const startGame = (playerName) =>
  api.post(`/scene/start?playerName=${encodeURIComponent(playerName)}`);

export const resumeGame = (playerName) =>
  api.post(`/scene/resume?playerName=${encodeURIComponent(playerName)}`);

export const processChoice = (playerName, choiceId) =>
  api.post('/scene/choice', { playerName, choiceId });

// Progress API
export const saveProgress = (playerName, sceneId) =>
  api.post('/progress/save', { playerName, sceneId });

export const loadProgress = (playerName) =>
  api.get(`/progress/${encodeURIComponent(playerName)}`);

export const hasProgress = (playerName) =>
  api.get(`/progress/${encodeURIComponent(playerName)}/exists`);

export default api;

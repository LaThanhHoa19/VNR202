// ============================================================
// api.js — Local-first API layer (no backend required!)
// All data is served from storyData.js in the browser.
// Game progress is saved to localStorage.
// ============================================================
import { SCENES, INITIAL_STATS, STARTING_SCENE_ID } from './data/storyData';

// Helper: clamp a value between 0 and 100
const clamp = (val) => Math.max(0, Math.min(100, val));

// Helper: get a scene by id with computed per-player stats
const buildSceneResponse = (sceneId, playerStats, updatedScore) => {
  const scene = SCENES[sceneId];
  if (!scene) return null;
  return {
    ...scene,
    // Overlay the player's current stats so the UI shows live values
    militaryStrength: clamp(playerStats.militaryStrength),
    publicSupport: clamp(playerStats.publicSupport),
    logistics: clamp(playerStats.logistics),
    politicalLegitimacy: clamp(playerStats.politicalLegitimacy),
    updatedScore: updatedScore ?? 0,
    consequenceText: null,
    feedbackPhilosophy: null,
  };
};

// --------------- Progress helpers (localStorage) ---------------
const SAVE_KEY = (name) => `hcm1975_save_${name}`;

const loadSave = (playerName) => {
  try {
    const raw = localStorage.getItem(SAVE_KEY(playerName));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const writeSave = (playerName, data) => {
  localStorage.setItem(SAVE_KEY(playerName), JSON.stringify(data));
};

// --------------- Public API (mirrors the old Axios API shape) ---------------

/**
 * Returns a mock "axios-like" response { data: ... }
 */
const ok = (data) => Promise.resolve({ data });

// ── Story ──────────────────────────────────────────────────────────────────
export const getStory = () => ok({
  id: 1,
  title: 'Chiến dịch Hồ Chí Minh — Truyện tương tác học Triết học',
  description: 'Trải nghiệm tương tác giả tưởng...',
});

export const getChapters = () => ok([
  { id: 1, storyId: 1, title: 'Hành trình giải phóng', orderIndex: 1 },
]);

// ── Scene ──────────────────────────────────────────────────────────────────
export const getScene = (id) => {
  const scene = SCENES[parseInt(id)];
  if (!scene) return Promise.reject(new Error(`Scene ${id} not found`));
  return ok(scene);
};

export const getChoices = (id) => {
  const scene = SCENES[parseInt(id)];
  if (!scene) return Promise.reject(new Error(`Scene ${id} not found`));
  return ok(scene.choices);
};

// ── Game Engine ────────────────────────────────────────────────────────────
export const startGame = (playerName) => {
  const save = {
    sceneId: STARTING_SCENE_ID,
    score: 0,
    stats: { ...INITIAL_STATS },
  };
  writeSave(playerName, save);
  const scene = buildSceneResponse(STARTING_SCENE_ID, save.stats, 0);
  return ok(scene);
};

export const resumeGame = (playerName) => {
  const save = loadSave(playerName);
  if (!save) return startGame(playerName);
  const scene = buildSceneResponse(save.sceneId, save.stats, save.score);
  return ok(scene);
};

export const processChoice = (playerName, choiceId) => {
  const save = loadSave(playerName) ?? {
    sceneId: STARTING_SCENE_ID,
    score: 0,
    stats: { ...INITIAL_STATS },
  };

  // Find the choice across all scenes
  let foundChoice = null;
  for (const scene of Object.values(SCENES)) {
    if (scene.choices) {
      const c = scene.choices.find((ch) => ch.id === choiceId);
      if (c) { foundChoice = c; break; }
    }
  }

  if (!foundChoice) return Promise.reject(new Error(`Choice ${choiceId} not found`));

  // Apply effects
  const newStats = {
    militaryStrength: clamp(save.stats.militaryStrength + (foundChoice.militaryEffect ?? 0)),
    publicSupport: clamp(save.stats.publicSupport + (foundChoice.publicEffect ?? 0)),
    logistics: clamp(save.stats.logistics + (foundChoice.logisticsEffect ?? 0)),
    politicalLegitimacy: clamp(save.stats.politicalLegitimacy + (foundChoice.politicalEffect ?? 0)),
  };
  const newScore = (save.score ?? 0) + (foundChoice.score ?? 0);

  // Advance to next scene
  const nextSceneId = foundChoice.nextSceneId;
  writeSave(playerName, { sceneId: nextSceneId ?? save.sceneId, score: newScore, stats: newStats });

  const nextScene = nextSceneId
    ? buildSceneResponse(nextSceneId, newStats, newScore)
    : buildSceneResponse(save.sceneId, newStats, newScore);

  return ok({
    ...nextScene,
    consequenceText: foundChoice.consequenceText || 'Hành động đã được thực hiện.',
    feedbackPhilosophy: foundChoice.philosophyExplain || 'Không có giải thích triết học.',
    updatedScore: newScore,
  });
};

// ── Progress ───────────────────────────────────────────────────────────────
export const saveProgress = (playerName, sceneId) => {
  const save = loadSave(playerName) ?? { sceneId, score: 0, stats: { ...INITIAL_STATS } };
  writeSave(playerName, { ...save, sceneId });
  return ok({ success: true });
};

export const loadProgress = (playerName) => {
  const save = loadSave(playerName);
  if (!save) return Promise.reject(new Error('No save found'));
  return ok(save);
};

export const hasProgress = (playerName) => {
  return ok({ exists: !!loadSave(playerName) });
};

export default { getStory, getChapters, getScene, getChoices, startGame, resumeGame, processChoice, saveProgress, loadProgress, hasProgress };

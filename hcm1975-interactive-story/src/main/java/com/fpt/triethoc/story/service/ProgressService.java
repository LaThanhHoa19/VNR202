package com.fpt.triethoc.story.service;

import com.fpt.triethoc.story.model.Choice;
import com.fpt.triethoc.story.model.PlayerProgress;
import com.fpt.triethoc.story.repository.PlayerProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final PlayerProgressRepository playerProgressRepository;

    /**
     * Save or update player progress
     */
    public PlayerProgress saveProgress(String playerName, Long sceneId) {
        PlayerProgress progress = playerProgressRepository.findByPlayerName(playerName)
                .orElse(new PlayerProgress(null, playerName, sceneId, 0, 50, 50, 50, 50));
        progress.setCurrentSceneId(sceneId);
        return playerProgressRepository.save(progress);
    }

    /**
     * Load player progress by name
     */
    public PlayerProgress loadProgress(String playerName) {
        return playerProgressRepository.findByPlayerName(playerName)
                .orElseThrow(() -> new RuntimeException("No progress found for player: " + playerName));
    }

    /**
     * Update player score and hidden states
     */
    public PlayerProgress updateStates(String playerName, Choice choice) {
        PlayerProgress progress = loadProgress(playerName);
        progress.setScore(progress.getScore() + choice.getScore());
        progress.setMilitaryStrength(Math.max(0, Math.min(100, progress.getMilitaryStrength() + choice.getMilitaryEffect())));
        progress.setPublicSupport(Math.max(0, Math.min(100, progress.getPublicSupport() + choice.getPublicEffect())));
        progress.setLogistics(Math.max(0, Math.min(100, progress.getLogistics() + choice.getLogisticsEffect())));
        progress.setPoliticalLegitimacy(Math.max(0, Math.min(100, progress.getPoliticalLegitimacy() + choice.getPoliticalEffect())));
        return playerProgressRepository.save(progress);
    }

    /**
     * Add delta score to player's current score (Legacy/Helper)
     */
    public PlayerProgress updateScore(String playerName, int delta) {
        PlayerProgress progress = loadProgress(playerName);
        progress.setScore(progress.getScore() + delta);
        return playerProgressRepository.save(progress);
    }

    /**
     * Check if player already has progress
     */
    public boolean hasProgress(String playerName) {
        return playerProgressRepository.findByPlayerName(playerName).isPresent();
    }
}

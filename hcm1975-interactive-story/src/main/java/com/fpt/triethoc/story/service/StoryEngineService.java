package com.fpt.triethoc.story.service;

import com.fpt.triethoc.story.dto.SceneResponse;
import com.fpt.triethoc.story.model.Choice;
import com.fpt.triethoc.story.model.PlayerProgress;
import com.fpt.triethoc.story.repository.ChoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoryEngineService {

    private final StoryService storyService;
    private final ProgressService progressService;
    private final ChoiceRepository choiceRepository;

    /**
     * Load a scene by ID — builds full SceneResponse DTO
     */
    public SceneResponse loadScene(Long sceneId) {
        return storyService.getScene(sceneId);
    }

    /**
     * Process a player's choice:
     * 1. Look up the choice
     * 2. Update player score
     * 3. Move player to next scene
     * 4. Return the next SceneResponse
     */
    public SceneResponse processChoice(Long choiceId, String playerName) {
        // Find the selected choice
        Choice choice = choiceRepository.findById(choiceId)
                .orElseThrow(() -> new RuntimeException("Choice not found with id: " + choiceId));

        // Update score and states
        progressService.updateStates(playerName, choice);

        // Handle next scene or ending
        Long nextSceneId = choice.getNextSceneId();
        SceneResponse response;

        if (nextSceneId == null) {
            // This is an ending choice
            response = storyService.getScene(choice.getScene().getId());
            response.setEnding(true);
        } else {
            // Move to next scene and persist progress
            progressService.saveProgress(playerName, nextSceneId);
            response = storyService.getScene(nextSceneId);
        }

        // Return response with feedback
        PlayerProgress progress = progressService.loadProgress(playerName);
        response.setConsequenceText(choice.getConsequenceText());
        response.setFeedbackPhilosophy(choice.getPhilosophyExplain());
        response.setUpdatedScore(progress.getScore());
        
        // Add hidden states to response
        response.setMilitaryStrength(progress.getMilitaryStrength());
        response.setPublicSupport(progress.getPublicSupport());
        response.setLogistics(progress.getLogistics());
        response.setPoliticalLegitimacy(progress.getPoliticalLegitimacy());
        
        return response;
    }

    /**
     * Start a new game for a player at scene 1
     */
    public SceneResponse startGame(String playerName) {
        Long startingSceneId = 1L;
        progressService.saveProgress(playerName, startingSceneId);
        return storyService.getScene(startingSceneId);
    }

    /**
     * Resume game for existing player
     */
    public SceneResponse resumeGame(String playerName) {
        PlayerProgress progress = progressService.loadProgress(playerName);
        return storyService.getScene(progress.getCurrentSceneId());
    }
}

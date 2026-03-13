package com.fpt.triethoc.story.controller;

import com.fpt.triethoc.story.dto.ChoiceRequest;
import com.fpt.triethoc.story.dto.SceneResponse;
import com.fpt.triethoc.story.model.Chapter;
import com.fpt.triethoc.story.model.Choice;
import com.fpt.triethoc.story.model.Story;
import com.fpt.triethoc.story.service.StoryEngineService;
import com.fpt.triethoc.story.service.StoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;
    private final StoryEngineService storyEngineService;

    /**
     * GET /api/story — get main story info
     */
    @GetMapping("/story")
    public ResponseEntity<Story> getStory() {
        return ResponseEntity.ok(storyService.getStory());
    }

    /**
     * GET /api/chapters — get all chapters ordered by index
     */
    @GetMapping("/chapters")
    public ResponseEntity<List<Chapter>> getChapters() {
        return ResponseEntity.ok(storyService.getChapterList());
    }

    /**
     * GET /api/scene/{id} — get a scene with its choices via game engine
     */
    @GetMapping("/scene/{id}")
    public ResponseEntity<SceneResponse> getScene(@PathVariable Long id) {
        return ResponseEntity.ok(storyEngineService.loadScene(id));
    }

    /**
     * GET /api/scene/{id}/choices — get all choices for a scene
     */
    @GetMapping("/scene/{id}/choices")
    public ResponseEntity<List<Choice>> getChoices(@PathVariable Long id) {
        return ResponseEntity.ok(storyService.getChoices(id));
    }

    /**
     * POST /api/scene/choice — process player choice, return next scene
     */
    @PostMapping("/scene/choice")
    public ResponseEntity<SceneResponse> processChoice(@Valid @RequestBody ChoiceRequest request) {
        SceneResponse response = storyEngineService.processChoice(
                request.getChoiceId(),
                request.getPlayerName()
        );
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/scene/start — start a new game
     */
    @PostMapping("/scene/start")
    public ResponseEntity<SceneResponse> startGame(@RequestParam String playerName) {
        return ResponseEntity.ok(storyEngineService.startGame(playerName));
    }

    /**
     * POST /api/scene/resume — resume for existing player
     */
    @PostMapping("/scene/resume")
    public ResponseEntity<SceneResponse> resumeGame(@RequestParam String playerName) {
        return ResponseEntity.ok(storyEngineService.resumeGame(playerName));
    }
}

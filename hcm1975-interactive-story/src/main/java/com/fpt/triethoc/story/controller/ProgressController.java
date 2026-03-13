package com.fpt.triethoc.story.controller;

import com.fpt.triethoc.story.dto.ProgressRequest;
import com.fpt.triethoc.story.model.PlayerProgress;
import com.fpt.triethoc.story.service.ProgressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    /**
     * POST /api/progress/save — save player progress
     */
    @PostMapping("/save")
    public ResponseEntity<PlayerProgress> saveProgress(@Valid @RequestBody ProgressRequest request) {
        PlayerProgress progress = progressService.saveProgress(
                request.getPlayerName(),
                request.getSceneId()
        );
        return ResponseEntity.ok(progress);
    }

    /**
     * GET /api/progress/{player} — load player progress
     */
    @GetMapping("/{player}")
    public ResponseEntity<PlayerProgress> loadProgress(@PathVariable String player) {
        return ResponseEntity.ok(progressService.loadProgress(player));
    }

    /**
     * GET /api/progress/{player}/exists — check if player has progress
     */
    @GetMapping("/{player}/exists")
    public ResponseEntity<Boolean> hasProgress(@PathVariable String player) {
        return ResponseEntity.ok(progressService.hasProgress(player));
    }
}

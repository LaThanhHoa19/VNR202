package com.fpt.triethoc.story.service;

import com.fpt.triethoc.story.dto.SceneResponse;
import com.fpt.triethoc.story.model.Chapter;
import com.fpt.triethoc.story.model.Choice;
import com.fpt.triethoc.story.model.Scene;
import com.fpt.triethoc.story.model.Story;
import com.fpt.triethoc.story.repository.ChapterRepository;
import com.fpt.triethoc.story.repository.ChoiceRepository;
import com.fpt.triethoc.story.repository.SceneRepository;
import com.fpt.triethoc.story.repository.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepository storyRepository;
    private final ChapterRepository chapterRepository;
    private final SceneRepository sceneRepository;
    private final ChoiceRepository choiceRepository;

    /**
     * Get the main story (first one in DB)
     */
    public Story getStory() {
        return storyRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No story found in database"));
    }

    /**
     * Get all chapters for the main story, ordered by index
     */
    public List<Chapter> getChapterList() {
        Story story = getStory();
        return chapterRepository.findByStoryIdOrderByOrderIndex(story.getId());
    }

    /**
     * Get a scene by ID as a SceneResponse DTO
     */
    public SceneResponse getScene(Long sceneId) {
        Scene scene = sceneRepository.findById(sceneId)
                .orElseThrow(() -> new RuntimeException("Scene not found with id: " + sceneId));

        List<Choice> choices = choiceRepository.findBySceneId(sceneId);

        List<SceneResponse.ChoiceSummary> choiceSummaries = choices.stream()
                .map(c -> new SceneResponse.ChoiceSummary(c.getId(), c.getText(), c.getScore()))
                .collect(Collectors.toList());

        return new SceneResponse(
                scene.getId(),
                scene.getTitle(),
                scene.getContent(),
                scene.getImageUrl(),
                scene.getPhilosophyNote(),
                choiceSummaries,
                choices.isEmpty(),
                null, null, 0,
                50, 50, 50, 50
        );
    }

    /**
     * Get choices for a scene
     */
    public List<Choice> getChoices(Long sceneId) {
        return choiceRepository.findBySceneId(sceneId);
    }
}

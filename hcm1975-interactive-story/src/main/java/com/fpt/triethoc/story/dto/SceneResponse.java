package com.fpt.triethoc.story.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SceneResponse {

    private Long sceneId;
    private String title;
    private String content;
    private String imageUrl;
    private String philosophyNote;
    private List<ChoiceSummary> choices;
    private boolean isEnding;

    // Feedback from the previous choice (if any)
    private String consequenceText;
    private String feedbackPhilosophy;
    private int updatedScore;

    // Current Hidden States
    private int militaryStrength;
    private int publicSupport;
    private int logistics;
    private int politicalLegitimacy;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChoiceSummary {
        private Long id;
        private String text;
        private int score;
    }
}

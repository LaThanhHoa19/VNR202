package com.fpt.triethoc.story.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceRequest {

    @NotBlank(message = "Player name is required")
    private String playerName;

    @NotNull(message = "Choice ID is required")
    private Long choiceId;
}

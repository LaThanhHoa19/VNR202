package com.fpt.triethoc.story.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "player_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_name", nullable = false, unique = true)
    private String playerName;

    @Column(name = "current_scene_id")
    private Long currentSceneId;

    @Column(nullable = false)
    private int score;

    @Column(name = "military_strength")
    private int militaryStrength = 50;

    @Column(name = "public_support")
    private int publicSupport = 50;

    @Column(name = "logistics")
    private int logistics = 50;

    @Column(name = "political_legitimacy")
    private int politicalLegitimacy = 50;
}

package com.fpt.triethoc.story.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "choices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Choice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scene_id", nullable = false)
    private Scene scene;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "next_scene_id")
    private Long nextSceneId;

    @Column(name = "philosophy_explain", columnDefinition = "TEXT")
    private String philosophyExplain;

    @Column(name = "consequence_text", columnDefinition = "TEXT")
    private String consequenceText;

    @Column(nullable = false)
    private int score;

    @Column(name = "military_effect")
    private int militaryEffect;

    @Column(name = "public_effect")
    private int publicEffect;

    @Column(name = "logistics_effect")
    private int logisticsEffect;

    @Column(name = "political_effect")
    private int politicalEffect;
}

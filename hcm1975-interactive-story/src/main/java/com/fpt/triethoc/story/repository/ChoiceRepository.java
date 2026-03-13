package com.fpt.triethoc.story.repository;

import com.fpt.triethoc.story.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Long> {
    List<Choice> findBySceneId(Long sceneId);
}

package com.fpt.triethoc.story.repository;

import com.fpt.triethoc.story.model.Scene;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SceneRepository extends JpaRepository<Scene, Long> {
    List<Scene> findByChapterId(Long chapterId);
}

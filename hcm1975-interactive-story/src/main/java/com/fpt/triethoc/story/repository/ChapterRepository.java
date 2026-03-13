package com.fpt.triethoc.story.repository;

import com.fpt.triethoc.story.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    List<Chapter> findByStoryIdOrderByOrderIndex(Long storyId);
}

package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {

	Tag findByTagName(String tagName);
	
}

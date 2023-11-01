package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.ArticleTag;

public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long> {

	ArticleTag findByTagName(String tagName);
	
}

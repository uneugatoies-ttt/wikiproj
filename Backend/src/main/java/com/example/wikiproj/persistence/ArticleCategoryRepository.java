package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.ArticleCategory;

public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Long> {
	
	ArticleCategory findByCategoryName(String cateogoryName);

}

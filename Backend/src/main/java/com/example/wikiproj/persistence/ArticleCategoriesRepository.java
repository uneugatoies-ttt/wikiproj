package com.example.wikiproj.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.Article;
import com.example.wikiproj.domain.ArticleCategories;
import com.example.wikiproj.domain.Category;

public interface ArticleCategoriesRepository extends JpaRepository<ArticleCategories, Long> {

	List<ArticleCategories> findAllByArticle(Article article);
	
	void deleteAllByArticle(Article article);
	
}

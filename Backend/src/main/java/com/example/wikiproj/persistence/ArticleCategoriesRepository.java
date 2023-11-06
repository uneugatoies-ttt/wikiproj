package com.example.wikiproj.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.Article;
import com.example.wikiproj.model.ArticleCategories;
import com.example.wikiproj.model.Category;

public interface ArticleCategoriesRepository extends JpaRepository<ArticleCategories, Long> {

	List<ArticleCategories> findAllByArticle(Article article);
	
	void deleteAllByArticle(Article article);
	
}

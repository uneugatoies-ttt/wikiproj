package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.Article;
import com.example.wikiproj.model.Wiki;

public interface ArticleRepository extends JpaRepository<Article, Long> {

	Article findByWikiAndTitle(Wiki wiki, String title);
	
}

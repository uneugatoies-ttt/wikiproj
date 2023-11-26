package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.Article;
import com.example.wikiproj.domain.Wiki;

public interface ArticleRepository extends JpaRepository<Article, Long> {

	Article findByWikiAndTitle(Wiki wiki, String title);
	
}

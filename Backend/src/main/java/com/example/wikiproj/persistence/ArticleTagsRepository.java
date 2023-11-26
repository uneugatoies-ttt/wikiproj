package com.example.wikiproj.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.Article;
import com.example.wikiproj.domain.ArticleTags;

public interface ArticleTagsRepository extends JpaRepository<ArticleTags, Long> {

	List<ArticleTags> findAllByArticle(Article article);
	
	void deleteAllByArticle(Article article);

}

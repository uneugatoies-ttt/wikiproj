package com.example.wikiproj.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.Article;
import com.example.wikiproj.domain.RevisionAndContent;

public interface RevisionAndContentRepository extends JpaRepository<RevisionAndContent, Long> {

	List<RevisionAndContent> findAllByArticle(Article article);

}

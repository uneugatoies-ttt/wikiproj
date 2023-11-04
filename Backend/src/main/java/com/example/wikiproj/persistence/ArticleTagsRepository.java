package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.ArticleTags;

public interface ArticleTagsRepository extends JpaRepository<ArticleTags, Long> {

}

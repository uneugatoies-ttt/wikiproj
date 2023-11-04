package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.ArticleCategories;

public interface ArticleCategoriesRepository extends JpaRepository<ArticleCategories, Long> {

}

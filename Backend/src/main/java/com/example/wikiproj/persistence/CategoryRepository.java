package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	Category findByCategoryName(String cateogoryName);

}

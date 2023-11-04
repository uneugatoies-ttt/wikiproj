package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.RACCategories;

public interface RACCategoriesRepository extends JpaRepository<RACCategories, Long> {

}

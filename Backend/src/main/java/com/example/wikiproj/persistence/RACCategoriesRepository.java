package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.RACCategories;

public interface RACCategoriesRepository extends JpaRepository<RACCategories, Long> {

}

package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.WikiClass;

public interface WikiClassRepository extends JpaRepository<WikiClass, Long> {

	WikiClass findByClassName(String wikiClassName);
	
}

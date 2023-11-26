package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.Wiki;

public interface WikiRepository extends JpaRepository<Wiki, Long> {

	Wiki findByWikiname(String wikiname);

}

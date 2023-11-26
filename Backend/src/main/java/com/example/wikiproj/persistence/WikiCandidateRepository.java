package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.WikiCandidate;

public interface WikiCandidateRepository extends JpaRepository<WikiCandidate, Long> {

}

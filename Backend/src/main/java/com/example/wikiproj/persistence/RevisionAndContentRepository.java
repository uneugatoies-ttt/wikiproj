package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.RevisionAndContent;

public interface RevisionAndContentRepository extends JpaRepository<RevisionAndContent, Long> {

}

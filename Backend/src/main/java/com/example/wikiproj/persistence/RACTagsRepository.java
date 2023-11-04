package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.RACTags;

public interface RACTagsRepository extends JpaRepository<RACTags, Long> {

}

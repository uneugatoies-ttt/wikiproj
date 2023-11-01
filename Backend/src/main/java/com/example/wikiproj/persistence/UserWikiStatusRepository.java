package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.UserWikiStatus;

public interface UserWikiStatusRepository extends JpaRepository<UserWikiStatus, Long> {

}

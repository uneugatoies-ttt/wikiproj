package com.example.wikiproj.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.UserWikiStatus;
import com.example.wikiproj.domain.Wiki;

public interface UserWikiStatusRepository extends JpaRepository<UserWikiStatus, Long> {
	
	List<UserWikiStatus> findByWiki(Wiki wiki);

}

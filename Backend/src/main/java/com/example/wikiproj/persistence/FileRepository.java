package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.File;
import com.example.wikiproj.domain.Wiki;

public interface FileRepository extends JpaRepository<File, Long> {
	
	Boolean existsByFileNameAndUsedInThisWiki(String fileName, Wiki usedInThisWiki);

}

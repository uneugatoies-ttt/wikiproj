package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.File;
import com.example.wikiproj.model.Wiki;

public interface FileRepository extends JpaRepository<File, Long> {
	
	Boolean existsByFileNameAndUsedInThisWiki(String fileName, Wiki usedInThisWiki);

}

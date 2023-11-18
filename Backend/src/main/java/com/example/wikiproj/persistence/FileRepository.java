package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.File;

public interface FileRepository extends JpaRepository<File, Long> {
	
	boolean existsByFilename(String filename);

}

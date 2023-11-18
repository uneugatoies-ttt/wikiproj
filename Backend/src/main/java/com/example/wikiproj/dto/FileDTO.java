package com.example.wikiproj.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileDTO {
	
	private Long id;
	
	private String fileName;
	
	private String uploader;
	
	private String usedInThisWiki;
	
	private String filePath;
	
	private String description;
	
	private String fileType;
	
	private LocalDateTime createdAt;

}

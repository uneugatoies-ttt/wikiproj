package com.example.wikiproj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RevisionDTO {
	
	private Long id;
	
	private Long articleId;
	
	private String editorOrReverter;

	private String title;

	private String content;
	
	private String versionMemo;
	
	private String versionType;

}

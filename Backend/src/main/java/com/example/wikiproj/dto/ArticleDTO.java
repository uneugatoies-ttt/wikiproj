package com.example.wikiproj.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ArticleDTO {
	
	private Long articleId;
	
	private String wikiname;
	
	private String title;
	
	private String content;
	
	private String lastEditor;
	
	private List<String> categories;
	
	private List<String> tags;

}

package com.example.wikiproj.dto;

import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WikiDTO {
	
	private Long wikiId;
	
	private String wikiname;
	
	private String description;
	
	private String wikiClassName;

}

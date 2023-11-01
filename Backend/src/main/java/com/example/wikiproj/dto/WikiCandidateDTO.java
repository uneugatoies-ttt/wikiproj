package com.example.wikiproj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WikiCandidateDTO {
	
	private Long wikiCandidateId;
	
	private String wikiname;
	
	private String description;
	
	private String proponent;
	
	private String wikiClassName;

}

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
public class RevisionDTO {
	
	private Long id;
	private Long articleId;
	private List<String> authors;
	private String title;
	private String content;

}

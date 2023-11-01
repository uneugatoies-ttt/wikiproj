package com.example.wikiproj.model.content;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
	There are a few types for this class, and objects
	will be treated differently by their types.
	
	1) plainSection:
		> Contains no source, but only title and contentText.
		It will be used for ordinary explanations.
	
	2) plainImage:
		> Contains just the source of the image;
		without any additional text.
	
	3) imageFrame1:
		> Contains the source and corresponding description
		for it.
		

*/


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ArticleSection {
	
	private String type;
	
	private String title;
	
	private String contentText;
	
	private String source;

}

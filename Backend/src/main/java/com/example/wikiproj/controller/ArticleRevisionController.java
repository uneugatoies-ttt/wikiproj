package com.example.wikiproj.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.ArticleDTO;
import com.example.wikiproj.dto.ResponseDTO;
import com.example.wikiproj.dto.RevisionDTO;
import com.example.wikiproj.service.ArticleService;

@RestController
@RequestMapping("/article/revision")
public class ArticleRevisionController {
	
	private ArticleService articleService;
	
	public ArticleRevisionController(ArticleService articleService) {
		this.articleService = articleService;
	}
	
	@PutMapping("/revert")
	public ResponseEntity<?> revertArticle(@RequestBody RevisionDTO revisionDTO) {
		try {
			ArticleDTO revertedArticleDTO = articleService.revertArticle(revisionDTO);
			return ResponseEntity.ok().body(revertedArticleDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/history")
	public ResponseEntity<?> revisionHistory(@RequestBody Long articleId) {
		try {
			List<RevisionDTO> list = articleService.revisionHistory(articleId);
			ResponseDTO<RevisionDTO> responseDTO = ResponseDTO.<RevisionDTO>builder()
										.data(list)
										.build();
			return ResponseEntity.ok().body(responseDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}

package com.example.wikiproj.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.ArticleDTO;
import com.example.wikiproj.service.ArticleService;

@RestController
@RequestMapping("/article")
public class ArticleController {
	
	private ArticleService articleService;
	
	public ArticleController(ArticleService articleService) {
		this.articleService = articleService;
	}
	
	@GetMapping("/select")
	public ResponseEntity<?> selectArticle(@RequestBody Long articleId) {
		try {
			if (articleId == null) throw new RuntimeException("ID is null");
			ArticleDTO foundArticleDTO = articleService.selectArticle(articleId);
			return ResponseEntity.ok().body(foundArticleDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/select-by-wt")
	public ResponseEntity<?> selectArticleByWikinameAndTitle(@RequestParam String wikiname, @RequestParam String title) {
		try {
			if (wikiname == null || title == null)
				throw new RuntimeException("Wikiname or Title Is NULL");
			
			System.out.println("wikiname is: " + wikiname);
			System.out.println("title is: " + title + "\n\n");

			
			ArticleDTO foundArticleDTO = 
				articleService
					.selectArticleByWikinameAndTitle(wikiname, title);
			
			
			
			System.out.println("we got the 'foundArticleDTO'\n\n");
			
			System.out.println("title: " + foundArticleDTO.getTitle());
			System.out.println("content: " + foundArticleDTO.getContent() + "\n\n");
			
			return ResponseEntity.ok().body(foundArticleDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping("/insert")
	public ResponseEntity<?> insertArticle(@RequestBody ArticleDTO articleDTO) {
		try {
			if (
				articleDTO.getContent() == null 		||
				articleDTO.getAuthors() == null			||
				articleDTO.getTitle() == null			||
				articleDTO.getWikiname() == null
			) throw new RuntimeException("Invalid Insertion Attempt");
			ArticleDTO insertedArticleDTO = articleService.insertArticle(articleDTO);
			return ResponseEntity.ok().body(insertedArticleDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateArticle(@RequestBody ArticleDTO articleDTO) {
		try {
			if (
					articleDTO.getContent() == null 		||
					articleDTO.getAuthors() == null			||
					articleDTO.getTitle() == null			||
					articleDTO.getWikiname() == null
				) throw new RuntimeException("Invalid Update Attempt");
			ArticleDTO updatedArticleDTO = articleService.updateArticle(articleDTO);
			return ResponseEntity.ok().body(updatedArticleDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteArticle(@RequestBody Long articleId) {
		try {
			if (articleId == null) throw new RuntimeException("ID is null");
			String res = articleService.deleteArticle(articleId);
			if (res == null) throw new RuntimeException("Article doesn't exist");
			return ResponseEntity.ok().body(res);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
}

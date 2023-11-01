package com.example.wikiproj.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.WikiCandidateDTO;
import com.example.wikiproj.dto.WikiDTO;
import com.example.wikiproj.service.WikiService;

@RestController
@RequestMapping("/wiki")
public class WikiController {
	
	private WikiService wikiService;
	
	public WikiController(WikiService wikiService) {
		this.wikiService = wikiService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createWiki(@RequestBody WikiCandidateDTO wikiCandidateDTO) {
		try {
			if (wikiCandidateDTO == null						||
				wikiCandidateDTO.getWikiname() == null 		||
				wikiCandidateDTO.getDescription() == null 	||
				wikiCandidateDTO.getWikiClassName() == null
			) throw new RuntimeException("Invalid Creation Attempt");

			WikiDTO wikiDTO = WikiDTO.builder()
									.wikiname(wikiCandidateDTO.getWikiname())
									.description(wikiCandidateDTO.getDescription())
									.wikiClassName(wikiCandidateDTO.getWikiClassName())
									.build();
			
			WikiDTO responseWikiDTO = wikiService.createWiki(wikiDTO, wikiCandidateDTO.getProponent());
			
			return ResponseEntity.ok().body(responseWikiDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}

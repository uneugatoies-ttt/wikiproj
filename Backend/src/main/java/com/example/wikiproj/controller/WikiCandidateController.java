package com.example.wikiproj.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.ResponseDTO;
import com.example.wikiproj.dto.WikiCandidateDTO;
import com.example.wikiproj.service.WikiCandidateService;

@RestController
@RequestMapping("/wiki")
public class WikiCandidateController {
	
	private WikiCandidateService wikiCandidateService;
	
	public WikiCandidateController(WikiCandidateService wikiCandidateService) {
		this.wikiCandidateService = wikiCandidateService;
	}
	
	@PostMapping("/draft")
	public ResponseEntity<?> createWikiDraft(@RequestBody WikiCandidateDTO wikiCandidateDTO) {
		try {
			if (wikiCandidateDTO == null					||
				wikiCandidateDTO.getWikiname() == null		||
				wikiCandidateDTO.getDescription() == null	||
				wikiCandidateDTO.getWikiClassName() == null	||
				wikiCandidateDTO.getProponent() == null
			) throw new RuntimeException("Invalid Creation Attempt");
			WikiCandidateDTO responseWikiCandidateDTO = wikiCandidateService.createWikiCandidate(wikiCandidateDTO);
			return ResponseEntity.ok().body(responseWikiCandidateDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/draft")
	public ResponseEntity<?> selectWikiDrafts() {
		try {
			List<WikiCandidateDTO> list = wikiCandidateService.selectWikiDrafts();
			
			ResponseDTO<WikiCandidateDTO> responseDTO =
					ResponseDTO
						.<WikiCandidateDTO>builder()
						.data(list)
						.build();
			
			return ResponseEntity.ok().body(responseDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@DeleteMapping("/draft")
	public ResponseEntity<?> deleteWikiDrafts(@RequestBody String id) {
		try {
			if (id.equals(null))
				throw new RuntimeException("Invalid Deletion Attempt");
			wikiCandidateService.deleteWikiDraft(Long.parseLong(id));
			
			List<String> list = new ArrayList<>();
			list.add("Deletion Complete");
			
			ResponseDTO<String> dto = ResponseDTO.<String>builder()
										.data(list)
										.build();
			
			return ResponseEntity.ok().body(dto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}

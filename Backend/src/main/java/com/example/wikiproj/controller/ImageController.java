package com.example.wikiproj.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
public class ImageController {
	
	@GetMapping("/{img}")
	public ResponseEntity<?> getImage(@PathVariable String img) {
		try {
			Resource imgRsc = new ClassPathResource("static/images/" + img);
			if (imgRsc.exists()) {
				
			}
			return null;
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}

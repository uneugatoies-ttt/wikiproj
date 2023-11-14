package com.example.wikiproj.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/image")
public class ImageController {
	
	private static final String IMG_STORAGE_DIRECTORY = 
			"." + File.separator +
			"src" + File.separator +
			"main" + File.separator +
			"resources" + File.separator + 
			"static" + File.separator + 
			"images" + File.separator;
	
	@GetMapping("/{img}")
	public ResponseEntity<?> getImage(@PathVariable String img) {
		try {
			Resource imgRsc = new ClassPathResource("static/images/" + img);
			if (imgRsc.exists()) {
				return ResponseEntity
						.ok()
						.contentType(MediaType.IMAGE_JPEG)
						.body(imgRsc);
			}
			return null;
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping
	public ResponseEntity<?> insertNewImage(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty())
			return ResponseEntity.badRequest().body("No file has been sent");
		
		try {
			byte[] bytes = file.getBytes();
			Path path = Paths.get(IMG_STORAGE_DIRECTORY + file.getOriginalFilename());
			Files.write(path, bytes);
			return ResponseEntity.ok("File uploaded successfully");
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Failed to upload file");
		}
	}

}

package com.example.wikiproj.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.wikiproj.dto.FileDTO;
import com.example.wikiproj.service.FileService;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/file")
public class FileController {
	
	private static final String IMG_STORAGE_DIRECTORY = 
			"." + File.separator +
			"src" + File.separator +
			"main" + File.separator +
			"resources" + File.separator + 
			"static" + File.separator;
	
	private FileService fileService;
	
	public FileController(FileService fileService) {
		this.fileService = fileService;
	}
	
	@GetMapping("/{name}")
	public ResponseEntity<?> getFile(@PathVariable String filename) {
		try {
			Resource fileResource = new ClassPathResource("static/" + filename);
			if (fileResource.exists()) {
				return ResponseEntity
						.ok()
						.contentType(MediaType.IMAGE_JPEG)
						.body(fileResource);
			}
			return null;
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping
	public ResponseEntity<?> insertNewFile(
			@RequestParam("file") MultipartFile file,
			@RequestParam("fileDTO") String fileDTOJson
	) {
		if (file.isEmpty())
			return ResponseEntity.badRequest().body("No file has been sent");
		
		try {
			FileDTO fileDTO = new ObjectMapper().readValue(fileDTOJson, FileDTO.class);
			
			byte[] bytes = file.getBytes();
			Path path = Paths.get(IMG_STORAGE_DIRECTORY + file.getOriginalFilename());
			Files.write(path, bytes);
			
			FileDTO storedFileDTO = fileService.insertNewFile(fileDTO, path.toString());
			
			return ResponseEntity.ok().body(storedFileDTO);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Failed to upload file");
		}
	}
	
	@GetMapping("/presence")
	public ResponseEntity<?> isFilenamePresent(@RequestParam String filename) {
		try {
			return ResponseEntity.ok().body(fileService.isFilenamePresent(filename));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
}

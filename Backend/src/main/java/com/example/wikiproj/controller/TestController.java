package com.example.wikiproj.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.ResponseDTO;

@RestController
public class TestController {
	
	@GetMapping("/temp")
	public ResponseEntity<?> temp() {
		try {
			List<String> list = new ArrayList<>();
			list.add("temp handling complete");
			
			ResponseDTO<String> dto = ResponseDTO.<String>builder()
											.data(list)
											.build();
			return ResponseEntity.ok().body(dto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	@GetMapping("/unauthorized")
	public ResponseEntity<?> unauthorized() {
		try {
			List<String> list = new ArrayList<>();
			list.add("unathorized handling complete");
			
			ResponseDTO<String> dto = ResponseDTO.<String>builder()
												.data(list)
												.build();
			
			return ResponseEntity.ok().body(dto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}

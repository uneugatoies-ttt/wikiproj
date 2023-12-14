package com.example.wikiproj.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.NotificationMessageDTO;
import com.example.wikiproj.dto.ResponseDTO;
import com.example.wikiproj.service.NotificationMessageService;

@RestController
@RequestMapping("/noti")
public class NotificationMessageController {
	
	private NotificationMessageService notificationMessageService;
	
	public NotificationMessageController(NotificationMessageService notificationMessageService) {
		this.notificationMessageService = notificationMessageService;
	}
	
	@GetMapping
	public ResponseEntity<?> getAllMessagesForThisUser(@RequestParam String username) {
		try {
			List<NotificationMessageDTO> messages = notificationMessageService.getAllMessagesForThisUser(username);
			ResponseDTO<NotificationMessageDTO> dto = ResponseDTO.<NotificationMessageDTO>builder()
														.data(messages)
														.build();
			return ResponseEntity.ok().body(dto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	// Remember not to set raw string data as the body of a response;
	// you'll see the error that says Unexpected token is not valid JSON.
	@DeleteMapping
	public ResponseEntity<?> clearAllMessagesForThisUser(@RequestParam String username) {
		try {
			notificationMessageService.clearAllMessagesForThisUser(username);
			
			List<String> list = new ArrayList<>();
			ResponseDTO<String> dto = ResponseDTO.<String>builder()
												.data(list)
												.build();
			return ResponseEntity.ok().body(dto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}

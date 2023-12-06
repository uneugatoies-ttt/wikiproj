package com.example.wikiproj.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
	
	@GetMapping("/user-messages")
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

}

package com.example.wikiproj.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.NotificationMessage;
import com.example.wikiproj.dto.NotificationMessageDTO;
import com.example.wikiproj.persistence.NotificationMessageRepository;
import com.example.wikiproj.persistence.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationMessageService {
	
	private NotificationMessageRepository notificationMessageRepository;
	private UserRepository userRepository;

	@Transactional
	public List<NotificationMessageDTO> getAllMessagesForThisUser(String username) {
		try {
			List<NotificationMessage> allMessages = 
						notificationMessageRepository
							.findAllByRecipient(userRepository.findByUsername(username));
			
			List<NotificationMessageDTO> allMessagesDTO =
						allMessages.stream()
									.map(m -> NotificationMessageDTO.builder()
														.id(m.getId())
														.message(m.getMessage())
														.wiki(m.getWiki().getWikiname())
														.where(m.getWhere())
														.recipient(m.getRecipient().getUsername())
														.build())
									.collect(Collectors.toList());
		
			return allMessagesDTO;
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional
	public void clearAllMessagesForThisUser(String username) {
		try {
			notificationMessageRepository.deleteAllByRecipient(userRepository.findByUsername(username));
		} catch (Exception e) {
			throw e;
		}
	}

}

package com.example.wikiproj.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.NotificationMessage;
import com.example.wikiproj.domain.User;

public interface NotificationMessageRepository extends JpaRepository<NotificationMessage, Long> {
	
	List<NotificationMessage> findAllByRecipient(User recipient);
	
	void deleteAllByRecipient(User recipient);

}

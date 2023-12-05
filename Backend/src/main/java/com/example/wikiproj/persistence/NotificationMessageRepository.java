package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.domain.NotificationMessage;

public interface NotificationMessageRepository extends JpaRepository<NotificationMessage, Long> {

}

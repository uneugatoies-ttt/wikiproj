package com.example.wikiproj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotificationMessageDTO {
	
	private Long id;
	
	private String message;
	
	private String recipient;
	
	private String wiki;
	
	private String where;

}

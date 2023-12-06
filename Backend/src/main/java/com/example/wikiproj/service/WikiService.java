package com.example.wikiproj.service;


import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.NotificationMessage;
import com.example.wikiproj.domain.User;
import com.example.wikiproj.domain.UserWikiStatus;
import com.example.wikiproj.domain.Wiki;
import com.example.wikiproj.domain.WikiClass;
import com.example.wikiproj.dto.WikiDTO;
import com.example.wikiproj.persistence.NotificationMessageRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.UserWikiStatusRepository;
import com.example.wikiproj.persistence.WikiClassRepository;
import com.example.wikiproj.persistence.WikiRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WikiService {
	
	private WikiRepository wikiRepository;
	private WikiClassRepository wikiClassRepository;
	private UserWikiStatusRepository userWikiStatusRepository;
	private UserRepository userRepository;
	private NotificationMessageRepository notificationMessageRepository;

	public WikiDTO createWiki(WikiDTO wikiDTO, String proponent) throws Exception {
		WikiClass wikiClass =  wikiClassRepository.findByClassName(wikiDTO.getWikiClassName());
		if (wikiClass == null)
			throw new RuntimeException("Invalid Wiki Class");
		Wiki existQ = wikiRepository.findByWikiname(wikiDTO.getWikiname());
		if (existQ != null)
			throw new RuntimeException("Wiki Name Already Exists");
		
		Wiki wiki = Wiki.builder()
						.wikiname(wikiDTO.getWikiname())
						.description(wikiDTO.getDescription())
						.wikiClass(wikiClass)
						.build();
		
		Wiki createdWiki = wikiRepository.save(wiki);
		
		WikiDTO resultDTO = WikiDTO.builder()
							.wikiId(createdWiki.getWikiId())
							.wikiname(createdWiki.getWikiname())
							.description(createdWiki.getDescription())
							.wikiClassName(createdWiki.getWikiClass().getClassName())
							.build();
		
		setWikiProponent(proponent, createdWiki);

		
		return resultDTO;
	}
	
	private void setWikiProponent(String proponent, Wiki newWiki) {
		try {
			User userProponent = userRepository.findByUsername(proponent);
			UserWikiStatus uws = UserWikiStatus.builder()
									.status("proponent")
									.user(userProponent)
									.wiki(newWiki)
									.build();
			userWikiStatusRepository.save(uws);
			
			// Saving a message to the proponent
			NotificationMessage messageToProponent = NotificationMessage.builder()
											.message("Your draft for a new wiki is approved by the admin.")
											.recipient(userProponent)
											.wiki(newWiki)
											.where("/wiki/" + newWiki.getWikiname().replace(' ', '-').toLowerCase() + "/home")
											.build();
			notificationMessageRepository.save(messageToProponent);
		} catch (Exception e) {
			throw e;
		}
	}

}
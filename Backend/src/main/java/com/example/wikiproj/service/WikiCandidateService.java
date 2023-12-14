package com.example.wikiproj.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.User;
import com.example.wikiproj.domain.Wiki;
import com.example.wikiproj.domain.WikiCandidate;
import com.example.wikiproj.domain.WikiClass;
import com.example.wikiproj.dto.WikiCandidateDTO;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.WikiCandidateRepository;
import com.example.wikiproj.persistence.WikiClassRepository;
import com.example.wikiproj.persistence.WikiRepository;

@Service
public class WikiCandidateService {
	
	private WikiCandidateRepository wikiCandidateRepository;
	private WikiClassRepository wikiClassRepository;
	private WikiRepository wikiRepository;
	private UserRepository userRepository;
	
	public WikiCandidateService(
		WikiCandidateRepository wikiCandidateRepository,
		WikiClassRepository wikiClassRepository,
		WikiRepository wikiRepository,
		UserRepository userRepository
	) {
		this.wikiCandidateRepository = wikiCandidateRepository;
		this.wikiClassRepository = wikiClassRepository;
		this.wikiRepository = wikiRepository;
		this.userRepository = userRepository;
	}

	@Transactional
	public WikiCandidateDTO createWikiCandidate(WikiCandidateDTO wikiCandidateDTO) {
		try {
			WikiClass wikiClass = wikiClassRepository.findByClassName(wikiCandidateDTO.getWikiClassName());
			if (wikiClass == null)
				throw new RuntimeException("Invalid Wiki Class");
			Wiki existQ = wikiRepository.findByWikinameIgnoreCase(wikiCandidateDTO.getWikiname().trim().toLowerCase().replace('-', ' '));
			if (existQ != null)
				throw new RuntimeException("Wiki Name Already Exists");
			User proponent = userRepository.findByUsername(wikiCandidateDTO.getProponent());
			if (proponent == null)
				throw new RuntimeException("User Does Not Exist");
			
			WikiCandidate candidate = WikiCandidate.builder()
											.wikiname(wikiCandidateDTO.getWikiname())
											.description(wikiCandidateDTO.getDescription())
											.wikiClass(wikiClass)
											.proponent(proponent)
											.build();
			
			WikiCandidate createdCandidate = wikiCandidateRepository.save(candidate);
			
			WikiCandidateDTO resultDTO = WikiCandidateDTO.builder()
											.wikiCandidateId(createdCandidate.getWikiCandidateId())
											.wikiname(createdCandidate.getWikiname())
											.description(createdCandidate.getDescription())
											.wikiClassName(createdCandidate.getWikiClass().getClassName())
											.build();
			
			return resultDTO;
		} catch (Exception e) {
			throw e;
		}
	}

	public List<WikiCandidateDTO> selectWikiDrafts() {
		try {
			List<WikiCandidate> entityList =  wikiCandidateRepository.findAll();
			draftValidate(entityList);
			List<WikiCandidateDTO> list = new ArrayList<>();
			WikiCandidateDTO dto = null;
			for (WikiCandidate c : entityList) {
				dto = WikiCandidateDTO.builder()
						.wikiCandidateId(c.getWikiCandidateId())
						.wikiname(c.getWikiname())
						.description(c.getDescription())
						.proponent(c.getProponent().getUsername())
						.wikiClassName(c.getWikiClass().getClassName())
						.build();
				list.add(dto);		
			}
			return list;
		} catch (Exception e) {
			throw e;
		}
	}

	@Transactional
	public void deleteWikiDraft(Long id) {
		try {
			wikiCandidateRepository.deleteById(id);
		} catch (Exception e) {
			throw e;
		}
	}
	
	// Search whether the wiki name is present in the table 'wiki'.
	// If it is, then delete the corresponding wiki draft.
	public void draftValidate(List<WikiCandidate> draftList) {
		try {
			for (WikiCandidate dr : draftList)
				if (wikiRepository.findByWikinameIgnoreCase(dr.getWikiname()) != null)
					deleteWikiDraft(dr.getWikiCandidateId());
		} catch (Exception e) {
			throw e;
		}
	}

}

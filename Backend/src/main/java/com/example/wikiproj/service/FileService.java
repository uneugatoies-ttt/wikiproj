package com.example.wikiproj.service;

import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.File;
import com.example.wikiproj.domain.User;
import com.example.wikiproj.domain.Wiki;
import com.example.wikiproj.dto.FileDTO;
import com.example.wikiproj.persistence.FileRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.WikiRepository;

@Service
public class FileService {
	
	private FileRepository fileRepository;
	private UserRepository userRepository;
	private WikiRepository wikiRepository;
	
	public FileService(
		FileRepository fileRepository,
		UserRepository userRepository,
		WikiRepository wikiRepository
	) {
		this.fileRepository = fileRepository;
		this.userRepository = userRepository;
		this.wikiRepository = wikiRepository;
	}

	public FileDTO insertNewFile(FileDTO fileDTO, String filePath) {
		try {
			User uploader = userRepository.findByUsername(fileDTO.getUploader());
			Wiki usedInThisWiki = wikiRepository.findByWikinameIgnoreCase(fileDTO.getUsedInThisWiki().trim().toLowerCase().replace('-', ' '));
			
			File fileEntity = File.builder()
								.fileName(fileDTO.getFileName())
								.uploader(uploader)
								.usedInThisWiki(usedInThisWiki)
								.description(fileDTO.getDescription())
								.filePath(filePath)
								.fileType(fileDTO.getFileType())
								.build();
			File storedFileEntity = fileRepository.save(fileEntity);
			
			FileDTO storedFileDTO = FileDTO.builder()
										.fileName(storedFileEntity.getFileName())
										.uploader(storedFileEntity.getUploader().getUsername())
										.usedInThisWiki(storedFileEntity.getUsedInThisWiki().getWikiname())
										.description(storedFileEntity.getDescription())
										.createdAt(storedFileEntity.getCreatedAt())
										.id(storedFileEntity.getId())
										.fileType(storedFileEntity.getFileType())
										.build();
			
			return storedFileDTO;
		} catch (Exception e) {
			throw e;
		}
	}

	public boolean isFileNamePresent(String fileName, String wikiName) {
		try {
			Wiki usedInThisWiki = wikiRepository.findByWikinameIgnoreCase(wikiName.trim().toLowerCase().replace('-', ' '));
			boolean presence = fileRepository.existsByFileNameAndUsedInThisWiki(fileName, usedInThisWiki);
			return presence;
		} catch (Exception e) {
			throw e;
		}
	}

}

package com.example.wikiproj.service;

import org.springframework.stereotype.Service;

import com.example.wikiproj.dto.FileDTO;
import com.example.wikiproj.model.File;
import com.example.wikiproj.model.User;
import com.example.wikiproj.model.Wiki;
import com.example.wikiproj.persistence.FileRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.WikiRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class FileService {
	
	private FileRepository fileRepository;
	private UserRepository userRepository;
	private WikiRepository wikiRepository;

	public FileDTO insertNewFile(FileDTO fileDTO, String filePath) {
		User uploader = userRepository.findByUsername(fileDTO.getUploader());
		Wiki usedInThisWiki = wikiRepository.findByWikiname(fileDTO.getUsedInThisWiki());
		
		File fileEntity = File.builder()
							.filename(fileDTO.getFilename())
							.uploader(uploader)
							.usedInThisWiki(usedInThisWiki)
							.description(fileDTO.getDescription())
							.filePath(filePath)
							.fileType(fileDTO.getFileType())
							.build();
		File storedFileEntity = fileRepository.save(fileEntity);
		
		FileDTO storedFileDTO = FileDTO.builder()
									.filename(storedFileEntity.getFilename())
									.uploader(storedFileEntity.getUploader().getUsername())
									.usedInThisWiki(storedFileEntity.getUsedInThisWiki().getWikiname())
									.description(storedFileEntity.getDescription())
									.createdAt(storedFileEntity.getCreatedAt())
									.id(storedFileEntity.getId())
									.fileType(storedFileEntity.getFileType())
									.build();
		
		return storedFileDTO;
	}

	public boolean isFilenamePresent(String filename) {
		return fileRepository.existsByFilename(filename);
	}

}

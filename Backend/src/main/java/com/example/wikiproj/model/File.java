package com.example.wikiproj.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "file")
public class File extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String fileName;
	
	@ManyToOne
	@JoinColumn(name = "uploader")
	private User uploader;
	
	@ManyToOne
	@JoinColumn(name = "used_in_this_wiki")
	private Wiki usedInThisWiki;

	private String filePath;
	
	private String description;
	
	private String fileType;
	
	
}

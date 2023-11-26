package com.example.wikiproj.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@Table(name = "revision_and_content")
public class RevisionAndContent extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "article_id")
	private Article article;
	
	@ManyToOne
	@JoinColumn(name = "wiki_id")
	private Wiki wiki;

	private String title;
	
	private String content;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	private User editor;
	
	@OneToMany(mappedBy = "revision_and_content")
	@ToString.Exclude
	private List<RACCategories> revisionAndContentCategories;
	
	@OneToMany(mappedBy = "revision_and_content")
	@ToString.Exclude
	private List<RACTags> revisionAndContentTags;
	
	private String versionMemo;
	
/*
	> 'versionType' indicates whether this version is created, edited, or reverted.
	
	> I'm aware of that, in many similar cases, an enumeration is used 
	to indicate one of the many possible options; but I don't realize
	the urging needs to define a separate enumeration just for this.
	If I actually realize the needs in the future, then I'll define the enum.
	IWAAIL.
*/
	private String versionType;

}

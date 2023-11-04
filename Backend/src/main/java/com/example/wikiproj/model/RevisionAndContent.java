package com.example.wikiproj.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
	@GeneratedValue
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

}

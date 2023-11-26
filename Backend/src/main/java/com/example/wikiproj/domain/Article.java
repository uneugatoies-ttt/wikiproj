package com.example.wikiproj.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
	-> When being stored, the upper case letters in the article's title must be replaced with lower case alphabets.
*/

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "article")
public class Article extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long articleId;
	
	@ManyToOne
	@JoinColumn(name = "wiki_id")
	private Wiki wiki;
	
	private String title;
	
	private String content;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User lastEditor;

	@OneToMany(mappedBy = "article")
	@ToString.Exclude
	private List<ArticleCategories> articleCategories;
	
	@OneToMany(mappedBy = "article")
	@ToString.Exclude
	private List<ArticleTags> articleTags;

}

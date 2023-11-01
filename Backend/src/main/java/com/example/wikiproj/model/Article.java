package com.example.wikiproj.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
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
@Table(name = "article")
public class Article extends BaseEntity {
	
	@Id
	@GeneratedValue
	private Long articleId;
	
	@ManyToOne
	@JoinColumn(name = "wiki_id")
	private Wiki wiki;
	
	private String title;
	
	private String content;
	
	@ManyToMany
	@ToString.Exclude
	private List<User> authors;
	
	@ManyToMany
	@ToString.Exclude
	private List<ArticleCategory> categories;
	
	@ManyToMany
	@ToString.Exclude
	private List<ArticleTag> tags;

}

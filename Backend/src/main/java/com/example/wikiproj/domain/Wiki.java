package com.example.wikiproj.domain;

import java.util.ArrayList;
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
	-> When being stored, the upper case letters in the wiki name must be replaced with lower case alphabets.
*/

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "wiki")
public class Wiki extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wikiId;
	
	private String wikiname;
	
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "wiki_class_id")
	private WikiClass wikiClass;
	
	@OneToMany(mappedBy = "wiki")
	@Builder.Default
	private List<UserWikiStatus> userWikiStatus = new ArrayList<>();

}

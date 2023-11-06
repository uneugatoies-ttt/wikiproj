package com.example.wikiproj.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

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
@Table(name = "user")
public class User extends BaseEntity {
	
	@Id
	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;
	
	@Column(nullable = false)
	private String username;

	private String password;
	
	private String email;
	
	@OneToMany(mappedBy = "user")
	@Builder.Default
	private List<UserWikiStatus> userWikiStatus = new ArrayList<>();
	
	private String authProvider;
	
	// I'm going to keep the following two fields just in case you have to 
	// retrieve all articles that a user has been involved.
	@OneToMany(mappedBy = "lastEditor")
	@ToString.Exclude
	private List<Article> articlesWrittenBy;
	
	@OneToMany(mappedBy = "editor")
	@ToString.Exclude
	private List<RevisionAndContent> racsWrittenBy;

}
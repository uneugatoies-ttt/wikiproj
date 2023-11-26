package com.example.wikiproj.service;


import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.User;
import com.example.wikiproj.domain.UserWikiStatus;
import com.example.wikiproj.domain.Wiki;
import com.example.wikiproj.domain.WikiClass;
import com.example.wikiproj.dto.WikiDTO;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.UserWikiStatusRepository;
import com.example.wikiproj.persistence.WikiClassRepository;
import com.example.wikiproj.persistence.WikiRepository;

import lombok.AllArgsConstructor;

/*	NOTE
	-> Originally, I've been using try-catch blocks to handle exceptions within 'createWiki()'
	and 'createMainArticle()', but I happened to encounter a strange error message that says
	"Unhandled exception type JsonProcessingException", even though in the catch blocks
	I was using Exception - the ancestor of all exception classes of Java.
	The message was gone after I deleted the blocks and replaced them with 'throws' after 
	the method signature.
	
	I don't particularly understand this problem; IWAAIL.
	
	
	
*/

/*	TODO
	-> I have to finish the process of automatically inserting the main article
	when a new wiki is created.


*/


@Service
@AllArgsConstructor
public class WikiService {
	
	private WikiRepository wikiRepository;
	private WikiClassRepository wikiClassRepository;
	private UserWikiStatusRepository userWikiStatusRepository;
	private UserRepository userRepository;
	
	/*
	public WikiService(
			WikiRepository wikiRepository,
			WikiClassRepository wikiClassRepository,
			UserWikiStatusRepository userWikiStatusRepository,
			UserRepository userRepository
	) {
		this.wikiRepository = wikiRepository;
		this.wikiClassRepository = wikiClassRepository;
		this.userWikiStatusRepository = userWikiStatusRepository;
		this.userRepository = userRepository;
	}
	*/

	public WikiDTO createWiki(WikiDTO wikiDTO, String proponent) throws Exception {
		WikiClass wikiClass =  wikiClassRepository.findByClassName(wikiDTO.getWikiClassName());
		if (wikiClass == null)
			throw new RuntimeException("Invalid Wiki Class");
		Wiki existQ = wikiRepository.findByWikiname(wikiDTO.getWikiname());
		if (existQ != null)
			throw new RuntimeException("Wiki Name Already Exists");
		
		Wiki wiki = Wiki.builder()
						.wikiname(wikiDTO.getWikiname())
						.description(wikiDTO.getDescription())
						.wikiClass(wikiClass)
						.build();
		
		Wiki createdWiki = wikiRepository.save(wiki);
		
		WikiDTO resultDTO = WikiDTO.builder()
							.wikiId(createdWiki.getWikiId())
							.wikiname(createdWiki.getWikiname())
							.description(createdWiki.getDescription())
							.wikiClassName(createdWiki.getWikiClass().getClassName())
							.build();
		
		setWikiProponent(proponent, createdWiki);
		//createMainArticle(createdWiki);
		
		return resultDTO;
	}
	
	public void setWikiProponent(String proponent, Wiki newWiki) {
		try {
			User userProponent = userRepository.findByUsername(proponent);
			UserWikiStatus uws = UserWikiStatus.builder()
									.status("proponent")
									.user(userProponent)
									.wiki(newWiki)
									.build();
			userWikiStatusRepository.save(uws);
		} catch (Exception e) {
			throw e;
		}
	}
	
	/*
	public void createMainArticle(Wiki createdWiki) throws JsonProcessingException, Exception {
		ArticleSection aboutThisWiki = ArticleSection.builder()
					.type("plainSection")
					.title("About This Wiki")
					.contentText(
						"This wiki is about " + createdWiki.getWikiname() + ".\n" +
						"Users can freely create and edit articles.\n" +
						"Please follow the wiki's rules."
					)
					.source(null)
					.build();

		ArticleSection mostVisited = ArticleSection.builder()
					.type("plainSection")
					.title("Most Visited Articles of " + createdWiki.getWikiname())
					.contentText("[[Main Page]]")
					.build();
		
		List<ArticleSection> sectionList = new ArrayList<>();
		sectionList.add(aboutThisWiki);
		sectionList.add(mostVisited);
		
		ArticleContent contentObject = ArticleContent.builder()
					.title("Main Page")
					.intro("This is the main page of " + createdWiki.getWikiname())
					.mainImage(null)
					.sections(sectionList)
					.build();
		
		ObjectMapper objMap = new ObjectMapper();
		String content = objMap.writeValueAsString(contentObject);
		
		System.out.println("Length of content: " + content.length() + "\n\n");
		System.out.println("Content itself: \n" + content);

	
		Article mainArticle = Article.builder()

		
		articleRepository.save(mainArticle);
	}*/

}
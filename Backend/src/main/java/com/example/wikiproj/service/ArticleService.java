package com.example.wikiproj.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.wikiproj.dto.ArticleDTO;
import com.example.wikiproj.dto.RevisionDTO;
import com.example.wikiproj.model.Article;
import com.example.wikiproj.model.ArticleCategory;
import com.example.wikiproj.model.ArticleTag;
import com.example.wikiproj.model.RevisionAndContent;
import com.example.wikiproj.model.User;
import com.example.wikiproj.model.Wiki;
import com.example.wikiproj.persistence.ArticleCategoryRepository;
import com.example.wikiproj.persistence.ArticleRepository;
import com.example.wikiproj.persistence.ArticleTagRepository;
import com.example.wikiproj.persistence.RevisionAndContentRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.WikiRepository;

@Service
public class ArticleService {
	
	private ArticleRepository articleRepository;
	private RevisionAndContentRepository revisionAndContentRepository;
	private WikiRepository wikiRepository;
	private UserRepository userRepository;
	private ArticleCategoryRepository articleCategoryRepository;
	private ArticleTagRepository articleTagRepository;
	
	public ArticleService(
			ArticleRepository articleRepository,
			RevisionAndContentRepository revisionAndContentRepository,
			WikiRepository wikiRepository,
			UserRepository userRepository,
			ArticleCategoryRepository articleCategoryRepository,
			ArticleTagRepository articleTagRepository
	) {
		this.articleRepository = articleRepository;
		this.revisionAndContentRepository = revisionAndContentRepository;
		this.wikiRepository = wikiRepository;
		this.userRepository = userRepository;
		this.articleCategoryRepository = articleCategoryRepository;
		this.articleTagRepository = articleTagRepository;
	}

	public ArticleDTO selectArticle(Long articleId) {
		Article foundArticle = articleRepository.findById(articleId).get();
		return formingDTO(foundArticle);
	}
	
	public ArticleDTO selectArticleByWikinameAndTitle(String wikiname, String title) {
		try {
			String normalizedWikiname = wikiname.trim().toLowerCase().replace('-', ' ');
			String normalizedTitle = title.trim().toLowerCase().replace('-', ' ');
			
			System.out.println("we've normalized wikiname and title");
			System.out.println("norWikiname: " + normalizedWikiname);
			System.out.println("norTitle: " + normalizedTitle + "\n\n");
			
			Wiki foundWiki = wikiRepository.findByWikiname(normalizedWikiname);
			
			System.out.println("we've found the wiki by wikiname");
			System.out.println("wiki: " + foundWiki.getWikiname() + "\n\n");
			
			Article foundArticle = 
				articleRepository
					.findByWikiAndTitle(
							foundWiki,
							normalizedTitle
					);
			
			System.out.println("we've found the article");
			System.out.println("foundArticle: " + foundArticle.getContent() + "\n\n");
		
			if (foundArticle == null)
				throw new RuntimeException("Article Fetching Failed");
			else 
				return formingDTO(foundArticle);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public ArticleDTO insertArticle(ArticleDTO articleDTO) {
		try {
			Wiki foundWiki = wikiRepository.findByWikiname(articleDTO.getWikiname());
			if (foundWiki == null)
				 throw new RuntimeException("Wiki Does Not Exist");
			
			System.out.println("\nWe've entered the 'insertArticle'\n");
			
			Article article = Article.builder()
									.wiki(foundWiki)
									.title(articleDTO.getTitle())
									.content(articleDTO.getContent())
									.authors(listingStringToUser(articleDTO.getAuthors()))
									.categories(listingStringToCategory(articleDTO.getCategories()))
									.tags(listingStringToTag(articleDTO.getTags()))
									.build();
			
			System.out.println("\nWe've done with building an Article entity\n");
			
			Article insertedArticle = articleRepository.save(article);
			
			System.out.println("\nWe've done with calling 'save(article)'\n");
			
			
			newRevisionAndContent(insertedArticle);
			return formingDTO(insertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}

	public ArticleDTO updateArticle(ArticleDTO articleDTO) {
		try {
			Wiki foundWiki = wikiRepository.findByWikiname(articleDTO.getWikiname());
			if (foundWiki == null)
				throw new RuntimeException("Wiki Does Not Exist");
			if (articleRepository.findById(articleDTO.getArticleId()).isEmpty())
				throw new RuntimeException("Article Does Not Exist");
			Article article = Article.builder()
									.wiki(foundWiki)
									.title(articleDTO.getTitle())
									.content(articleDTO.getContent())
									.authors(listingStringToUser(articleDTO.getAuthors()))
									.categories(listingStringToCategory(articleDTO.getCategories()))
									.tags(listingStringToTag(articleDTO.getTags()))
									.build();
			Article updatedArticle = articleRepository.save(article);
			newRevisionAndContent(updatedArticle);
			return formingDTO(updatedArticle);
		} catch (Exception e) {
			throw e;
		}
	}

	public String deleteArticle(Long articleId) {
		try {
			Optional<Article> foundArticle = articleRepository.findById(articleId);
			if (foundArticle.isEmpty()) return null;
			articleRepository.delete(foundArticle.get());
			return "Article Successfully Deleted.";
		} catch (Exception e) {
			throw e;
		}
	}

	
	// ArticleDTO from the Article entity
	private ArticleDTO formingDTO(Article article) {
		try {
			ArticleDTO articleDTO = ArticleDTO.builder()
					.articleId(article.getArticleId())
					.wikiname(article.getWiki().getWikiname())
					.title(article.getTitle())
					.content(article.getContent())
					.authors(listingUserToString(article.getAuthors()))
					.categories(listingCategoryToString(article.getCategories()))
					.tags(listingTagToString(article.getTags()))
					.build();
			return articleDTO;
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	// listing methods
	private List<String> listingUserToString(List<User> authors) {
		try {
			List<String> resList = new ArrayList<>();
			for (User user : authors)
				resList.add(user.getUsername());
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<User> listingStringToUser(List<String> authors) {
		try {
			List<User> resList = new ArrayList<>();
			for (String user : authors)
				resList.add(userRepository.findByUsername(user));
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<String> listingCategoryToString(List<ArticleCategory> cates) {
		try {
			List<String> resList = new ArrayList<>();
			for (ArticleCategory c : cates)
				resList.add(c.getCategoryName());
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<ArticleCategory> listingStringToCategory(List<String> cates) {
		try {
			if (cates.isEmpty())
				return null;
			
			List<ArticleCategory> resList = new ArrayList<>();
			for (String c : cates)
				resList.add(articleCategoryRepository.findByCategoryName(c));
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<String> listingTagToString(List<ArticleTag> tags) {
		try {
			List<String> resList = new ArrayList<>();
			for (ArticleTag t : tags)
				resList.add(t.getTagName());
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<ArticleTag> listingStringToTag(List<String> tags) {
		try {
			if (tags.isEmpty())
				return null;
			
			List<ArticleTag> resList = new ArrayList<>();
			for (String t : tags)
				resList.add(articleTagRepository.findByTagName(t));
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	// revision and content handling
	private void newRevisionAndContent(Article article) {
		try {
			RevisionAndContent rac = RevisionAndContent.builder()
										.article(article)
										.wiki(article.getWiki())
										.author(article.getAuthors())
										.title(article.getTitle())
										.content(article.getContent())
										.categories(article.getCategories())
										.tags(article.getTags())
										.build();
			revisionAndContentRepository.save(rac);
		} catch (Exception e) {
			throw e;
		}
	}

	public ArticleDTO revertArticle(RevisionDTO revisionDTO) {
		try {
			RevisionAndContent rac = revisionAndContentRepository.findById(revisionDTO.getId()).get();
			
			Article article = Article.builder()
					.articleId(rac.getArticle().getArticleId())
					.wiki(rac.getWiki())
					.title(rac.getTitle())
					.content(rac.getContent())
					.authors(rac.getAuthor())
					.categories(rac.getCategories())
					.tags(rac.getTags())
					.build();
			
			newRevisionAndContent(article);
			
			Article revertedArticle = articleRepository.save(article);
			return formingDTO(revertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}

	public List<RevisionDTO> revisionHistory(Long articleId) {
		try {
			List<Long> list = new ArrayList<>();
			list.add(articleId);
			List<RevisionAndContent> res = revisionAndContentRepository.findAllById(list);
			List<RevisionDTO> resDTO = new ArrayList<>();
			
			for (RevisionAndContent rac : res) {
				RevisionDTO dto = RevisionDTO.builder()
									.id(rac.getId())
									.articleId(rac.getArticle().getArticleId())
									.authors(listingUserToString(rac.getAuthor()))
									.title(rac.getTitle())
									.content(rac.getContent())
									.build();
				resDTO.add(dto);	
			}
			
			return resDTO;
		} catch (Exception e) {
			throw e;
		}
	}
	
}

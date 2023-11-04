package com.example.wikiproj.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.wikiproj.dto.ArticleDTO;
import com.example.wikiproj.dto.RevisionDTO;
import com.example.wikiproj.model.Article;
import com.example.wikiproj.model.ArticleAuthors;
import com.example.wikiproj.model.ArticleCategories;
import com.example.wikiproj.model.ArticleTags;
import com.example.wikiproj.model.Category;
import com.example.wikiproj.model.RACAuthors;
import com.example.wikiproj.model.RACCategories;
import com.example.wikiproj.model.RACTags;
import com.example.wikiproj.model.Tag;
import com.example.wikiproj.model.RevisionAndContent;
import com.example.wikiproj.model.User;
import com.example.wikiproj.model.Wiki;
import com.example.wikiproj.persistence.CategoryRepository;
import com.example.wikiproj.persistence.RACAuthorsRepository;
import com.example.wikiproj.persistence.RACCategoriesRepository;
import com.example.wikiproj.persistence.RACTagsRepository;
import com.example.wikiproj.persistence.ArticleAuthorsRepository;
import com.example.wikiproj.persistence.ArticleCategoriesRepository;
import com.example.wikiproj.persistence.ArticleRepository;
import com.example.wikiproj.persistence.ArticleTagsRepository;
import com.example.wikiproj.persistence.TagRepository;
import com.example.wikiproj.persistence.RevisionAndContentRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.WikiRepository;

/*
	> I just don't know about this code. Is this the best 
	that I can do to manage things? Excessively verbose and cumbersome;
	which are exactly the states that I should avoid when writing code.
	
	But I'm not sure just yet. Maybe there is no way other than writing
	hundreds of long lines. IWAAIL.
	
	
	> Is there a way to use the stream API to convert lists and entities 
	that are used within this class into something demanded?
	Maybe, if the relationship and other stuff were less convoluted then 
	we could have done something like that; but the entities are not 
	that simple.
	
	> 

*/


@Service
public class ArticleService {
	
	private ArticleRepository articleRepository;
	private RevisionAndContentRepository revisionAndContentRepository;
	private WikiRepository wikiRepository;
	private UserRepository userRepository;
	private CategoryRepository categoryRepository;
	private TagRepository tagRepository;
	private ArticleCategoriesRepository articleCategoriesRepository;
	private ArticleTagsRepository articleTagsRepository;
	private RACCategoriesRepository racCategoriesRepository;
	private RACTagsRepository racTagsRepository;
	
	public ArticleService(
			ArticleRepository articleRepository,
			RevisionAndContentRepository revisionAndContentRepository,
			WikiRepository wikiRepository,
			UserRepository userRepository,
			CategoryRepository categoryRepository,
			TagRepository tagRepository,
			ArticleCategoriesRepository articleCategoriesRepository,
			ArticleTagsRepository articleTagsRepository,
			RACCategoriesRepository racCategoriesRepository,
			RACTagsRepository racTagsRepository
	) {
		this.articleRepository = articleRepository;
		this.revisionAndContentRepository = revisionAndContentRepository;
		this.wikiRepository = wikiRepository;
		this.userRepository = userRepository;
		this.categoryRepository = categoryRepository;
		this.tagRepository = tagRepository;
		this.articleCategoriesRepository = articleCategoriesRepository;
		this.articleTagsRepository = articleTagsRepository;
		this.racCategoriesRepository = racCategoriesRepository;
		this.racTagsRepository = racTagsRepository;
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
									.lastEditor(userRepository.findByUsername(articleDTO.getLastEditor()))
									.content(articleDTO.getContent())
									.build();

			Article insertedArticle = articleRepository.save(article);

			// many to many handling of authors/cates/tags
			insertedArticle = settingAuthorsCategoriesTagsAfterInsertion(insertedArticle, articleDTO);
			
			newRevisionAndContent(insertedArticle);
			return formingDTO(insertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public Article settingAuthorsCategoriesTagsAfterInsertion(Article insertedArticle, ArticleDTO articleDTO) {
		try {
			insertedArticle.setArticleCategories(listingArticleCategories(insertedArticle, articleDTO));
			insertedArticle.setArticleTags(listingArticleTags(insertedArticle, articleDTO));
			return articleRepository.save(insertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}

	public ArticleDTO updateArticle(ArticleDTO articleDTO) {
		try {
			Wiki foundWiki = wikiRepository.findByWikiname(articleDTO.getWikiname());
			if (foundWiki == null)
				throw new RuntimeException("Wiki Does Not Exist");
			
			Optional<Article> founded = articleRepository.findById(articleDTO.getArticleId());
			Article article = null;
			if (founded.isEmpty())
				throw new RuntimeException("Article Does Not Exist");
			else
				article = founded.get();
			
			article.setContent(articleDTO.getContent());
			article.setLastEditor(userRepository.findByUsername(articleDTO.getLastEditor()));
			article.setArticleCategories(listingArticleCategories(article, articleDTO));
			article.setArticleTags(listingArticleTags(article, articleDTO));
			
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
	
	
	
	
	
	// revision and content handling
	private void newRevisionAndContent(Article article) {
		try {
			RevisionAndContent rac = RevisionAndContent.builder()
										.article(article)
										.wiki(article.getWiki())
										.title(article.getTitle())
										.editor(article.getLastEditor())
										.content(article.getContent())
										.build();
			
			RevisionAndContent insertedRac = revisionAndContentRepository.save(rac);

			insertedRac.setRevisionAndContentCategories(listingRACCategories(insertedRac, article.getArticleCategories()));
			insertedRac.setRevisionAndContentTags(listingRACTags(insertedRac, article.getArticleTags()));
			
			revisionAndContentRepository.save(insertedRac);
		} catch (Exception e) {
			throw e;
		}
	}
	
	/*
		> I ought to find a way to record whether the current version of an article
		is done by reverting or not; but that should be suspended until the overall
		development process is complete.
		IWAAIL.
	
	*/

	public ArticleDTO revertArticle(RevisionDTO revisionDTO) {
		try {
			RevisionAndContent rac = revisionAndContentRepository.findById(revisionDTO.getId()).get();
			
			List<ArticleCategories> 
			
			
			// Is this way of handling ID OK?
			Article article = Article.builder()
					.articleId(rac.getArticle().getArticleId())
					.wiki(rac.getWiki())
					.title(rac.getTitle())
					.content(rac.getContent())
					.lastEditor()
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

	
	
	
	
	// ArticleDTO from the Article entity
	private ArticleDTO formingDTO(Article article) {
		try {
			ArticleDTO articleDTO = ArticleDTO.builder()
					.articleId(article.getArticleId())
					.wikiname(article.getWiki().getWikiname())
					.title(article.getTitle())
					.content(article.getContent())
					.authors(listingStringAuthors(article))
					.categories(listingStringCategories(article))
					.tags(listingStringTags(article))
					.build();
			return articleDTO;
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	
	
	
	
	// listing methods
	
	private List<ArticleCategories> listingArticleCategories(Article ent, ArticleDTO dto) {
		try {
			if (dto.getCategories().isEmpty())
				return null;
			
			List<ArticleCategories> resList = new ArrayList<>();
			for (String cate : dto.getCategories()) {
				ArticleCategories ac = ArticleCategories.builder()
										.article(ent)
										.category(categoryRepository.findByCategoryName(cate))
										.build();
				resList.add(articleCategoriesRepository.save(ac));
			}
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<ArticleTags> listingArticleTags(Article ent, ArticleDTO dto) {
		try {
			if (dto.getTags().isEmpty())
				return null;
			
			List<ArticleTags> resList = new ArrayList<>();
			for (String tgs : dto.getTags()) {
				ArticleTags at = ArticleTags.builder()
										.article(ent)
										.tag(tagRepository.findByTagName(tgs))
										.build();
				resList.add(articleTagsRepository.save(at));
			}
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<String> listingStringAuthors(Article ent) {
		try {
			List<String> resList = new ArrayList<>();
			for (ArticleAuthors aa : ent.getArticleAuthors()) {
				resList.add(aa.getUser().getUsername());
			}
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<String> listingStringCategories(Article ent) {
		try {
			List<String> resList = new ArrayList<>();
			for (ArticleCategories ac : ent.getArticleCategories()) {
				resList.add(ac.getCategory().getCategoryName());
			}
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<String> listingStringTags(Article ent) {
		try {
			List<String> resList = new ArrayList<>();
			for (ArticleTags at : ent.getArticleTags()) {
				resList.add(at.getTag().getTagName());
			}
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}
	
	private List<RACCategories> listingRACCategories(RevisionAndContent rac, List<ArticleCategories> cates) {
		try {
			List<RACCategories> resList = new ArrayList<>();
			for (ArticleCategories ac : cates) {
				RACCategories racCate = RACCategories.builder()
										.revision_and_content(rac)
										.category(ac.getCategory())
										.build();
				
				resList.add(racCategoriesRepository.save(racCate));
			}
			
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}

	private List<RACTags> listingRACTags(RevisionAndContent rac, List<ArticleTags> tags) {
		try {
			List<RACTags> resList = new ArrayList<>();
			for (ArticleTags at : tags) {
				RACTags racTags = RACTags.builder()
									.revision_and_content(rac)
									.tag(at.getTag())
									.build();
				
				resList.add(racTagsRepository.save(racTags));
			}
			
			return resList;
		} catch (Exception e) {
			throw e;
		}
	}


}

package com.example.wikiproj.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.Article;
import com.example.wikiproj.domain.ArticleCategories;
import com.example.wikiproj.domain.ArticleTags;
import com.example.wikiproj.domain.RACCategories;
import com.example.wikiproj.domain.RACTags;
import com.example.wikiproj.domain.RevisionAndContent;
import com.example.wikiproj.domain.Wiki;
import com.example.wikiproj.dto.ArticleDTO;
import com.example.wikiproj.dto.RevisionDTO;
import com.example.wikiproj.persistence.CategoryRepository;
import com.example.wikiproj.persistence.RACCategoriesRepository;
import com.example.wikiproj.persistence.RACTagsRepository;
import com.example.wikiproj.persistence.ArticleCategoriesRepository;
import com.example.wikiproj.persistence.ArticleRepository;
import com.example.wikiproj.persistence.ArticleTagsRepository;
import com.example.wikiproj.persistence.TagRepository;
import com.example.wikiproj.persistence.RevisionAndContentRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.WikiRepository;

import lombok.AllArgsConstructor;

/*	NOTE
	-> I just don't know about this code. Is this the best 
	that I can do to manage things? Excessively verbose and cumbersome;
	which are exactly the states that I should avoid when writing code.
	
	But I'm not sure just yet. Maybe there is no way other than writing
	hundreds of long lines. IWAAIL.
	
	-> Is there a way to use the stream API to convert lists and entities 
	that are used within this class into something demanded now?
	Maybe, if the relationship and other stuff were less convoluted then 
	we could have done something like that; but the entities are not 
	that simple.
	
	-> What about just using @AllArgsConstructor instead of writing every 
	required dependency?

*/

/*	TODO

*/

@Service
@AllArgsConstructor
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
	
	public ArticleDTO selectArticle(Long articleId) {
		Article foundArticle = articleRepository.findById(articleId).get();
		return formingArticleDTO(foundArticle);
	}
	
	public ArticleDTO selectArticleByWikinameAndTitle(String wikiname, String title) {
		try {
			String normalizedWikiname = wikiname.trim().toLowerCase().replace('-', ' ');
			String normalizedTitle = title.trim().toLowerCase().replace('-', ' ');
			
			Wiki foundWiki = wikiRepository.findByWikiname(normalizedWikiname);
			
			Article foundArticle = 
				articleRepository
					.findByWikiAndTitle(
							foundWiki,
							normalizedTitle
					);
		
			if (foundArticle == null)
				throw new RuntimeException("Article Fetching Failed");
			else 
				return formingArticleDTO(foundArticle);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public ArticleDTO insertArticle(ArticleDTO articleDTO) {
		try {
			Wiki foundWiki = wikiRepository.findByWikiname(articleDTO.getWikiname());
			if (foundWiki == null)
				 throw new RuntimeException("Wiki Does Not Exist");
			
			Article article = Article.builder()
									.wiki(foundWiki)
									.title(articleDTO.getTitle())
									.lastEditor(userRepository.findByUsername(articleDTO.getLastEditor()))
									.content(articleDTO.getContent())
									.build();
			
			Article insertedArticle = articleRepository.save(article);
			
			// many to many handling of authors/cates/tags
			insertedArticle = settingAuthorsCategoriesTagsAfterInsertion(insertedArticle, articleDTO);
			
			newRevisionAndContent(insertedArticle, articleDTO.getVersionMemo(), "inserted");
			
			return formingArticleDTO(insertedArticle);
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
			
			newRevisionAndContent(updatedArticle, articleDTO.getVersionMemo(), "updated");
			return formingArticleDTO(updatedArticle);
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
	private void newRevisionAndContent(Article article, String versionMemo, String versionType) {
		try {
			RevisionAndContent rac = RevisionAndContent.builder()
										.article(article)
										.wiki(article.getWiki())
										.title(article.getTitle())
										.editor(article.getLastEditor())
										.content(article.getContent())
										.versionMemo(versionMemo)
										.versionType(versionType)
										.build();
			
			RevisionAndContent insertedRac = revisionAndContentRepository.save(rac);
			
			insertedRac.setRevisionAndContentCategories(listingRACCategories(insertedRac, article.getArticleCategories()));
			
			insertedRac.setRevisionAndContentTags(listingRACTags(insertedRac, article.getArticleTags()));
			
			revisionAndContentRepository.save(insertedRac);
		} catch (Exception e) {
			throw e;
		}
	}
	

	public ArticleDTO revertArticle(RevisionDTO revisionDTO) {
		try {
			Article existingArticle = articleRepository.findById(revisionDTO.getArticleId()).get();

			articleCategoriesRepository.deleteAllByArticle(existingArticle);
			articleTagsRepository.deleteAllByArticle(existingArticle);
			
			RevisionAndContent rac = revisionAndContentRepository.findById(revisionDTO.getId()).get();
			
			List<ArticleCategories> revertCates = new ArrayList<>();
			List<ArticleTags> revertTags = new ArrayList<>();
			
			for (RACCategories racc : rac.getRevisionAndContentCategories()) {
				ArticleCategories ac = ArticleCategories.builder()
												.article(existingArticle)
												.category(racc.getCategory())
												.build();
				
				articleCategoriesRepository.save(ac);
				
				revertCates.add(ac);
			}
			
			for (RACTags ract : rac.getRevisionAndContentTags()) {
				ArticleTags at = ArticleTags.builder()
											.article(existingArticle)
											.tag(ract.getTag())
											.build();
				
				articleTagsRepository.save(at);
				
				revertTags.add(at);
			}
			
			// Is this way of handling ID OK?
			existingArticle.setTitle(rac.getTitle());
			existingArticle.setContent(rac.getContent());
			existingArticle.setLastEditor(userRepository.findByUsername(revisionDTO.getEditorOrReverter()));
			existingArticle.setArticleCategories(revertCates);
			existingArticle.setArticleTags(revertTags);
			
			Article revertedArticle = articleRepository.save(existingArticle);

			newRevisionAndContent(revertedArticle, revisionDTO.getVersionMemo(), "reverted");
			
			return formingArticleDTO(revertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}

	public List<RevisionDTO> revisionHistory(Long articleId) {
		try {
			Article foundArticle = articleRepository.findById(articleId).get();

			List<RevisionAndContent> racList = revisionAndContentRepository.findAllByArticle(foundArticle);
			List<RevisionDTO> resDTO = new ArrayList<>();
			
			for (RevisionAndContent rac : racList) {
				RevisionDTO dto = RevisionDTO.builder()
									.id(rac.getId())
									.articleId(articleId)
									.editorOrReverter(rac.getEditor().getUsername())
									.title(rac.getTitle())
									.content(rac.getContent())
									.versionMemo(rac.getVersionMemo())
									.build();
				resDTO.add(dto);	
			}
			
			return resDTO;
		} catch (Exception e) {
			throw e;
		}
	}

	
	
	
	
	// ArticleDTO from the Article entity
	private ArticleDTO formingArticleDTO(Article article) {
		try {
			ArticleDTO articleDTO = ArticleDTO.builder()
					.articleId(article.getArticleId())
					.wikiname(article.getWiki().getWikiname())
					.title(article.getTitle())
					.content(article.getContent())
					.lastEditor(article.getLastEditor().getUsername())
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
			if (dto.getCategories() == null || dto.getCategories().isEmpty())
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
			if (dto.getTags() == null || dto.getTags().isEmpty())
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
	
	
	private List<String> listingStringCategories(Article ent) {
		try {
			if (ent.getArticleCategories() == null || ent.getArticleCategories().isEmpty())
				return null;
			
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
			if (ent.getArticleTags() == null || ent.getArticleTags().isEmpty())
				return null;
			
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
			if (cates == null || cates.isEmpty())
				return null;
			
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
			if (tags == null || tags.isEmpty())
				return null;
			
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

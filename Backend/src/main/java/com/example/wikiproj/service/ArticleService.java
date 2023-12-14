package com.example.wikiproj.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.Article;
import com.example.wikiproj.domain.ArticleCategories;
import com.example.wikiproj.domain.ArticleTags;
import com.example.wikiproj.domain.NotificationMessage;
import com.example.wikiproj.domain.RACCategories;
import com.example.wikiproj.domain.RACTags;
import com.example.wikiproj.domain.RevisionAndContent;
import com.example.wikiproj.domain.User;
import com.example.wikiproj.domain.Wiki;
import com.example.wikiproj.dto.ArticleDTO;
import com.example.wikiproj.dto.RevisionDTO;
import com.example.wikiproj.persistence.CategoryRepository;
import com.example.wikiproj.persistence.NotificationMessageRepository;
import com.example.wikiproj.persistence.RACCategoriesRepository;
import com.example.wikiproj.persistence.RACTagsRepository;
import com.example.wikiproj.persistence.ArticleCategoriesRepository;
import com.example.wikiproj.persistence.ArticleRepository;
import com.example.wikiproj.persistence.ArticleTagsRepository;
import com.example.wikiproj.persistence.TagRepository;
import com.example.wikiproj.persistence.RevisionAndContentRepository;
import com.example.wikiproj.persistence.UserRepository;
import com.example.wikiproj.persistence.UserWikiStatusRepository;
import com.example.wikiproj.persistence.WikiRepository;

import lombok.AllArgsConstructor;

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
	private UserWikiStatusRepository userWikiStatusRepository;
	private NotificationMessageRepository notificationMessageRepository;

	public ArticleDTO selectArticle(Long articleId) {
		Article foundArticle = articleRepository.findById(articleId).get();
		return formingArticleDTO(foundArticle);
	}
	
	@Transactional
	public ArticleDTO selectArticleByWikinameAndTitle(String wikiname, String title) {
		try {
			// Although the wikiname will be searched with ignored case,
			// the title will be searched with exact case.
			String normalizedWikiname = wikiname.trim().replace('-', ' ');
			String normalizedTitle = title.trim().replace('-', ' ');
			
			Wiki foundWiki = wikiRepository.findByWikinameIgnoreCase(normalizedWikiname);
			
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
	
	@Transactional
	public ArticleDTO insertArticle(ArticleDTO articleDTO) {
		try {
			String normalizedWikiname = articleDTO.getWikiname().trim().replace('-', ' ');
			
			Wiki foundWiki = wikiRepository.findByWikinameIgnoreCase(normalizedWikiname);
			
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
			
			sendingMessage(
					foundWiki, 
					
					"A new article \"" + 
					insertedArticle.getTitle() + 
					"\" is made in the following wiki: " + 
					foundWiki.getWikiname(),
					"/wiki/" + 
					foundWiki.getWikiname()
							.replace(' ', '-') +
					"/" + 
					insertedArticle
						.getTitle().replace(' ', '-')
				); 
			
			return formingArticleDTO(insertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional
	public Article settingAuthorsCategoriesTagsAfterInsertion(Article insertedArticle, ArticleDTO articleDTO) {
		try {
			insertedArticle.setArticleCategories(listingArticleCategories(insertedArticle, articleDTO));
			insertedArticle.setArticleTags(listingArticleTags(insertedArticle, articleDTO));
			return articleRepository.save(insertedArticle);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional
	public ArticleDTO updateArticle(ArticleDTO articleDTO) {
		try {
			String normalizedWikiname = articleDTO.getWikiname().trim().replace('-', ' ');
			Wiki foundWiki = wikiRepository.findByWikinameIgnoreCase(normalizedWikiname);
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
			Article fa = foundArticle.get();
			articleRepository.delete(fa);

			sendingMessage(
					fa.getWiki(), 
					"The article \"" + 
							fa.getTitle() + 
					"\" is deleted from the following wiki: " +
					fa.getWiki().getWikiname(),
					"/wiki/" + fa.getWiki().getWikiname()
				);
			
			return "Article Successfully Deleted.";
		} catch (Exception e) {
			throw e;
		}
	}

	@Transactional
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
	
	@Transactional
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
	
	@Transactional
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
	
	@Transactional
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
	
	@Transactional
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

	@Transactional
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
	
	// Sending messages to users involved in this wiki's editor group
	@Transactional	
	private void sendingMessage(Wiki wiki, String message, String where) {
		try {
			List<User> editors = userWikiStatusRepository
									.findAllByWiki(wiki)
									.stream()
									.map(status -> status.getUser())
									.collect(Collectors.toList());
			
			NotificationMessage nm = NotificationMessage.builder()
												.message(message)
												.wiki(wiki)
												.where(where)
												.build();
			
			for (User u : editors) {
				nm.setRecipient(u);
				notificationMessageRepository.save(nm);
			}
		} catch (Exception e) {
			throw e;
		}
	}

}

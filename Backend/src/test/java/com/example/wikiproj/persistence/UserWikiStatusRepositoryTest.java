package com.example.wikiproj.persistence;

import java.util.List;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.example.wikiproj.domain.User;
import com.example.wikiproj.domain.UserWikiStatus;
import com.example.wikiproj.domain.Wiki;

//@ExtendWith(SpringExtension.class)
@DataJpaTest
public class UserWikiStatusRepositoryTest {
	
	@Autowired
	private UserWikiStatusRepository userWikiStatusRepository;

	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	void findByWikiTest() {
		// Given
		User user1 = User.builder()
						.username("qwer")
						.password("qwer")
						.email("qwer@qwer.com")
						.build();
		User user2 = User.builder()
						.username("asdf")
						.password("asdf")
						.email("asdf@asdf.com")
						.build();
		User user3 = User.builder()
						.username("zxcv")
						.password("zxcv")
						.email("zxcv@zxcv.com")
						.build();
		Wiki wiki = Wiki.builder()
						.wikiname("Test Wiki")
						.build();
		entityManager.persist(user1);
		entityManager.persist(user2);
		entityManager.persist(user3);
		entityManager.persist(wiki);
		
		UserWikiStatus uws1 = UserWikiStatus.builder()
									.user(user1)
									.wiki(wiki)
									.status("proponent")
									.build();
		UserWikiStatus uws2 = UserWikiStatus.builder()
									.user(user2)
									.wiki(wiki)
									.status("editor")
									.build();
		UserWikiStatus uws3 = UserWikiStatus.builder()
									.user(user3)
									.wiki(wiki)
									.status("editor")
									.build();
		entityManager.persist(uws1);
		entityManager.persist(uws2);
		entityManager.persist(uws3);
		
		// When
		List<UserWikiStatus> allStatusByWiki = userWikiStatusRepository.findByWiki(wiki);
		
		// Then
		Assertions.assertThat(allStatusByWiki).contains(uws1, uws2, uws3);
	}

}

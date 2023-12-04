package com.example.wikiproj.persistence;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.wikiproj.domain.User;

@DataJpaTest
public class UserRepositoryTest {
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	void findByUsernameTest() {
		
		User user = User.builder()
						.username("qwer")
						.password("qwer")
						.email("qwer@qwer.com")
						.build();
		
		User savedUser = userRepository.saveAndFlush(user);
		
		User foundUser = userRepository.findByUsername(savedUser.getUsername());
		
		Assertions.assertEquals(user.getUsername(), foundUser.getUsername());
		Assertions.assertEquals(user.getPassword(), foundUser.getPassword());
		Assertions.assertEquals(user.getEmail(), foundUser.getEmail());
		
	}
	

}

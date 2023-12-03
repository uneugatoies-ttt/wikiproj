package com.example.wikiproj.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.wikiproj.domain.User;
import com.example.wikiproj.persistence.UserRepository;

@ExtendWith(SpringExtension.class)
@Import({UserService.class})
public class UserServiceTestWithMockBean {
	
	@MockBean
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@Test
	void testGetByCredentials() {
		PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		
		Mockito.when(userRepository.findByUsername("qwer"))
				.thenReturn(User.builder()
							.id("ID for qwer")
							.username("qwer")
							.password(passwordEncoder.encode("qwer"))
							.email("qwer@qwer.com")
							.build()
						);
		
		User userFromService = userService.getByCredentials("qwer", "qwer", passwordEncoder);
		
		Assertions.assertNotNull(userFromService);
		Assertions.assertEquals("ID for qwer", userFromService.getId());
		Assertions.assertEquals("qwer", userFromService.getUsername());
		Assertions.assertTrue(passwordEncoder.matches("qwer", userFromService.getPassword()));
		Assertions.assertEquals("qwer@qwer.com", userFromService.getEmail());
	}

}

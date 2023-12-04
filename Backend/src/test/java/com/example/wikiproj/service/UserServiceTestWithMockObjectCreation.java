package com.example.wikiproj.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.wikiproj.domain.User;
import com.example.wikiproj.persistence.UserRepository;

import static org.mockito.ArgumentMatchers.any;

public class UserServiceTestWithMockObjectCreation {
	
	private UserRepository userRepository = Mockito.mock(UserRepository.class);
	private UserService userService;
	
	@BeforeEach
	public void setUp() {
		userService = new UserService(userRepository);
	}
	
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
		Assertions.assertEquals(userFromService.getId(), "ID for qwer");
		Assertions.assertEquals(userFromService.getUsername(), "qwer");
		Assertions.assertTrue(passwordEncoder.matches("qwer", userFromService.getPassword()));
		Assertions.assertEquals(userFromService.getEmail(), "qwer@qwer.com");
		
		Mockito.verify(userRepository).findByUsername("qwer");
	}
	
	@Test
	void testCreate() {
		PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		
		Mockito.when(userRepository.save(any(User.class)))
				.thenAnswer(invocation -> {
					return User.builder()
								.id("ID for qwer")
								.username("qwer")
								.password(passwordEncoder.encode("qwer"))
								.email("qwer@qwer.com")
								.build();
				});
		
		User user = User.builder()
						.username("qwer")
						.password(passwordEncoder.encode("qwer"))
						.email("qwer@qwer.com")
						.build();
		
		User createdUser = userService.create(user);
		
		Assertions.assertNotNull(createdUser);
		Assertions.assertEquals(createdUser.getId(), "ID for qwer");
		Assertions.assertEquals(createdUser.getUsername(), "qwer");
		Assertions.assertTrue(passwordEncoder.matches("qwer", createdUser.getPassword()));
		Assertions.assertEquals(createdUser.getEmail(), "qwer@qwer.com");
		
		Mockito.verify(userRepository).save(any());
	}
	
}

package com.example.wikiproj.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.example.wikiproj.domain.User;
import com.example.wikiproj.dto.UserDTO;
import com.example.wikiproj.security.TokenProvider;
import com.example.wikiproj.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;


/*
	-> The goal for this test is:
		-> ensuring that the web layer is functioning as expected.
		
	-> Focus on testing the behavior of the controller methods 
	and interactions with the underlying services.
*/

@WebMvcTest(UserController.class)
public class UserControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private UserService userService;
	
	@MockBean
	private TokenProvider tokenProvider;
	
	@MockBean
	private PasswordEncoder encoder;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	@DisplayName("Test for userAuthentication()")
	void testUserAuthentication() throws Exception {
		
		// Setting up mock behavior
		when(userService.getByCredentials("qwer", "qwer", encoder))
			.thenReturn(
					User.builder()
						.id("SomeID")
						.username("qwer")
						.password("qwer")
						.email("qwer@qwer.com")
						.build()
			);
		
		UserDTO userDTO = UserDTO.builder()
								.username("qwer")
								.password("qwer")
								.build();
		
		// Performing the request
		mockMvc.perform(post("/auth/signin")
						.contentType("application/json")
						.content(objectMapper.writeValueAsString(userDTO))
				)
		
		// Asserting the expected properties of the response
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value("SomeID"))
				.andExpect(jsonPath("$.username").value("qwer"))
				.andExpect(jsonPath("$.password").exists())
				.andExpect(jsonPath("$.email").value("qwer@qwer.com"))
				.andDo(print());
		
		verify(userService).getByCredentials("qwer", "qwer", encoder);
		
	}
	
	/*
	
	@Test
	@DisplayName("Test for userAuthentication() - 2")
	void testUserAuthentication2() throws Exception {
		UserService userService2 = mock(UserService.class);
		
		// Setting up mock behavior
		when(userService2.getByCredentials("qwer", "qwer", encoder))
			.thenReturn(
					User.builder()
						.id("SomeID")
						.username("qwer")
						.password("qwer")
						.email("qwer@qwer.com")
						.build()
			);
		
		// Performing the request
		mockMvc.perform(post("/auth/signin")
						.contentType("application/json")
						.content(objectMapper.writeValueAsString(""))
				)
		// Asserting the expected properties of the response
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value("SomeID"))
				.andExpect(jsonPath("$.username").value("qwer"))
				.andExpect(jsonPath("$.password").exists())
				.andExpect(jsonPath("$.email").value("qwer@qwer.com"))
				.andDo(print());
		
		verify(userService2).getByCredentials("qwer", "qwer", encoder);
	}
	
	@Test
	public void testUserAuthenticationFailure() throws Exception {
		
	}*/

}

package com.example.wikiproj.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
	
	-> The decision to mock or not (i.e., to use 'when'/'given' or not)
	depends on your testing goals and the desired level of isolation
	between the components...

	So for example, if your UserService methods are expected to behave as
	they are implemented, and you want to test the integration between your
	controller and service layer, then using the actual implementations without
	mocking could be appropriate.
	
	But if you have complex logic within your service layer that you want to
	isolate and focus only on testing the controller's behavior, you may choose
	to mock the service using 'when' and 'given' to control (or to define)
	the behavior of the service methods.
	
	BUT THIS IS NOT FULLY CONFIRMED YET. IWAAIL

*/

@WebMvcTest(UserController.class)
public class UserControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private WebApplicationContext webApplicationContext;
	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private UserService userService;
	@MockBean
	private TokenProvider tokenProvider;
	@MockBean
	private PasswordEncoder encoder;
	
	@BeforeEach
	void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Test
	@DisplayName("Test for userAuthenticate()")
	void testUserAuthenticate() throws Exception {

		// Setting up mock behavior
		User user = User.builder()
				.id("SomeID")
				.username("qwer")
				.password("qwer")
				.email("qwer@qwer.com")
				.build();
		Mockito.when(userService.getByCredentials("qwer", "qwer", encoder))
							.thenReturn(user);
		Mockito.when(tokenProvider.create(user))
							.thenReturn("token for this test");
		
		
		UserDTO userDTO = UserDTO.builder()
								.username("qwer")
								.password("qwer")
								.build();
		
		// Performing the request
		ResultActions result = mockMvc.perform(post("/auth/signin")
									.contentType("application/json")
									.content(objectMapper.writeValueAsString(userDTO)));
		
		// Asserting the expected properties of the response
		result.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value("SomeID"))
				.andExpect(jsonPath("$.username").value("qwer"))
				.andExpect(jsonPath("$.token").exists())
				.andDo(print());
		
		Mockito.verify(userService).getByCredentials("qwer", "qwer", encoder);
		Mockito.verify(tokenProvider).create(user);
	}
	
	/*
	 	-> Currently, I don't fully understand the behavior of this method;
	 	When I tried to build 'user' and directly give it to 'userService.create()',
	 	the result was the status 400 and there was no property in the response's JSON.
	 	On the other hand, when I used 'Mockito.any(User.class)' instead of the User object,
	 	this performed the test without any apparent problem.
	 	I have to find the cause; IWAAIL.
	*/
	@Test
	@DisplayName("Test for userRegister()")
	void testUserRegister() throws Exception {
		//

		UserDTO userDTO = UserDTO.builder()
							.username("qwer")
							.password("qwer")
							.email("qwer@qwer.com")
							.build();
		
		/*
		User user = User.builder()
							.username(userDTO.getUsername())
							.password("encoded qwer")
							.email(userDTO.getEmail())
							.build();*/
		
		User regiUser = User.builder()
							.id("ID for This Test")
							.username("qwer")
							.password("encoded qwer")
							.email("qwer@qwer.com")
							.build();
		

		Mockito.when(userService.create(Mockito.any(User.class)))
						.thenReturn(regiUser);
		
		//
		ResultActions result = mockMvc.perform(post("/auth/regi")
									.content(objectMapper.writeValueAsString(userDTO))
									.contentType(MediaType.APPLICATION_JSON));

		//
		result.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value("ID for This Test"))
				.andExpect(jsonPath("$.username").value("qwer"))
				.andDo(print());
		
		//verify(userService).create(user);
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

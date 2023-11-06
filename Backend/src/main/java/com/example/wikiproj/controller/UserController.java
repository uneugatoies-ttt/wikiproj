package com.example.wikiproj.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wikiproj.dto.ResponseDTO;
import com.example.wikiproj.dto.UserDTO;
import com.example.wikiproj.model.User;
import com.example.wikiproj.security.TokenProvider;
import com.example.wikiproj.service.UserService;

/*
	-> When the authentication is failed due to the corresponding user's absence in the database,
	I should handle this case without throwing an error; some kind of message that the frontend
	can parse so that it can redirect the user to the sign-up page.
	
*/
@RestController
@RequestMapping("/auth")
public class UserController {
	
	private UserService userService;
	private TokenProvider tokenProvider;
	private PasswordEncoder encoder;
	
	public UserController(
		UserService userService,
		TokenProvider tokenProvider,
		PasswordEncoder encoder
	) {
		this.userService = userService;
		this.tokenProvider = tokenProvider;
		this.encoder = encoder;
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> userAuthenticate(@RequestBody UserDTO userDTO) throws IOException {
		User user = userService.getByCredentials(
						userDTO.getUsername(),
						userDTO.getPassword(),
						encoder
					);
		
		if (user != null) {
			final String token = tokenProvider.create(user);
			final UserDTO responseUserDTO = UserDTO
											.builder()
											.username(user.getUsername())
											.id(user.getId())
											.token(token)
											.build();
			
			return ResponseEntity.ok().body(responseUserDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/regi")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
		try {
			if (userDTO == null || userDTO.getPassword() == null) {
				throw new RuntimeException("invalid password");
			}
			
			User user = User.builder()
									.username(userDTO.getUsername())
									.password(encoder.encode(userDTO.getPassword()))
									.email(userDTO.getEmail())
									.build();

			User regiUser = userService.create(user);
			
			UserDTO responseUserDTO = UserDTO.builder()
											.id(regiUser.getId())
											.username(regiUser.getUsername())
											.build();
			
			return ResponseEntity.ok().body(responseUserDTO);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
			
		}
	}

}

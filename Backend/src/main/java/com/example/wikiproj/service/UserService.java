package com.example.wikiproj.service;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.wikiproj.domain.User;
import com.example.wikiproj.persistence.UserRepository;

@Service
public class UserService {
	
	private UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public User getByCredentials(
		final String username,
		final String password,
		final PasswordEncoder encoder
	) {
		try {
			final User origUser = userRepository.findByUsername(username);
	
			if (
				origUser != null &&
				encoder.matches(
					password,
					origUser.getPassword()
				)
			) return origUser;
			
			return null;
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional
	public User create(final User userEntity) {
		try {
			if (userEntity == null || userEntity.getUsername() == null)
				throw new RuntimeException("Invalid arguments");
			final String username = userEntity.getUsername();
			if (userRepository.existsByUsername(username))
				throw new RuntimeException("Username already exists");
			return userRepository.save(userEntity);
		} catch (Exception e) {
			throw e;
		}
	}

	public User findByUsername(String username) {
		try {
			return userRepository.findByUsername(username);
		} catch (Exception e) {
			throw e;
		}
	}

}

package com.example.wikiproj.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wikiproj.model.User;

public interface UserRepository extends JpaRepository<User, String> {
	
	User findByUsername(String username);

	Boolean existsByUsername(String username);
	
	User findByUsernameAndPassword(String username, String password);

}

package com.example.wikiproj.security;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.wikiproj.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TokenProvider {
	
	public String create(User userEntity) throws IOException {
		final String secretKey = JwtKeyReader.readKey();
		
		Date expiryDate = Date.from(
			Instant.now().plus(1, ChronoUnit.DAYS)
		);
		
		return Jwts.builder()
				.signWith(SignatureAlgorithm.HS512, secretKey)
				.setSubject(userEntity.getId())
				.setIssuer("wikiproj")
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.compact();
	}
	
	public String create(final Authentication authentication) throws IOException {
		final String secretKey = JwtKeyReader.readKey();
		
		ApplicationOAuth2User userPrincipal = (ApplicationOAuth2User) authentication.getPrincipal();
		Date expiryDate = Date.from( 
							Instant
							.now()
							.plus(1, ChronoUnit.DAYS) 
						);
		
		return Jwts
				.builder()
				.setSubject(userPrincipal.getName())
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, secretKey)
				.compact();
	}
	
	
	public String validateAndGetUserId(String token) throws IOException {
		final String secretKey = JwtKeyReader.readKey();
		
		Claims claims = Jwts.parser()
							.setSigningKey(secretKey)
							.parseClaimsJws(token)
							.getBody();
		
		return claims.getSubject();
	}
	

}

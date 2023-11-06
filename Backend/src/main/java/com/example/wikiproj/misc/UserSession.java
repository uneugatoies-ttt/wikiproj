package com.example.wikiproj.misc;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

/* NOTE
	-> I wonder I should use sessions in this server;
	the server should conform with the principles of REST,
	one of which is statelessness.
	
	In a stateless server, sessions or cookies should not be used.
	IWAAIL.

*/

@Component
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSession {
	
	private String username;
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

}

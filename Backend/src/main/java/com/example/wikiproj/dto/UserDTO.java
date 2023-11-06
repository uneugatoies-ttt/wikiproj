package com.example.wikiproj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/* NOTE
	-> There will be cases where a list of articles 
	that a user is involved is needed; in that case,
	I should define another field that corresponds to 
	the 'User' entity's  'articlesWrittenBy' and 'racsWrittenBy'
	fields.
*/

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
	
	private String id;
	
	private String username;
	
	private String password;

	private String email;
	
	private String token;

}

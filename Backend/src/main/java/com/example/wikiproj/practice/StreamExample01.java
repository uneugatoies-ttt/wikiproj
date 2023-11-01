package com.example.wikiproj.practice;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

public class StreamExample01 {
	
	public static void main(String[] args) {
		Collection<String> collection = new ArrayList<>();
		collection.add("red");
		collection.add("left");
		collection.add("right");
		collection.add("gnarling");
		collection.add("connotation");
		collection.add("burlesque");
		collection.add("prudence");
		collection.add("reciprocal");
		collection.add("victual");
		
		int count_startwith_r = collection.stream()
											.filter(e -> e.charAt(0) == 'r')
											.collect(Collectors.toList())
											.size();
		
		System.out.println(count_startwith_r);
	}

}

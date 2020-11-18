package kr.co.shareSketchbook.security;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import lombok.Data;

public class MakeOTPCode {
	public static String makingAnyCode(int length) {
		StringBuffer code = new StringBuffer();
		Random rnd = new Random();
		for(int i=0;i<length;i++) {
			int num = rnd.nextInt(101)%3;
			switch (num) {
			case 0:
				code.append((char)((int)(rnd.nextInt(26))+65));
				break;
			case 1:
				code.append((char)((int)(rnd.nextInt(26))+97));
				break;
			default:
				code.append(rnd.nextInt(10));
				break;
			}

		}
		
		return code.toString();
	}
	
	public static HashMap<String, String> makingWordCode(int count) {
		HashMap<String, String> map = new HashMap<String, String>();
		StringBuffer word = new StringBuffer();
		StringBuffer code = new StringBuffer();
		Random rnd = new Random();
		String sourceURL = MakeOTPCode.class.getResource("").getPath();
		sourceURL = sourceURL.replaceAll("kr/co/shareSketchbook/security/", "");

		try(FileReader fr = new FileReader(sourceURL + "word.json")){
			Gson gson = new Gson();
			List<Words100> words = gson.fromJson(fr, new TypeToken<List<Words100>>(){}.getType());
			for(int i=0;i<count;i++) {
				int idx = rnd.nextInt(101);
				word.append(words.get(idx).word);
				code.append(words.get(idx).code);
			}
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		map.put("word", word.toString());
		map.put("code", code.toString());		
		return map;
	}
	public static String makingNumCode(int length) {
		StringBuffer code = new StringBuffer();
		Random rnd = new Random();
		for(int i=0;i<length;i++) {
			code.append(rnd.nextInt(10));
		}
		return code.toString();
	}

	public static String WordToCode(String wordCode) {
		StringBuffer code = new StringBuffer();

		String sourceURL = MakeOTPCode.class.getResource("").getPath();
		sourceURL = sourceURL.replaceAll("kr/co/shareSketchbook/security/", "");

		try(FileReader fr = new FileReader(sourceURL + "word.json")){
			Gson gson = new Gson();
			List<Words100> words = gson.fromJson(fr, new TypeToken<List<Words100>>(){}.getType());
			for(int i=0;i<wordCode.length()/2;i++) {
				for(int j=0;j<words.size(); j++) {
					if(words.get(j).word.equals(wordCode.substring(i*2, 2 + (i*2)))) code.append(words.get(j).code);
				}
			}
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		if(code.length() == 0) code.append("not_matched");
		return code.toString();
	}

	
	@Data
	public class Words100 {
		private int no;
		private String word;
		private String code;
		
	}
}

package kr.co.shareSketchbook.vo;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@XmlRootElement
@Data
public class UserKeyVO {
	private String userKey;
	private String password;
	private String emailId;
	private String name;
	private String nickName;
	private String gender;
	private int lv;
	private String photo;
	private int enabled;
	
}

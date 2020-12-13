package kr.co.shareSketchbook.vo;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@XmlRootElement
@Data
public class CustomVO {
	private String userKey;
	private String coverTitle;
	private String coverColor;
	private String cover;
	private String page;
	private String contents;
	private String spring;
	private String flagList;
	private String flag;
}
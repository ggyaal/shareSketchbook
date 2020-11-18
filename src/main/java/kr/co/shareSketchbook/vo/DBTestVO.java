package kr.co.shareSketchbook.vo;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@XmlRootElement
@Data
public class DBTestVO {
	private String today;
	private int sum;
	private int mul;
}

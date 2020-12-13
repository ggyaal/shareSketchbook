package kr.co.shareSketchbook.service;

import kr.co.shareSketchbook.vo.CustomVO;

public interface CustomService {
	CustomVO selectByKey(String userKey);
	boolean insertCustom(CustomVO vo);
	boolean updateCustom(CustomVO vo);
}

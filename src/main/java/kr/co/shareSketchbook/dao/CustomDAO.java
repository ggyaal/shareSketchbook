package kr.co.shareSketchbook.dao;

import kr.co.shareSketchbook.vo.CustomVO;

public interface CustomDAO {
	CustomVO selectByKey(String userKey);
	void insertCustom(CustomVO vo);
	void updateCustom(CustomVO vo);
}

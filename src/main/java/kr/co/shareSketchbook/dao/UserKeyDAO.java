package kr.co.shareSketchbook.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.shareSketchbook.vo.UserKeyVO;

public interface UserKeyDAO {
	List<UserKeyVO> selectByIt(HashMap<String, String> map);
	void insertKey(UserKeyVO vo);
	void updateKey(UserKeyVO vo);
	void deleteKey(String userKey);
	HashMap<String, String> selectKeyAuth(String userKey);
	void insertKeyAuth(HashMap<String, String> map);
	void updateKeyAuth(HashMap<String, String> map);
}

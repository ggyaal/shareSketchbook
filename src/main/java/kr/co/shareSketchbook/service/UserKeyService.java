package kr.co.shareSketchbook.service;

import java.util.HashMap;
import java.util.List;

import kr.co.shareSketchbook.vo.UserKeyVO;

public interface UserKeyService {
	List<UserKeyVO> selectByIt(String is, String it);
	boolean insertKey(UserKeyVO vo);
	boolean updateKey(UserKeyVO vo);
	boolean deleteKey(String userKey);
	HashMap<String, String> selectKeyAuth(String userKey);
	boolean insertKeyAuth(String userKey);
	boolean updateKeyAuth(String userKey, int lvl);
}

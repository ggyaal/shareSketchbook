package kr.co.shareSketchbook.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.shareSketchbook.dao.UserKeyDAO;
import kr.co.shareSketchbook.vo.UserKeyVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("userKeyService")
public class UserKeyServiceImpl implements UserKeyService{
	
	@Autowired
	UserKeyDAO userKeyDAO;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public List<UserKeyVO> selectByIt(String is, String it) {
		log.info("select KEY > [" + is + "]" + it);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put(is, it);
		
		return userKeyDAO.selectByIt(map);
	}

	@Override
	public boolean insertKey(UserKeyVO vo) {
		log.info("inset KEY > [" + vo + "]");
		String bCryptPass = bCryptPasswordEncoder.encode(vo.getPassword());
		vo.setPassword(bCryptPass);
		boolean isInsert = true;
		try {
			userKeyDAO.insertKey(vo);
			insertKeyAuth(vo.getUserKey());
		}catch (Exception e) {isInsert = false; }
		
		return isInsert;
	}

	@Override
	public boolean updateKey(UserKeyVO vo) {
		log.info("update KEY > [" + vo + "]");
		boolean isUpdate = true;
		try {
			userKeyDAO.updateKey(vo);
		}catch (Exception e) {isUpdate = false; }
		return isUpdate;
	}

	@Override
	public boolean deleteKey(String userKey) {
		log.info("delete KEY > " + userKey);
		boolean isDelete = true;
		try {
			userKeyDAO.deleteKey(userKey);
		}catch (Exception e) {isDelete = false; }
		
		return isDelete;
	}

	private final String[] AUTH_ROLE = {"ROLE_USER", "ROLE_MEMBER", "ROLE_MANAGER"};
	
	@Override
	public HashMap<String, String> selectKeyAuth(String userKey) {
		return userKeyDAO.selectKeyAuth(userKey);
	}
	
	@Override
	public boolean insertKeyAuth(String userKey) {
		boolean isInsert = true;
		try {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("userKey", userKey);
			map.put("auth", AUTH_ROLE[0]);
			userKeyDAO.insertKeyAuth(map);
		}catch (Exception e) {isInsert = false; }
		return isInsert;
	}

	@Override
	public boolean updateKeyAuth(String userKey, int lvl) {
		boolean isUpdate = true;
		String dbAuth = selectKeyAuth(userKey).get("auth");
		int authNo = Arrays.asList(AUTH_ROLE).indexOf(dbAuth);
		try {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("userKey", userKey);
			map.put("auth", AUTH_ROLE[authNo]);
			userKeyDAO.updateKeyAuth(map);
		}catch (Exception e) {isUpdate = false; }
		return isUpdate;
	}


}

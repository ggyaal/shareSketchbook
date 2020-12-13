package kr.co.shareSketchbook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.shareSketchbook.dao.CustomDAO;
import kr.co.shareSketchbook.vo.CustomVO;

@Service("customService")
public class CustomServiceImpl implements CustomService{
	
	@Autowired
	CustomDAO customDAO;

	@Override
	public CustomVO selectByKey(String userKey) {
		return customDAO.selectByKey(userKey);
	}

	@Override
	public boolean insertCustom(CustomVO vo) {
		boolean isInsert = true;
		try {
			customDAO.insertCustom(vo);
		}catch (Exception e) {isInsert = false; }
		return isInsert;
	}

	@Override
	public boolean updateCustom(CustomVO vo) {
		boolean isUpdate = true;
		try {
			customDAO.updateCustom(vo);
		}catch (Exception e) {isUpdate = false; }
		return isUpdate;
	}

}

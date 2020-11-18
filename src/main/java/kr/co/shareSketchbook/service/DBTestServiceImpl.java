package kr.co.shareSketchbook.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.shareSketchbook.dao.DBTestDAO;

@Service("dBTestService")
public class DBTestServiceImpl implements DBTestService {
	@Autowired
	private DBTestDAO dBTestDAO;

	@Override
	public String selectToday() {
		return dBTestDAO.selectToday();
	}

	@Override
	public int selectSum(int num1, int num2) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("num1", num1);
		map.put("num2", num2);
		return dBTestDAO.selectSum(map);
	}

	@Override
	public int selectMul(int num1, int num2, int num3) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("num1", num1);
		map.put("num2", num2);
		map.put("num3", num3);
		return dBTestDAO.selectMul(map);
	}
}

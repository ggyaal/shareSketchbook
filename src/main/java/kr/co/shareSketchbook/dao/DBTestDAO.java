package kr.co.shareSketchbook.dao;

import java.util.HashMap;

public interface DBTestDAO {
	String selectToday();
	int selectSum(HashMap<String, Integer> map);
	int selectMul(HashMap<String, Integer> map);
	
}

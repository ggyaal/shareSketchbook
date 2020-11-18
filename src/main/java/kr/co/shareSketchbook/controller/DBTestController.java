package kr.co.shareSketchbook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.shareSketchbook.service.DBTestService;
import kr.co.shareSketchbook.vo.DBTestVO;

@Controller
public class DBTestController {
	
	@Autowired
	private DBTestService dBTestService;
	
	@RequestMapping(value = "/testDB")
	public String testDB(Model model) {
		DBTestVO vo = new DBTestVO(); 
		vo.setToday(dBTestService.selectToday());
		vo.setSum(dBTestService.selectSum(22, 33));
		vo.setMul(dBTestService.selectMul(1, 2, 3));
		model.addAttribute("vo", vo);
		return "testDB";
	}
	@RequestMapping(value = "/testVO")
	@ResponseBody
	public DBTestVO testDB() {
		DBTestVO vo = new DBTestVO(); 
		vo.setToday(dBTestService.selectToday());
		vo.setSum(dBTestService.selectSum(22, 33));
		vo.setMul(dBTestService.selectMul(1, 2, 3));
		return vo;
	}
	
}
package kr.co.shareSketchbook.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.shareSketchbook.service.CustomService;
import kr.co.shareSketchbook.service.UserKeyService;
import kr.co.shareSketchbook.vo.CustomVO;
import kr.co.shareSketchbook.vo.UserKeyVO;

@Controller
public class MainController {
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	UserKeyService userKeyService;
	@Autowired
	CustomService customService;
	
	@RequestMapping(value = {"/", "/index", "/main"})
	public String index(Model model) {
		logger.info("Welcome to the shareSketchbook !!");
		String userKey = getPrincipal();
		logger.info("Hello " + userKey + " !!!");
		
		return "index";
	}

	@RequestMapping(value = "/login")
	public String login(Model model) {
		logger.info("Welcome to the shareSketchbook !! /login");
		
		return "index";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/";
	}

	@RequestMapping(value = "/isLogin", produces="text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String isLogin(Model model) {
		logger.info("who is login ! > ");
		String userKey = getPrincipal();
		
		return userKey;
	}
	
	@RequestMapping(value = "/{name}")
	public String name(@PathVariable("name")String name, Model madel) {
		logger.info("/" + name);
		
		return name;
	}
	
	@RequestMapping(value = "/whoIsIt", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public List<UserKeyVO> whoIsIt(@RequestParam String it, @RequestParam String is) {
		logger.debug("who is it ! > [" + is + "]" + it);
		List<UserKeyVO> vo = userKeyService.selectByIt(is, it);
		
		return vo;
	}
	
	@RequestMapping(value = "/signUp", method = RequestMethod.POST)
	public String signUp(@ModelAttribute UserKeyVO vo, Model model) {
		logger.info("welcome sign up ! > " + vo.getName());
		if(userKeyService.insertKey(vo)) {
			model.addAttribute("status", "01");			
		}else {
			model.addAttribute("status", "02");						
		}
		return "sign";
	}
	
	@RequestMapping(value = "/userCustom", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public CustomVO custom(@RequestParam String userKey, Model model) {
		logger.debug("custom ! > [" + userKey + "]");
		
		return customService.selectByKey(userKey);
	}

	@RequestMapping(value = "/setCustom", method = RequestMethod.POST)
	@ResponseBody
	public String customSet(@ModelAttribute CustomVO vo, Model model) {
		logger.info("set custom ! > [" + vo + "]");
		String isSuccess = "0";
		String userKey = getPrincipal();
		if(userKey!="anonymousUser") {
			CustomVO dbVO = customService.selectByKey(userKey);
			vo.setUserKey(userKey);
			if(dbVO!=null) {
				if(customService.updateCustom(vo)) isSuccess = "1";
			}else {
				if(customService.insertCustom(vo)) isSuccess = "1";
			}			
		}
		return isSuccess;
	}
	
	private String getPrincipal() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}
}

package kr.co.shareSketchbook.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
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

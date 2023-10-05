package kr.co.weple.meet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.weple.meet.model.service.MeetService;

@Controller
@RequestMapping(value = "/meet")
public class MeetController {
	@Autowired
	private MeetService meetService;
	
	@GetMapping(value = "/myMeetList/{reqPage}")
	public List myMeetList(@PathVariable int reqPage) {
		meetService.myMeetList(reqPage);
		return null;
	}
	
	
}

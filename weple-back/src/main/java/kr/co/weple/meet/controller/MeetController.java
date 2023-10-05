package kr.co.weple.meet.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.meet.model.service.MeetService;

@RestController
@RequestMapping(value = "/meet")
public class MeetController {
	@Autowired
	private MeetService meetService;
	
	//내가 개설한 모임 list 출력
	@GetMapping(value = "/myMeetList/{reqPage}")
	public Map myMeetList(@PathVariable int reqPage) {
		Map map = meetService.myMeetList(reqPage);
		return map;
	}
	//개설한 모임에 가입 신청자 list 출력
	@GetMapping(value = "/enrollMember")
	public void enrollMember() {
		
	}
}

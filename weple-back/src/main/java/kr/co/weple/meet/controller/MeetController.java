package kr.co.weple.meet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kr.co.weple.meet.model.service.MeetService;

@Controller
public class MeetController {
	@Autowired
	private MeetService meetService;
}

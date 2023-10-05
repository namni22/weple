package kr.co.weple.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.member.model.service.MemberService;
import kr.co.weple.member.model.vo.Member;

@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value="/checkId/{memberId}")
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
		
	}

}

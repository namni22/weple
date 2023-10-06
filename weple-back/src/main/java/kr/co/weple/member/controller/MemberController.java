package kr.co.weple.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
		
	
	@GetMapping(value="/memberList/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		return memberService.memberList(reqPage);
	}
	
	@GetMapping(value="/categoryList")
	public List categoryList() {
		return memberService.categoryList();
	}
	
	@PostMapping(value="/changeMemberGrade")
	public int changeMemberGrade(@RequestBody Member member) {
		return memberService.changeMemberGrade(member);
	}

}

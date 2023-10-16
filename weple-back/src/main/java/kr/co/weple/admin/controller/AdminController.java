package kr.co.weple.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.admin.model.service.AdminService;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;


@RestController
@RequestMapping(value="/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	//멤버리스트조회
	@GetMapping(value="/memberList/{reqPage}")
	public Map memberList(@PathVariable int reqPage) {
		return adminService.memberList(reqPage);
	}
	
	//멤버 등급 변경
	@PostMapping(value="/changeMemberGrade")
	public int changeMemberGrade(@RequestBody Member member) {
		return adminService.changeMemberGrade(member);
	}
	//회원 검색 조회
	@PostMapping(value="/searchId")
	public int searchId(@PathVariable String memberId) {
		System.out.println("memberId :" + memberId);
		Member m = adminService.selectOneMember(memberId);
		System.out.println("memberId :" + memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
	}
	
	//모임조회
	@GetMapping(value="/meetList/{reqPage}")
	public Map meetList(@PathVariable int reqPage) {		
		return adminService.meetList(reqPage);
	}
	//모임 등급 변경
	@PostMapping(value="/changeMeetType")
	public int changeMeetType(@RequestBody Meet meet) {
		return adminService.changeMeetType(meet);
	}
	//공지사항 리스트 조회
	@GetMapping(value="/boardList/{reqPage}")
	public Map boardList(@PathVariable int reqPage) {
		return adminService.boardList(reqPage);
	}
	
}

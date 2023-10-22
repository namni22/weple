package kr.co.weple.admin.controller;

import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.admin.model.service.AdminService;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.controller.MemberController;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;


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
	@GetMapping(value="/searchId/{memberId}/{reqPage}")
	public Map searchId(@PathVariable("memberId") String memberId, @PathVariable int reqPage) {	
		return adminService.selectMemberbySubId(memberId, reqPage);
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
	//모임 등급 변경하면 Follower 자동 삽입
	@PostMapping(value="/insertFollower")
	public int insertFollower(@RequestBody Meet meet) {
		int result = adminService.insertFollower(meet);
		return result; 
	}
	//공지사항 리스트 조회
	@GetMapping(value="/boardList/{reqPage}")
	public Map boardList(@PathVariable int reqPage) {
		return adminService.boardList(reqPage);
	}
	//신고내역 리스트 조회
	@GetMapping(value="/reportList/{reqPage}")
	public Map reportList(@PathVariable int reqPage) {
		return adminService.reportList(reqPage);
	}
	//신고 상태 변경
	@PostMapping(value="/changeReportStatus")
	public int changeReportStatus(@RequestBody Report report) {
		return adminService.changeReportStatus(report);
		
	}
	//신고받은 멤버 점수깎기
	@PostMapping(value="/reduceLike")
	public int reduceLike(@RequestBody Report report) {
		int result = adminService.reduceLike(report.getReportedMember());
		return result;
	}
	//블랙리스트 체크하기
	@PostMapping(value="/checkBlacklist")
	public int checkBlacklist(@RequestBody Report report) {		
		return adminService.checkBlacklist(report);
		
	}
	//meet 정보 가져오기
	@GetMapping(value="/meetInfo/{reportItemNo}")
	public List meetInfo(@PathVariable int reportItemNo) {
		System.out.println("meetInfo");
		return adminService.meetInfo(reportItemNo);
	}
}

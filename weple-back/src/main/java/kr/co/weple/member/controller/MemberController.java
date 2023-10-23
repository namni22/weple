package kr.co.weple.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.weple.EmailSender;
import kr.co.weple.FileUtil;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.service.MemberService;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;

@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private FileUtil fileUtil;
	@Autowired
	private EmailSender emailSender;
	@Value("${file.root}")
	private String root;
	
	// 아이디 중복검사
	@GetMapping(value="/checkId/{memberId}")
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
		
	}
	
	// 대분류 조회
	@GetMapping(value="/categoryList")
	public List categoryList() {
		return memberService.categoryList();
	}
	
	// 소분류 조회
	
	@GetMapping(value="/subcategory")
	public List subCategoryList() {
		return memberService.subCategoryList();
	}
	
	// 대분류 번호로 해당 소분류 조회
	@GetMapping(value="/subcategory/{categoryNo}")
	public List subCategory(@PathVariable int categoryNo) {
		return memberService.subCategory(categoryNo);
	}
	
	// 회원가입
	@PostMapping(value="/join")
	public int join(@ModelAttribute Member member, @ModelAttribute MultipartFile profileImg) {
		String savepath = root+"member/";
		if(profileImg != null) {
			String filename = profileImg.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, profileImg);
			member.setMemberImage(filepath);
		}
		
		int result = memberService.insertMember(member);
		return result;
	}
	
	// 로그인
	@PostMapping(value="/login")
	public List login(@RequestBody Member member) {
		List list = memberService.login(member);
		return list;
	}
	
	// 아이디로 멤버 정보 가져오기
	@PostMapping(value="/getMember")
	public Member mypage(@RequestAttribute String memberId) {
		return memberService.selectOneMember(memberId);
	}
	
	//신고 카테고리 가져오기
	@GetMapping(value = "/selectReportOption/{reportTypeValue}")
	public Map selectReportOption(@PathVariable int reportTypeValue) {
		System.out.println("카테고리 : "+reportTypeValue);
		Map map = memberService.selectReportOption(reportTypeValue);
		return map;
	}
	
	// 비밀번호 확인
	@PostMapping(value = "/pwCheck")
	public int pwCheck(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.pwCheck(member);
	}
	
	// 비밀번호 변경
	@PostMapping(value="/changePw")
	public int pwChange(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.pwChangeMember(member);
	}
	
	// 회원정보 수정
	@PostMapping(value="/modifyInfo")
	public int modify(@ModelAttribute Member member, @ModelAttribute MultipartFile profileImg) {
		System.out.println(member);
		if(member.getMemberImage().contentEquals("null")) {
			member.setMemberImage(null);
		}
		String savepath = root+"member/";
		if(profileImg != null) {
			String filepath = fileUtil.getFilepath(savepath, profileImg.getOriginalFilename(), profileImg);
			member.setMemberImage(filepath);
		}
		return memberService.changeInfo(member);
	}
	
	//신고내용 insert
	@PostMapping(value = "/report")
	public int insertReport(@RequestBody Report report) {
		System.out.println("report :" +report);
		int result = memberService.insertReport(report);
		return result;
	}
	
	// 프로필 내 피드 가져오기
	@GetMapping(value="/myFeedList/{start}/{end}/{memberId}")
	public List list(@PathVariable int start, @PathVariable int end, @PathVariable String memberId) {
		List myFeedList = memberService.myFeedList(start, end, memberId);
		return myFeedList;
		
	}
	
	// 아이디 찾기
	@PostMapping(value="/findId")
	public String findId(@RequestBody Member member) {
		Member m = memberService.findId(member);
		if(m == null) {
			return "not found";
		}else {
			return m.getMemberId();
		}
	}
	
	// 비밀번호 찾기 시 회원 정보 일치하는지 조회
	@PostMapping(value="/findPw")
	public String findPw(@RequestBody Member member) {
		Member m = memberService.findPw(member);
		if(m == null) {
			return "not found";
		}else {
			return "password";
		}
		
	}
	
	// 비밀번호 찾기 시 회원 정보 일치하면 임시 비밀번호 메일링
	@PostMapping(value="/sendMail")
	public String sendPwMail(@RequestBody Member member) {
		String memberEmail = member.getMemberEmail();
		String authCode = emailSender.sendPwMail(memberEmail);
		return authCode;
	}
	
	// 임시 비밀번호로 비밀번호 변경
	@PostMapping(value="/changeTemporaryPw")
	public int pwChange(@RequestBody Member member) {
		return memberService.pwChangeMember(member);
	}
	
	// 내가 가입한 모임 리스트 가져오기
	@GetMapping(value="/meetJoined/{memberNo}")
	public List meetJoined(@PathVariable int memberNo) {
		return memberService.meetJoined(memberNo);
	}
	
	// 내가 개설한 모임 리스트 가져오기
	@GetMapping(value="/myMeet/{memberId}")
	public List myMeet(@PathVariable String memberId) {
		return memberService.myMeet(memberId);
	}
	
	// 회원 탈퇴
	@PostMapping(value="/delete")
	public int delete(@RequestAttribute String memberId) {
		return memberService.delete(memberId);
	}
	
	//회원 선호 카테고리 조회
	@PostMapping(value = "/getMemberCategory")
	public List getMemberCategory(@RequestAttribute String memberId) {
		List list = memberService.getMemberCategory(memberId);
		return list;
	}
	
	//관리자 체크
		@PostMapping(value = "/adminCheck")
		public Member adminCheck(@RequestAttribute String memberId) {
			Member admin = memberService.adminCheck(memberId);			
			return admin;
		}
	// 회원 등급 가져오기
	@GetMapping(value="/getMemberGrade/{memberId}")
	public int memberGrade(@PathVariable String memberId) {
		return memberService.getMemberGrade(memberId);
	}
	//회원인지 확인하는 메소드
	@PostMapping(value="/isMember")
	public boolean isMember(@RequestAttribute String memberId, @RequestBody Meet meet) {
		boolean result = memberService.isMember(memberId,meet.getMeetNo());
		return result;
}

	
	// 남이보는 프로필 멤버 정보 가져오기
	@PostMapping(value="/getMemberInfo")
	public Member getMemberInfo(@RequestBody Member m) {
		return memberService.getMemberInfo(m.getMemberId());
	}

}
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

import kr.co.weple.FileUtil;
import kr.co.weple.member.model.service.MemberService;
import kr.co.weple.member.model.vo.Member;

@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private FileUtil fileUtil;
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
	public String login(@RequestBody Member member) {
		String result = memberService.login(member);
		return result;
	}
	
	// 아이디로 멤버 정보 가져오기
	@PostMapping(value="/getMember")
	public Member mypage(@RequestAttribute String memberId) {
		return memberService.selectOneMember(memberId);
	}
	
	//신고 카테고리 가져오기
	@GetMapping(value = "/selectReportOption/{reportType}")
	public Map selectReportOption(@PathVariable int reportType) {
		Map map = memberService.selectReportOption(reportType);
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
}

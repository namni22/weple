package kr.co.weple.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@GetMapping(value="/checkId/{memberId}")
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
		
	}
	
	@GetMapping(value="/categoryList")
	public List categoryList() {
		return memberService.categoryList();
	}
	
	@GetMapping(value="/subcategory/{categoryNo}")
	public List subCategory(@PathVariable int categoryNo) {
		return memberService.subCategory(categoryNo);
	}
	
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
	
	@PostMapping(value="/login")
	public String login(@RequestBody Member member) {
		String result = memberService.login(member);
		return result;
	}
	
}

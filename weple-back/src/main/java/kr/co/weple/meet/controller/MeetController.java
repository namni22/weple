package kr.co.weple.meet.controller;

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
import kr.co.weple.meet.model.service.MeetService;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;

@RestController
@RequestMapping(value = "/meet")
public class MeetController {
	@Autowired
	private MeetService meetService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value = "/myMeetList/{reqPage}")
	public Map myMeetList(@PathVariable int reqPage) {
		Map map = meetService.myMeetList(reqPage);
		return map;
	}
	//개설한 모임에 가입 신청자 list 출력
	@GetMapping(value = "/enrollMember/{reqPage}")
	public Map enrollMember(@PathVariable int reqPage, int meetNo) {
		//System.out.println(meetNo);
		Map map = meetService.enrollMember(reqPage,meetNo);
		return map;		
	}
	//개설한 모임멤버 list 출력
	@GetMapping(value = "/meetMember/{reqPage}")
	public Map meetMember(@PathVariable int reqPage, int meetNo) {
		System.out.println("meetNo : "+meetNo);
		Map map = meetService.meetMemberList(reqPage,meetNo);
		return map;
	}

	//모임생성
	@PostMapping(value = "/meetCreate")
	public int meetCreate(
			@ModelAttribute Meet meet,
			@ModelAttribute MultipartFile meetThumbnail
			
		) {
		// @RequestAttribute String memberId 로 아이디 받아서 meet에 방장으로 추가 (토큰필요)
		
		System.out.println("텍스트 에디터 : "+meet.getMeetContentD());
		
		String savepath = root + "meet/";

		if(meetThumbnail != null) {//썸네일이 있다면 meet에 set
			meet.setMeetThumbNail(meetThumbnail.getOriginalFilename());
			String filename = meetThumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, meetThumbnail) ;//물리적으로 업로드
			meet.setMeetThumbNail(filepath);

		}
		//meetMargin set 남은인원 셋팅
		meet.setMeetMargin(meet.getMeetTotal()-1);
		
		
		int result = meetService.createMeet(meet);
		//리턴 리절트로 변경
		return result;
	}
	
	//모임생성 에디터 사진 추가
	@PostMapping(value = "/meetContentDImg")
	public String meetContentDImg(@ModelAttribute MultipartFile image) {
		
		String savepath = root +"meet/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		
		//webconfig 랑 맞워야함 /meet/editor/를
		return "/meet/editor/"+filepath;
	}
	
	//updateEnrollMember
	@PostMapping(value = "/updateEnrollMember")
	public int updateEnrollMember(@RequestBody Follower enroll) {
		System.out.println(enroll);
		int result = meetService.updateEnrollMember(enroll.getMemberNo());
		return result;
	}
}

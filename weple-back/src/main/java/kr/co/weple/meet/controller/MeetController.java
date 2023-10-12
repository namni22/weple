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
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Chat;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;

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
		//구분자로 준비물 String으로 이어서 set
		if(!meet.getMeetPrepareList().isEmpty()) {//준비물이 있다면
			String newPrepare = "";
			for(int i = 0 ; i<meet.getMeetPrepareList().size(); i++) {
				//마지막 준비물 추가면
				if(i==meet.getMeetPrepareList().size()-1) {
					newPrepare += (String) meet.getMeetPrepareList().get(i);
					break;
				}
				newPrepare += (String) meet.getMeetPrepareList().get(i)+"/";
			}
			meet.setMeetPrepare(newPrepare);			
		}		
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
	//모임 카테고리 조회
	@GetMapping(value = "/selectSmallCategory/{bigCategoryNo}")
	public List selectSmallCategory (@PathVariable int bigCategoryNo) {
		
		Category category = new Category();
		category.setCategoryNo(bigCategoryNo);
		List smallCategoryList = meetService.selectSmallCategory(category);
		
		return smallCategoryList;
	}
	//모임 리스트 조회
	@GetMapping(value = "/meetList/{reqPage}/{meetCategory}")
	public Map meetList(@PathVariable int reqPage, @PathVariable int meetCategory) {
		System.out.println("모임 카테고리 번호 : "+meetCategory);
		//이미 meetList를 쓰고 있어서 바꿈
		Map map = meetService.circleList(reqPage,meetCategory);

		return map;
	}
	//모임 카테고리 메뉴바 눌럿을때 모임 리스트 조회
	@GetMapping(value = "/categoryMeetList/{reqPage}/{meetCategory}")
	public Map categoryMeetList(@PathVariable int reqPage,@PathVariable int meetCategory) {
		
		Map map = meetService.categoryMeetList(reqPage, meetCategory);
		
		return map;
	}
	//메인페이지에 참여인원 순 모임 조회
	@GetMapping(value = "/meetMargin")
	public List meetMargin() {
		List list = meetService.meetMargin();
		return list;
	}
	
	//메인페이지에 인기순 모임조회
	@GetMapping(value = "/meetPopular")
	public List meetPopular() {
		List list = meetService.meetPopular();
		return list;
	}
	//메인페이지에 최신순 모임조회
	@GetMapping(value = "/meetNew")
	public List meetNew() {
		List list = meetService.meetNew();
		return list;
	}		
	//meet챗팅 조회
	@GetMapping(value = "/meetChat/{meetNo}")
	public Map meetChat(@PathVariable int meetNo) {
		System.out.println("meetNo : "+ meetNo);
		Map meetChat = meetService.meetChatList(meetNo);
		System.out.println("챗 리스트 : "+meetChat);
		return meetChat;
	}	
	//내모임회원 추방
	@PostMapping(value = "/deleteMember")
	public int deleteMember(@RequestBody Follower memberList) {
		int result = meetService.deleteMember(memberList.getMemberNo());
		return result;
	}
	//모임 내 맴버 호감도 올리기
		@PostMapping(value = "/memberLike")
		public int memberLike(@RequestBody Member memberList) {
			int result = meetService.memberLike(memberList.getMemberId(),memberList.getMemberLike());
			return result;
		}
}

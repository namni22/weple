package kr.co.weple.meet.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.weple.FileUtil;
import kr.co.weple.feed.model.vo.FComment;
import kr.co.weple.meet.model.service.MeetService;
import kr.co.weple.meet.model.vo.Calendar;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Chat;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.meet.model.vo.WishList;
import kr.co.weple.member.model.service.MemberService;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Review;

@RestController
@RequestMapping(value = "/meet")
public class MeetController {
	@Autowired
	private MeetService meetService;
	@Autowired
	private MemberService memberService;
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
	public Map enrollMember(@PathVariable int reqPage, int meetNo,@RequestAttribute String memberId) {
		//System.out.println(meetNo);
		Map map = meetService.enrollMember(reqPage,meetNo,memberId);
		return map;		
	}
	//개설한 모임멤버 list 출력
	@GetMapping(value = "/meetMember/{reqPage}")
	public Map meetMember(@PathVariable int reqPage, int meetNo,@RequestAttribute String memberId) {
		Map map = meetService.meetMemberList(reqPage,meetNo,memberId);		                   
		return map;
	}
	//모임생성
	@PostMapping(value = "/meetCreate")
	public int meetCreate(
			@ModelAttribute Meet meet,
			@ModelAttribute MultipartFile meetThumbnailPreview,
			@RequestAttribute String memberId
		) {
		// @RequestAttribute String memberId 로 아이디 받아서 meet에 방장으로 추가 (토큰필요)		
		meet.setMeetCaptain(memberId);
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
		if(meetThumbnailPreview != null) {//썸네일이 있다면 meet에 set
			meet.setMeetThumbNail(meetThumbnailPreview.getOriginalFilename());
			String filename = meetThumbnailPreview.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, meetThumbnailPreview) ;//물리적으로 업로드
			meet.setMeetThumbNail(filepath);
		}
		//meetMargin set 남은인원 셋팅
		meet.setMeetMargin(meet.getMeetTotal());		
		System.out.println("생성 모임 : "+meet);		
		int result = meetService.createMeet(meet);
		//리턴 리절트로 변경
		return result;
	}
	//모임수정
	@PostMapping(value = "/meetModify")
	public Meet meetModify (
			@ModelAttribute Meet meet,
			@ModelAttribute MultipartFile meetThumbNailPreview,
			@RequestAttribute String memberId
			) {		
		// @RequestAttribute String memberId 로 아이디 받아서 meet에 방장으로 추가 (토큰필요)
		meet.setMeetCaptain(memberId);
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
		if(meetThumbNailPreview != null) {//썸네일이 있다면 meet에 set
			meet.setMeetThumbNail(meetThumbNailPreview.getOriginalFilename());
			String filename = meetThumbNailPreview.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, meetThumbNailPreview) ;//물리적으로 업로드
			meet.setMeetThumbNail(filepath);
		}		
		Meet newMeet = meetService.modifyMeet(meet);
		return newMeet;	
	}
	
	//모임생성 에디터 사진 추가
	@PostMapping(value = "/meetContentDImg")
	public String meetContentDImg(@ModelAttribute MultipartFile image) {		
		String savepath = root +"meet/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/meet/editor/"+filepath;
	}
	
	//updateEnrollMember
	@PostMapping(value = "/updateEnrollMember/{meetNo}")
	public int updateEnrollMember(@RequestBody Follower enroll,@PathVariable int meetNo) {		
		int result = meetService.updateEnrollMember(enroll.getMemberNo(),meetNo);
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
		System.out.println("전체 조회 별점확인 맵 : "+ map);
		return map;
	}
	//모임 카테고리 메뉴바 눌럿을때 모임 리스트 조회
	@GetMapping(value = "/categoryMeetList/{reqPage}/{meetCategory}")
	public Map categoryMeetList(@PathVariable int reqPage,@PathVariable int meetCategory) {		
		Map map = meetService.categoryMeetList(reqPage, meetCategory);
		System.out.println("별점확인 맵 : "+map);
		return map;
	}
	//아이디 받아서 멤버 조회
	@PostMapping(value = "/selectOneMember")
	public Member selectOneMember(@RequestBody Member member) {
		Member m = meetService.selectOneMember(member.getMemberId());		
		return meetService.selectOneMember(member.getMemberId());
	}
	//모임 가입
	@PostMapping(value = "/meetJoin")
	public Follower meetJoin (
			@RequestAttribute String memberId,
			@RequestBody Meet meet
			
			) {
		
		
		Member joinMember =  memberService.selectOneMember(memberId);
		System.out.println(joinMember);
		
		//가입신청이후 view로 이동하기위한 meet정보
		Follower follower = meetService.meetJoin(joinMember, meet);
		
		return follower;
	}
	//로그인한 회원이 가입승인을 받은 모임 멤버인지 조회
	@PostMapping(value = "/isMeetMember")
	public Follower isMeetMember(
			@RequestAttribute String memberId,
			@RequestBody Meet meet
			) {		
		Member loginMember = memberService.selectOneMember(memberId);		
		Follower follower= meetService.isMeetMember(loginMember.getMemberNo(),meet.getMeetNo());
		return follower;
	}
	
	//모임번호를 입력받아 해당 모임을 select
	@GetMapping(value = "/selectOneMeet/{meetNo}")
	public Meet meetView(@PathVariable int meetNo) {
		
		return meetService.selectOneMeet(meetNo);
	}
	
	@PostMapping(value = "/isMeetLike")
	public WishList isMeetLike (
			@RequestBody Meet meet,
			@RequestAttribute String memberId
			) {
		
		Member member = memberService.selectOneMember(memberId);
		
		WishList isMeetLike = meetService.isMeetLike(meet.getMeetNo(),member.getMemberNo());
		
		
		return isMeetLike;
	}
	//모임 좋아요 취소
	@PostMapping(value = "/meetLikeCancle")
	public int meetLikeCancle(
			@RequestBody Meet meet,
			@RequestAttribute String memberId
			) {
		System.out.println("좋아요 취소 진행");
		Member member = memberService.selectOneMember(memberId);
		int result = meetService.meetLikeCancle(meet.getMeetNo(), member.getMemberNo());
		return result;
	}
	
/*********************************메인페이지 모임조회*********************************************/	
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
	
	//메인페이지에 선호카테고리순 모임조회
	@PostMapping(value = "/meetCategory")
	public List meetCategory() {
//		System.out.println(memberCategory);
//		List list = meetService.meetCategory(meetCategory);
		return null;
	}
/********************************************************************************************/			
	//meet챗팅 조회
	@GetMapping(value = "/meetChat/{meetNo}")
	public Map meetChat(@PathVariable int meetNo) {		
		Map meetChat = meetService.meetChatList(meetNo);		
		return meetChat;
	}	
	//내모임회원 추방
	@PostMapping(value = "/deleteMember/{meetNo}")
	public int deleteMember(@PathVariable int meetNo,@RequestBody Follower memberList) {		
		int result = meetService.deleteMember(memberList.getMemberNo(),meetNo);		
		return result;
	}
	//멤버 탈퇴
	@PostMapping(value = "/selfDeleteMember")
	public int selfDeleteMember ( @RequestBody Follower isMeetMember) {
		int result = meetService.deleteMember(isMeetMember.getMemberNo(), isMeetMember.getMeetNo());		
		return result;
	}
	
	//모임 내 맴버 호감도 올리기
		@PostMapping(value = "/memberLike")
		public int memberLike(@RequestBody Member memberList) {
			int result = meetService.memberLike(memberList.getMemberId(),memberList.getMemberLike());
			return result;
		}
	//모임 채팅
		@PostMapping(value = "/chat/{meetNo}")
		public List insertMeetChat(@RequestBody Chat chat,@RequestAttribute String memberId,@PathVariable int meetNo ) {			
			List list = meetService.insertMeetChat(chat.getChatContent(),memberId,meetNo);			
			return list;
		}
	
	//사이드바 유무에 필요한 회원상태 정보
	@GetMapping(value = "/memberStatus/{meetNo}")
	public Follower memberStatus(@PathVariable int meetNo,@RequestAttribute String memberId) {
		Follower followerStatus = meetService.status(meetNo,memberId);
		return followerStatus;
	}
	//방장임에 따라 바뀌는 사이드바에 필요한 정보
	@GetMapping(value = "/meetCapCheck/{meetNo}")
	public Map meetCapCheck(@PathVariable int meetNo,@RequestAttribute String memberId) {		
		Map meetCapCheck = meetService.meetCapCheck(meetNo,memberId);		
		return meetCapCheck;
	}
	//회원 호감도 저장
	@GetMapping(value = "/memberLikeStatus/{reqPage}")
	public Map memberLikeStatus(@PathVariable int reqPage,int meetNo,int takerNo,@RequestAttribute String memberId ) {		
		Map map = meetService.memberLikeStatus(memberId,takerNo,meetNo,reqPage);
		return map;
	}
	
	//호감도 조회
	@GetMapping(value = "/like/{meetNo}")
	public String like(@PathVariable int meetNo,@RequestAttribute String memberId) {
		return meetService.Like(memberId, meetNo);
	}

	
	//------------------캘린더---------------------
		
	//캘린더 일정추가
	@PostMapping(value="/addCalendar")
	public int addCalendar(@RequestBody Calendar cal) {
		return meetService.addcalendar(cal);
	}
	//캘린더 리스트 출력
	@GetMapping(value="/calendarList/{meetNo}")
	public List calendarList(@PathVariable int meetNo) {
		List list = meetService.calendarList(meetNo);
		return list;
	}
	//캘린더 일정삭제
	@GetMapping(value="/removeCalendar/{calNo}")
	public int removeCalendar(@PathVariable int calNo) {
		return meetService.removeCalendar(calNo);
	}
	//일정 불러오기
	@GetMapping(value="/schedule/{calNo}")
	public Calendar schedule(@PathVariable int calNo) {
		return meetService.schedule(calNo);
	}
	//일정수정하기
	@Transactional
	@PostMapping(value="/modifyCalendar")
	public int modifyCalendar(@RequestBody Calendar cal) {
		return meetService.modifyCalendar(cal);
	}

	

}

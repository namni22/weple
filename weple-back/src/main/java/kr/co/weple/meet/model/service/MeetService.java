package kr.co.weple.meet.model.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;
import kr.co.weple.feed.model.vo.Feed;
import kr.co.weple.meet.model.dao.MeetDao;
import kr.co.weple.meet.model.vo.Calendar;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.meet.model.vo.WishList;
import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;

@Service
public class MeetService {
	@Autowired
	private MeetDao meetDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	public Map myMeetList(int reqPage) {
		//내가 창설한 모임 리스트 조회, 페이징에 필요한 데이터 취합
		int numPerPage = 12; //한페이지당 게시물수(변경가능)
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();
		
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List myMeetList = meetDao.selectMyMeetList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("myMeetList", myMeetList);
		map.put("pi",pi);
		return map;		
	}
	public Map enrollMember(int reqPage,int meetNo, String memberId) {
		int numPerPage	= 5;
		int pageNaviSize = 5;
		int totalCount = meetDao.enrollMemberList(meetNo);		
		PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("start", pi.getStart());
		param.put("end", pi.getEnd());
		param.put("meetNo",meetNo);
		param.put("memberId",memberId);
		List enrollMemberList = meetDao.selectEnrollMemberList(param);
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("enrollMemberList",enrollMemberList);
		map.put("pi",pi);
		return map;
	}

	//모임생성
	@Transactional
	public int createMeet(Meet meet) {		
		//모임 장장 select 해와서 meet에 set 은 같은 자료형이라 controller에서 이미 해왔고 여기선 안해도됨		
		int result = meetDao.createMeet(meet);
		if(result>0) {
			//개설가능 모임수 조회
			Member member = memberDao.selectOneMember(meet.getMeetCaptain());
			//개설가능 모임수 줄이기
			int memberMeet = member.getMemberMeet()-1;
			
			member.setMemberMeet(memberMeet);
			//db가서 모임 개설수 업데이트
			int result2 = meetDao.updateMemberMeet(member);
			
			
		}
		return result;
	}
	//모임수정
	@Transactional
	public Meet modifyMeet(Meet meet) {
		// TODO Auto-generated method stub		
		//모임 수정이후
		System.out.println("모임 정보 마진 :"+ meet.getMeetMargin());
		System.out.println("토탈" + meet.getMeetTotal());
		int result = meetDao.modifyMeet(meet);
		
		//모임 view로 이동하기위해 변경한 모임 조회해서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("meetNo",meet.getMeetNo());
		Member member = memberDao.getMemberInfo(meet.getMeetCaptain());//모임장 번호 알아와
		map.put("memberNo",member.getMemberNo());
		Meet newMeet= meetDao.selectOneMeet2(map);		
		return newMeet;
	}
	public Map meetMemberList(int reqPage, int meetNo, String memberId) {
		int numPerPage	= 5;
		int pageNaviSize = 5;
		int totalCount = meetDao.meetMemberList(meetNo);		
		PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("start", pi.getStart());
		param.put("end", pi.getEnd());
		param.put("meetNo",meetNo);
		param.put("memberId",memberId);
		List selectMeetMemberList = meetDao.selectMeetMemberList(param);		
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("selectMeetMemberList",selectMeetMemberList);
		map.put("pi",pi);
		return map;
		
	}
	//모임 리스트 조회
	public Map meetList(int reqPage) {
		int totalCount = meetDao.totalCount();
		int numPerPage = 12;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List meetList = meetDao.meetList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", meetList);
		map.put("pi", pi);
		return map;
	}
	@Transactional
	public int updateEnrollMember(int memberNo, int meetNo) {	
		int meetMargin = meetDao.selectMeetMargin(meetNo);
		int meetTotal = meetDao.selectMeetTotal(meetNo);
		int newMargin = meetMargin - 1;
		HashMap<String,Integer> param = new HashMap<String, Integer>();
		param.put("meetNo",meetNo);
		param.put("newMargin",newMargin);
		param.put("memberNo",memberNo);
		//185 기준 total=10 마진은 0 
		if(meetMargin * meetTotal == 0) {
			//남은 인원과 총인원이 같을 경우
			return 2;
		}else {
			//남은 인원과 총인원이 같이 않을 경우
			int meetTotalCount = meetDao.disCount(param);//업데이트 meetMargin
			int updateResult = meetDao.updateEnrollMember(param);
			if(meetTotalCount == 1 && updateResult == 1) {
				return 1;
			}else {			
				return 0;			
			}		
		}
		
	}
	/*
	 	@Transactional
	public int deleteMember(int memberNo, int meetNo) {
		//필요한 값 
		//모임 번호 : meetNo, 모임번호로 조회된 meetMargin 
		//meetMargin +1 
		int meetMargin = meetDao.selectMeetMargin(meetNo);
		int newMargin = meetMargin + 1;
		int meetTotalCount = meetDao.disCount(meetNo,newMargin);//업데이트 meetMargin
		int deleteResult = meetDao.deleteMember(memberNo,meetNo);//모임회원 삭제
		System.out.println("서비스 deleteResult : "+deleteResult);
		System.out.println("서비스meetTotalCount : "+meetTotalCount);
		if(meetTotalCount == 1 && deleteResult == 1) {
			return 1;
		}else {
			
			return 0;
		}
	}
	 * */
	public Map circleList(int reqPage, int meetCategory, int memberNo) {			
		// 게시물조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.circleListTotalCount(meetCategory);// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);		
		//map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("meetCategory",meetCategory);
		map.put("memberNo",memberNo);
		// 리스트조회 //pi 랑 meetCategory도 묶어서 보냄 //좋아요 를 로그인한 회원이 누른 상태인지 확인하기위해 추가
		List circleList = meetDao.selectCircleList(map);
		map.put("meetList", circleList);		
		return map;
	}
	// 모임 카테고리 메뉴바 눌럿을때 모임 리스트 조회
	public Map categoryMeetList(int reqPage, int meetCategory, int memberNo) {
		// TODO Auto-generated method stub
		// 게시물조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.categoryMeetListTotalCount(meetCategory);// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		// map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("meetCategory", meetCategory);
		map.put("memberNo",memberNo);
		// 리스트조회 //pi 랑 meetCategory도 묶어서 보냄
		List circleList = meetDao.categoryMeetList(map);
		map.put("meetList", circleList);
		return map;
	}
	
	//meet한개 조회 역하리다르니까 밑에 2랑 지우지 말아주세요
	public Meet selectOneMeet(int meetNo) {
		// TODO Auto-generated method stub
		
		Meet meet =meetDao.selectOneMeet(meetNo); 
		return meet;
	}
	//meet한개 조회
		public Meet selectOneMeet2(int meetNo, int memberNo) {
			// TODO Auto-generated method stub
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("meetNo",meetNo);
			map.put("memberNo",memberNo);
			Meet meet =meetDao.selectOneMeet2(map); 
			return meet;
		}
	public Map meetChatList(int meetNo) {
		List meetChat = meetDao.meetChatList(meetNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("meetChat", meetChat);
		return map;
	}
/*********************************메인페이지 모임조회*********************************************/
	//메인페이지에 인기순 모임조회
	public List meetPopular(int memberNo) {
		// TODO Auto-generated method stub
		
		List list = meetDao.meetPopular(memberNo);
		return list;
	}
	//메인페이지에 최신순 모임조회
	public List meetNew(int memberNo) {
		// TODO Auto-generated method stub
		List list = meetDao.meetNew(memberNo);
		return list;
	}
	//메인페이지에 참여인원 순 모임 조회
		public List meetMargin(int memberNo) {
			// TODO Auto-generated method stub
			List list = meetDao.meetMargin(memberNo);
			return list;
		}
	
//	//메인페이지에 선호카테고리순 모임조회
//	public List meetCategory(String memberId) {
//		// TODO Auto-generated method stub
//		String getMemberCategory = meetDao.getMemberCategory(memberId);
//		List list = meetDao.meetCategory();
//		return list;
//	}	
/********************************************************************************************/	
	//모임 카테고리 메뉴 조회
		public List selectSmallCategory(Category category) {
			// TODO Auto-generated method stub
			List smallCategoryList = meetDao.smallCategoryList(category);
			return smallCategoryList;
	}
	//내모임회원 추방
	@Transactional
	public int deleteMember(int memberNo, int meetNo) {
		int meetMargin = meetDao.selectMeetMargin(meetNo);
		int newMargin = meetMargin + 1;
		HashMap<String,Integer> param = new HashMap<String, Integer>();
		param.put("meetNo",meetNo);
		param.put("newMargin",newMargin);
		param.put("memberNo",memberNo);
		int meetTotalCount = meetDao.disCount(param);//업데이트 meetMargin
		int deleteResult = meetDao.deleteMember(param);//모임회원 삭제		
		if(meetTotalCount == 1 && deleteResult == 1) {
			return 1;
		}else {			
			return 0;
		}
	}
	//모임 내 회원 호감도
	@Transactional
	public int memberLike(String memberId, double memberLike) {
		return meetDao.memberLike(memberId);	}
	//아이디 받아서 멤버 조회
	public Member selectOneMember(String memberId) {
		return meetDao.selectOneMember(memberId);
	}
	//모임가입신청
	@Transactional
	public Follower meetJoin(Member joinMember, Meet meet) {
		// 가입신청한 멤버번호와 가입할 모임번호를 모임가입정보로 묶어서 전달		
		HashMap<String, Object> meetJoinInfo = new HashMap<String,Object>();
		meetJoinInfo.put("memberNo",joinMember.getMemberNo());
		meetJoinInfo.put("meetNo",meet.getMeetNo());		
		int result = meetDao.meetJoin(meetJoinInfo);
		System.out.println("결과확인");
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("memberNo", joinMember.getMemberNo());
		map.put("meetNo", meet.getMeetNo());
		Follower follower = meetDao.isMeetMember(map);		
		return follower;
	}
	//로그인한 회원이 가입승인을 받은 모임 멤버인지 조회
	public Follower isMeetMember(int memberNo, int meetNo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("memberNo", memberNo);
		map.put("meetNo", meetNo);
		Follower follower = meetDao.isMeetMember(map);		
		return follower;
	}
	@Transactional
	public List insertMeetChat(String chatContent, String memberId, int meetNo) {
		HashMap<String , Object> param = new HashMap<String, Object>();
		param.put("chatContent",chatContent);
		param.put("memberId",memberId);
		param.put("meetNo",meetNo);
		int result = meetDao.insertMeetChat(param);
		System.out.println(param);
		List list = meetDao.meetChatLast(meetNo);
		System.out.println(list);
		return list;
	}
	public Follower status(int meetNo, String memberId) {
		int selectMemberNo = meetDao.selectMemberNo(memberId);
		HashMap<String , Object> param = new HashMap<String, Object>();
		param.put("meetNo",meetNo);
		param.put("selectMemberNo",selectMemberNo);
		Follower followStatus = meetDao.status(param);
		
		return followStatus;
	}

	public Map meetCapCheck(int meetNo, String memberId) {
		Meet meetCapCheck= meetDao.meetCapCheck(meetNo,memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("meetCapCheck",meetCapCheck);		
		return map;
	}
	@Transactional
	public Map memberLikeStatus(String memberId, int takerNo, int meetNo, int reqPage) {
		int giverNo = meetDao.selectMemberNo(memberId);
		int result = meetDao.insertMemberLike(giverNo,takerNo,meetNo);
		if(result >0) {
			int numPerPage	= 5;
			int pageNaviSize = 5;
			int totalCount = meetDao.meetMemberList(meetNo);
			
			PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);
			
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("start", pi.getStart());
			param.put("end", pi.getEnd());
			param.put("meetNo",meetNo);
			param.put("memberId",memberId);
			List selectMeetMemberList = meetDao.selectMeetMemberList(param);
			
			HashMap<String, Object> map = new HashMap<String,Object>();
			map.put("selectMeetMemberList",selectMeetMemberList);
			map.put("pi",pi);
			return map;
		}
		return null;
	}

	public String Like(String memberId, int meetNo) {
		int memberNo = meetDao.selectMemberNo(memberId);
		List list = meetDao.like(memberNo,meetNo);
		if(list.size()!=0) {
			return "true";
		}
		return "";
	}

	public WishList isMeetLike(int meetNo, int memberNo) {
		// TODO Auto-generated method stub
//		System.out.println("정보전달 확인 모임번호 : "+meetNo);
//		System.out.println("정보전달 확인 멤버번호 : "+memberNo);
		WishList isMeetLike = meetDao.isMeetLike(meetNo, memberNo);
//		System.out.println("좋아요 조회 결과 : "+isMeetLike);
	
		return isMeetLike;
	}

	//좋아요
	@Transactional
	public int meetLikeUp(int meetNo, int memberNo) {
		// TODO Auto-generated method stub
		return meetDao.meetLikeUp(meetNo, memberNo);
	}

	//모임 좋아요 취소
	@Transactional
	public int meetLikeCancle(int meetNo, int memberNo) {
		// TODO Auto-generated method stub
		
		return meetDao.meetLikeCancle(meetNo, memberNo);
	}


	
	//검색어 입력
	public Map searchList(int reqPage, String searchKeyword) {
		// TODO Auto-generated method stub
		int numPerPage = 5; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.searchTotal(searchKeyword);// 전체게시물수 
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("searchKeyword", searchKeyword);
		List meetList = meetDao.searchList(map);
		map.put("meetList", meetList);
		return map;
	}

	//모임삭제
	@Transactional
	public int deleteMeet(Meet meet) {
		// TODO Auto-generated method stub
		
		
		int result = meetDao.deleteMeet(meet.getMeetNo());
		
		if(result>0) {
			
			//개설가능 모임수 조회
			Member member = memberDao.selectOneMember(meet.getMeetCaptain());
			//개설가능 모임수 줄이기
			int memberMeet = member.getMemberMeet()+1;
			
			member.setMemberMeet(memberMeet);
			//db가서 모임 개설수 업데이트
			int result2 = meetDao.updateMemberMeet(member);
			
			
			
		}
		
		return result;
	}
	
	@Transactional
	public int deleteEnrollMember(int memberNo, int meetNo) {
		// TODO Auto-generated method stub
		HashMap<String , Integer> param = new HashMap<String, Integer>();
		param.put("memberNo",memberNo);
		param.put("meetNo",meetNo);
		int result =  meetDao.deleteEnrollMember(param);
		return result;
	}
	
	//모임 좋아요 갯수 세오기
	public int meetLikeCount(int meetNo) {
		// TODO Auto-generated method stub
		return meetDao.meetLikeCount(meetNo);
	}
	
	//------------------캘린더---------------------
	@Transactional
	public int addcalendar(Calendar cal) {
			return  meetDao.addCalendar(cal);
	}
	public List calendarList(int meetNo) {
		return meetDao.calendarList(meetNo);
	}
	@Transactional
	public int removeCalendar(int calNo) {
		return meetDao.removeCalendar(calNo);
	}
	public Calendar schedule(int calNo) {
		List list = meetDao.schedule(calNo);
		Calendar c = (Calendar)list.get(0);
		return c;
	}
	@Transactional
	public int modifyCalendar(Calendar cal) {
		return meetDao.modifyCalendar(cal);
	}
	public boolean captainCk(int meetNo, String memberId) {
		Meet meet = meetDao.selectOneMeet(meetNo);
		if(meet.getMeetCaptain().equals(memberId)) {
			return true;
		}
		return false;
	}
	public List myCalendar(String memberId) {
		return meetDao.myCalendar(memberId);
	}
	//모임 수정시 모임 멤버수 세오기
	public int selectMeetMemberCount(int meetNo) {
		// TODO Auto-generated method stub
		//있는 메소드 쓰지만 수정된다면 쿼리문은 다음을 쓴다. select count(*) from follower where follower_status=1 and meet_no = #{meetNo} 
		int result = meetDao.meetMemberList(meetNo);
		System.out.println("미트 서비스 멤버수 : "+result);
		return result;
	}

}

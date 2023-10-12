package kr.co.weple.meet.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;
import kr.co.weple.meet.model.dao.MeetDao;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;

@Service
public class MeetService {
	@Autowired
	private MeetDao meetDao;
	@Autowired
	private Pagination pagination;
	
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

	public Map enrollMember(int reqPage,int meetNo) {
		int numPerPage	= 10;
		int pageNaviSize = 5;
		int totalCount = meetDao.enrollMemberList(meetNo);
		//System.out.println("totalCount : "+totalCount);
		
		PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);
		//System.out.println("pi : "+pi);
		HashMap<String, Integer> param = new HashMap<String, Integer>();
		param.put("start", pi.getStart());
		param.put("end", pi.getEnd());
		param.put("meetNo",meetNo);
		List enrollMemberList = meetDao.selectEnrollMemberList(param);
		//System.out.println("enrollMemberList : "+enrollMemberList);
		HashMap<String, Object> map = new HashMap<String,Object>();
		map.put("enrollMemberList",enrollMemberList);
		map.put("pi",pi);
		return map;
	}

	@Transactional
	public int createMeet(Meet meet) {
		// TODO Auto-generated method stub
		
		//모임 장장 select 해와서 meet에 set 은 같은 자료형이라 controller에서 이미 해왔고 여기선 안해도됨
		
		int result = meetDao.createMeet(meet);
		
		
		return result;
	}

	public Map meetMemberList(int reqPage, int meetNo) {
		int numPerPage	= 12;
		int pageNaviSize = 5;
		int totalCount = meetDao.meetMemberList(meetNo);
		System.out.println("totalCount : "+totalCount);
		
		PageInfo pi = pagination.getPageInfo(reqPage,numPerPage,pageNaviSize,totalCount);
		System.out.println("pi : "+pi);
		HashMap<String, Integer> param = new HashMap<String, Integer>();
		param.put("start", pi.getStart());
		param.put("end", pi.getEnd());
		param.put("meetNo",meetNo);
		List selectMeetMemberList = meetDao.selectMeetMemberList(param);
		System.out.println("selectMeetMemberList : "+selectMeetMemberList);
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
	public int updateEnrollMember(int memberNo) {
		// TODO Auto-generated method stub
		return meetDao.updateEnrollMember(memberNo);
	}

	public Map circleList(int reqPage, int meetCategory) {
		// TODO Auto-generated method stub
		
		// 게시물조회, 페이징에 필요한 데이터를 취합

		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		//map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("meetCategory",meetCategory);

		// 리스트조회 //pi 랑 meetCategory도 묶어서 보냄
		List circleList = meetDao.selectCircleList(map);
		map.put("meetList", circleList);
		
		
		return map;
	}

	// 모임 카테고리 메뉴바 눌럿을때 모임 리스트 조회
	public Map categoryMeetList(int reqPage, int meetCategory) {
		// TODO Auto-generated method stub
		// 게시물조회, 페이징에 필요한 데이터를 취합

		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);

		// map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("start", pi.getStart());
		map.put("end", pi.getEnd());
		map.put("meetCategory", meetCategory);

		// 리스트조회 //pi 랑 meetCategory도 묶어서 보냄
		List circleList = meetDao.categoryMeetList(map);
		map.put("meetList", circleList);

		return map;
	}

	//meet
	public Meet selectOneMeet(int meetNo) {
		// TODO Auto-generated method stub
		
		return meetDao.selectOneMeet(meetNo);
	}
	//메인페이지에 참여인원 순 모임 조회
	public List meetMargin() {
		// TODO Auto-generated method stub
		List list = meetDao.meetMargin();
		return list;
	}

	public List meetChatList(int meetNo) {
		List meetChat = meetDao.meetChatList(meetNo);
		return meetChat;
	}
	//메인페이지에 인기순 모임조회
	public List meetPopular() {
		// TODO Auto-generated method stub
		List list = meetDao.meetPopular();
		return list;
	}
	//메인페이지에 최신순 모임조회
	public List meetNew() {
		// TODO Auto-generated method stub
		List list = meetDao.meetNew();
		return list;
	}
	//모임 카테고리 메뉴 조회
	public List selectSmallCategory(Category category) {
		// TODO Auto-generated method stub
		List smallCategoryList = meetDao.smallCategoryList(category);
		return smallCategoryList;
	}

	//아이디 받아서 멤버 조회
	public Member selectOneMember(String memberId) {
		// TODO Auto-generated method stub
		return meetDao.selectOneMember(memberId);
	}



	
}

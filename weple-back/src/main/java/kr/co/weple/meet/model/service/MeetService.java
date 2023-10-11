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
import kr.co.weple.meet.model.vo.Meet;

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

	public Map circleList(int reqPage) {
		// TODO Auto-generated method stub
		
		// 게시물조회, 페이징에 필요한 데이터를 취합

		int numPerPage = 12; // 한페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();// 전체게시물수 구해오기
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);

		// 리스트조회
		List circleList = meetDao.selectCircleList(pi);
		//별점 조회 해오기
//		List starRate = meetDao.selectMeetStarRate(pi);
		
		if(circleList.size()>0) {//조회한 리스트가 존재한다면
			for(int i = 0 ; i<circleList.size(); i ++) {
				System.out.println("모임"+circleList.get(i));
				Meet meet = (Meet) circleList.get(i);
				//모임번호 들고가서 후기(review) 조회해오기
				
				//List reviewList = meetDao.selectReviewListStar(meet.getMeetNo());
				//조회한 review 별점 평균내서 선언한 별점 변수에 추가 가 아니라 meetVo 에 추가해야 할듯
				//reviewVo 추가 되고 나서 다시 해야할듯
				
				
			}
			
		}
		
		//map으로 list와 pi 묶어서 리턴
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("meetList", circleList);
		map.put("pi", pi);
		
		
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

	
}

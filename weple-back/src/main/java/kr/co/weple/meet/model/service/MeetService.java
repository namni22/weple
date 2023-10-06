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
		int numPerPage = 10; //한페이지당 게시물수(변경가능)
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = meetDao.totalCount();
		
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List myMeetList = meetDao.selectBoardList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("myMeetList", myMeetList);
		map.put("pi",pi);
		return map;
		
	}

	public Map enrollMember(int reqPage) {
		int numPerPage	= 10;
		int pageNaviSize = 5;
		int totalCount = meetDao.enrollMemberList();
		return null;
	}

	@Transactional
	public int createMeet(Meet meet) {
		// TODO Auto-generated method stub
		System.out.println(meet);
		//모임 장장 select 해와서 meet에 set 은 같은 자료형이라 controller에서 이미 해왔고 여기선 안해도됨
		int result = meetDao.createMeet(meet);
		
		
		return result;
	}
}

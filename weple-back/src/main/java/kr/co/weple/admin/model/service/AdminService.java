package kr.co.weple.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;
import kr.co.weple.admin.model.dao.AdminDao;
import kr.co.weple.meet.model.dao.MeetDao;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.service.MemberService;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private MeetDao meetDao;
	@Autowired
	private Pagination pagination;
	
		//멤버리스트조회
		public Map memberList(int reqPage) {
			int totalCount = adminDao.memberListCount();
			int numPerPage = 10;
			int pageNaviSize = 5;
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List memberList = adminDao.memberList(pi);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("list", memberList);
			map.put("pi", pi);
			return map;
		}
		//멤버 등급 변경
		@Transactional
		public int changeMemberGrade(Member member) {			
			return adminDao.changeMemberGrade(member);			
		}
		//모임 리스트 조회
		public Map meetList(int reqPage) {
			
			int totalCount = adminDao.meetListCount();
			int numPerPage = 10;
			int pageNaviSize = 5;
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List meetList = adminDao.meetList(pi);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("list", meetList);
			map.put("pi", pi);
			return map;
		
		
		}
		//모임 등급 변경
		@Transactional
		public int changeMeetType(Meet meet) {
			
			return adminDao.changeMeetType(meet);
		}
		@Transactional
		public int insertFollower(Meet meet) {
			// TODO Auto-generated method stub
			Member m = memberDao.selectOneMember(meet.getMeetCaptain());
			
			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("meetNo", meet.getMeetNo());
			map.put("memberNo", m.getMemberNo());
			int result = adminDao.insertFollower(map);
			if(result >= 0) {
				return 1;
			}else {
				return 0;
			}
			
			
		}
		//회원 검색 조회
		public Map selectMemberbySubId(String memberId, int reqPage) {
			int totalCount = adminDao.memberListCountbySubId(memberId);
			int numPerPage = 10;
			int pageNaviSize = 5;
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			HashMap<String, Object> mapBySubId = new HashMap<String, Object>();
			mapBySubId.put("pi", pi);
			mapBySubId.put("memberId", memberId);
			List memberListBySubId = adminDao.memberListBySubId(mapBySubId);
			System.out.println("memberListBySubId.size() : " + memberListBySubId.size());
			for(int i=0 ; i<memberListBySubId.size() ; i++)
			{
				
			}
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("list", memberListBySubId);
			map.put("pi", pi);
			return map;
			
		}
		//공지사항 리스트 조회
		public Map boardList(int reqPage) {
			int totalCount = adminDao.boardListCount();
			int numPerPage = 10;
			int pageNaviSize = 5;
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List boardList = adminDao.boardList(pi);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("list", boardList);
			map.put("pi", pi);
			return map;
		}
		public Map reportList(int reqPage) {
			int totalCount = adminDao.reportListCount();
			int numPerPage = 10;
			int pageNaviSize = 5;
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List reportList = adminDao.reportList(pi);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("list", reportList);
			map.put("pi", pi);
			return map;
		}
		@Transactional
		public int changeReportStatus(Report report) {
			if(report.getReportStatus() == 1) {
				report.setReportStatus(0);		
			}
			
			return adminDao.changeReportStatus(report);
		}

		@Transactional
		public int reduceLike(String reportedMember) {
			
			Member m = memberDao.selectOneMember(reportedMember);
			
			if(m.getMemberLike() > 10) {	
				double updateLike = adminDao.reduceLike(m);
				return 1;
			}else {				
				return 0;
			}		

			
		}	
		@Transactional
		public int checkBlacklist(Report report) {
			int reportType = report.getReportType();
			
			Member member = memberDao.selectOneMember(report.getReportedMember());
			Meet meet = meetDao.selectOneMeet(member.getMemberNo());
			Follower follower = adminDao.selectFollowers(member.getMemberNo());
			if(member.getMemberLike() <= 10) {	
				int changeMember= adminDao.changeMemberBlacklist(member.getMemberId());		
				if(meet.getMeetCaptain() == member.getMemberId()) {
					int changeMeetCaptain =adminDao.changeMeetBlacklist(member.getMemberId());
				}
				if(follower.getMemberNo() == member.getMemberNo()) {
					int changeFollower = adminDao.changeFollowerBlacklist(member.getMemberId());
				}					 
				return 1;
			
			}else {
				return 0;
			}
			
			
		}
		public List meetInfo(int reportItemNo) {
			List meetList = adminDao.meetInfo(reportItemNo);			
			return meetList;
		}
		 public String memberInfo(int reportItemNo) {
			 Member m = adminDao.memberInfo(reportItemNo);
			 String memberId = m.getMemberId();
			return memberId;
		}
		
}
		

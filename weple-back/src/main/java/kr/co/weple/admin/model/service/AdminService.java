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
import kr.co.weple.member.model.vo.Member;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private Pagination pagination;
	
		//멤버리스트조회
		public Map memberList(int reqPage) {
			int totalCount = adminDao.totalCount();
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

		
}

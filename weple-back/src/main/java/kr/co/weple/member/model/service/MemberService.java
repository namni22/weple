package kr.co.weple.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private Pagination pagination;

	public Member selectOneMember(String memberId) {
		
		return memberDao.selectOneMember(memberId);
	}
	//멤버리스트조회
	public Map memberList(int reqPage) {
		int totalCount = memberDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List memberList = memberDao.memberList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", memberList);
		map.put("pi", pi);
		return map;
		
	}
	//멤버 등급 변경
	@Transactional
	public int changeMemberGrade(Member member) {
		return memberDao.changeMemberGrade(member);
		
	}
}

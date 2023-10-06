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
	
	public List categoryList() {
		List categoryList = memberDao.categoryList();
		return categoryList;
	}
}

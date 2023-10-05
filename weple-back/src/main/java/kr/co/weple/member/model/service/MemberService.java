package kr.co.weple.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;

	public Member selectOneMember(String memberId) {
		
		return memberDao.selectOneMember(memberId);
	}
}

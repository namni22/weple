package kr.co.weple.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;
import kr.co.weple.JwtUtil;
import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Value("${jwt.secret}")
	private String secretKey;
	
	private long expiredMs;
	
	@Autowired
	private Pagination pagination;

	public MemberService() {
		super();
		expiredMs = 1000*60l;
	}

	public Member selectOneMember(String memberId) {
		
		return memberDao.selectOneMember(memberId);
	}
	
	public List categoryList() {
		List categoryList = memberDao.categoryList();
		return categoryList;
	}

	public List subCategory(int categoryNo) {
		return memberDao.subCategory(categoryNo);
	}
	
	// 회원가입
	@Transactional
	public int insertMember(Member member) {
		return memberDao.insertMember(member);
	}

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if(m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			
			return jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
		}else {
			return "실패";
		}
	}

	public List subCategoryList() {
		return memberDao.subCategoryList();
	}
    //신고 폼에 필요할 option
	public Map selectReportOption(int reportType) {
		HashMap<String , Object> map = new HashMap<String, Object>();
		List list = memberDao.selectReportOption(reportType);
		map.put("reportCategory",list);
		return map;
	}
	
	// 비밀번호 확인
	public int pwCheck(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if(m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return 1;
		}
		return 0;
	}

	// 비밀번호 변경
	@Transactional
	public int pwChangeMember(Member member) {
		return memberDao.changePw(member);
	}
	
	// 회원 정보 수정
	@Transactional
	public int changeInfo(Member member) {
		return memberDao.changeInfo(member);
	}
	@Transactional
	public int insertReport(Report report) {
		// TODO Auto-generated method stub
		return memberDao.insertReport(report);
	}

	// 프로필 내 피드 가져오기
	public List myFeedList(int start, int end, String memberId) {
		int totalCount = memberDao.totalCount(memberId);
		if(start <= totalCount) {
			List myFeedList = memberDao.selectMyFeedList(start, end, memberId);
			return myFeedList;
		}
		return null;
	}

	public Member findId(Member member) {
		Member m = memberDao.findId(member);
		return m;
	}

	public Member findPw(Member member) {
		Member m = memberDao.findPw(member);
		return m;
	}



	
	


}

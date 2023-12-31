package kr.co.weple.member.model.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.JwtUtil;
import kr.co.weple.Pagination;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;

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
		expiredMs = 1000*60*60l;
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

	public List login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());

		if(m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {	
			List list = Arrays.asList(jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs), m.getMemberGrade());
			return list;
		}else {
			return null;
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
	public List myFeedList(int start, int endNum, String memberId) {
		int totalCount = memberDao.totalCount(memberId);
		if(start <= totalCount) {
			List myFeedList = memberDao.selectMyFeedList(start, endNum, memberId);
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

	public List meetJoined(int memberNo) {
		return memberDao.meetJoined(memberNo);
	}

	public List myMeet(String memberId) {
		return memberDao.myMeet(memberId);
	}

	@Transactional
	public int delete(String memberId) {
		return memberDao.delete(memberId);
	}
//회원 선호카테고리 조회
	public List getMemberCategory(String memberId) {
		// TODO Auto-generated method stub
		System.out.println("service 도착");
		String getMemberCategory = memberDao.getMemberCategory(memberId);
		List list = Arrays.asList(getMemberCategory.split(","));
		return list;
	}

	public boolean isMember(String memberId,int meetNo) {
		// TODO Auto-generated method stub
		Follower follower = memberDao.isMember(memberId,meetNo);
		boolean result = false;
		if(follower != null) {
			result = true;
		}
		return result;
	}

	public Member adminCheck(String memberId) {		
		Member admin = memberDao.selectOneMember(memberId);
		return admin;
	}
	
	public int getMemberGrade(String memberId) {
		return memberDao.getMemberGrade(memberId);
	}

	public Member getMemberInfo(String memberId) {
		
		return memberDao.getMemberInfo(memberId);
	}

	public List meetLiked(int memberNo) {
		return memberDao.meetLiked(memberNo);
	}

	public int myFeedTotalCount(String memberId) {
		return memberDao.myFeedTotalCount(memberId);
	}







	
	


}

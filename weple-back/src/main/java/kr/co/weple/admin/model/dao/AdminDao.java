package kr.co.weple.admin.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;

@Mapper
public interface AdminDao {
	
	int memberListCount(); 

	List memberList(PageInfo pi);

	int changeMemberGrade(Member member);
	
	List meetList(PageInfo pi);

	int meetListCount();
	
	int changeMeetType(Meet meet);

	int memberListCountbySubId(String memberId);
	
	List memberListBySubId(HashMap<String, Object> mapBySubId);	
	
	List selectMemberbySubId(String memberId);

	int boardListCount();

	List boardList(PageInfo pi);

	int reportListCount();

	List reportList(PageInfo pi);

	int changeReportStatus(Report report);

	int reduceLike(Member m);

	int changeMemberBlacklist(String memberId);

	int changeMeetBlacklist(String memberId);

	int insertFollower(HashMap<String, Integer> map);

	List meetInfo(int reportItemNo);

	

	



	

	
}

package kr.co.weple.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.member.model.vo.Member;
import kr.co.weple.review.model.vo.Report;

@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);	

	List categoryList();

	List subCategory(int categoryNo);

	int insertMember(Member member);

	List subCategoryList();
	//신고 폼에 필요한 option
	List selectReportOption(int reportType);

	int changePw(Member member);

	int changeInfo(Member member);

	int insertReport(Report report);
	int totalCount(String memberId);

	List selectMyFeedList(int start, int endNum, String memberId);
	
	List<FImage> selectImageList(int feedNo);

	Member findId(Member member);

	Member findPw(Member member);
	
	List meetJoined(int memberNo);

	List myMeet(String memberId);

	int delete(String memberId);

	String getMemberCategory(String memberId);

	Follower isMember(String memberId, int meetNo);

	int getMemberGrade(String memberId);
	
	Member getMemberInfo(String memberId);

	List meetLiked(int memberNo);

	int myFeedTotalCount(String memberId);



	



}

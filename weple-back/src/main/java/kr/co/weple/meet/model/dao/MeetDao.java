package kr.co.weple.meet.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Calendar;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Follower;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;

@Mapper
public interface MeetDao {

	int totalCount();

	List selectMyMeetList(PageInfo pi);

	int enrollMemberList(int meetNo);

	List selectEnrollMemberList(HashMap<String, Integer> param);

	int createMeet(Meet meet);

	int meetMemberList(int meetNo);

	List selectMeetMemberList(HashMap<String, Integer> param);

	List meetList(PageInfo pi);

	int updateEnrollMember(int memberNo);

	List selectCircleList(HashMap<String, Object> map);

	List categoryMeetList(HashMap<String, Object> map);

	Meet selectOneMeet(int meetNo);

	List meetChatList(int meetNo);

	List meetMargin();

	List meetPopular();

	List meetNew();

	List smallCategoryList(Category category);

	int deleteMember(int memberNo);

	int memberLike(String memberId, double changeMemberLike);

	Member selectOneMember(String memberId);

	int meetJoin(HashMap<String, Object> meetJoinInfo);

	Follower isMeetMember(HashMap<String, Object> map);

	int insertMeetChat(String chatContent, String memberId, int meetNo);

	List meetChatLast(int meetNo);

	int addCalendar(Calendar cal);

	List calendarList(int meetNo);

	int removeCalendar(int calNo);

	int selectMemberNo(String memberId);

	Follower status(int meetNo, int selectMemberNo);

	Meet meetCapCheck(int meetNo, String memberId);
	


}

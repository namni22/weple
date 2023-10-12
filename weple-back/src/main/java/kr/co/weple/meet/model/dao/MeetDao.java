package kr.co.weple.meet.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Category;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;

@Mapper
public interface MeetDao {

	int totalCount();

	List selectMyMeetList(PageInfo pi);

	int enrollMemberList(int meetNo);

	

	List selectEnrollMemberList(HashMap<String, Integer> param);

	

	//모임생성
	int createMeet(Meet meet);
	//내 모임 멤버리스트
	int meetMemberList(int meetNo);

	List selectMeetMemberList(HashMap<String, Integer> param);

	List meetList(PageInfo pi);

	int updateEnrollMember(int memberNo);
	//meetList겹쳐서 새로 만듬
	List selectCircleList(HashMap<String, Object> map);
	// 모임 카테고리 메뉴바 눌럿을때 모임 리스트 조회
	List categoryMeetList(HashMap<String, Object> map);

	Meet selectOneMeet(int meetNo);

	List meetChatList(int meetNo);
	//메인페이지에 참여인원 순 모임조회
	List meetMargin();
	//메인페이지에 인기순 모임조회
	List meetPopular();
	//메인페이지에 최신순 모임조회
	List meetNew();

	//모임 카테고리 메뉴 조회
	List smallCategoryList(Category category);

	Member selectOneMember(String memberId);


}

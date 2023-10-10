package kr.co.weple.meet.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Meet;

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

	//meetList겹쳐서 새로 만듬
	List selectCircleList(PageInfo pi);

	Meet selectOneMeet(int meetNo);

	

}

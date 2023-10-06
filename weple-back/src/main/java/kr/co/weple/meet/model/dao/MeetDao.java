package kr.co.weple.meet.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Meet;

@Mapper
public interface MeetDao {

	int totalCount();

	List selectBoardList(PageInfo pi);

	int enrollMemberList(int meetNo);

	

	List selectEnrollMemberList(HashMap<String, Integer> param);

	

	//모임생성
	int createMeet(Meet meet);

	List meetList(PageInfo pi);

	

}

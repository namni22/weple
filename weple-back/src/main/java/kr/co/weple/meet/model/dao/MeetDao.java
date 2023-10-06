package kr.co.weple.meet.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;

@Mapper
public interface MeetDao {

	int totalCount();

	List selectBoardList(PageInfo pi);

	int enrollMemberList();

	List meetList(PageInfo pi);

}

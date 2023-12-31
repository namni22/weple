package kr.co.weple.board.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.board.model.vo.Board;
@Mapper
public interface BoardDao {

	int insertBoard(Board b);

	int totalCount();

	List selectBoardList(PageInfo pi, int boardType);
	
	List selectAllBoardList(PageInfo pi);

	Board selectOneBoard(int boardNo);

	int totalCountByBoardType(int boardType);

	int modify(Board b);

	int deleteBoard(int boardNo);
	
}

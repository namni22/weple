package kr.co.weple.board.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.board.model.vo.Board;
@Mapper
public interface BoardDao {

	int insertBoard(Board b);
	
}

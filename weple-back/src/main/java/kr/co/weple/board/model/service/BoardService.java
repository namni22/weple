package kr.co.weple.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.board.model.dao.BoardDao;
import kr.co.weple.board.model.vo.Board;
@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	
	
	@Transactional
	public int insertBoard(Board b) {
		int result = boardDao.insertBoard(b);
		return result;
	}

}

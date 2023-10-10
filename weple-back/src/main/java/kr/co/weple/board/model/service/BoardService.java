package kr.co.weple.board.model.service;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.PageInfo;
import kr.co.weple.Pagination;
import kr.co.weple.board.model.dao.BoardDao;
import kr.co.weple.board.model.vo.Board;


@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private Pagination pagination;
	
	@Transactional
	public int insertBoard(Board b) {
		int result = boardDao.insertBoard(b);
		return result;
	}


	public HashMap<String, Object> boardList(int reqPage) {
			int numPerPage = 10; 	//한페이지당 게시물 수 
			int pageNaviSize = 5;	//페이지 네비게이션 길이
			int totalCount = boardDao.totalCount();//전체 게시물 수
			//페이징조회 및 페이지 네비 제작에 필요한 데이터를 객체로 받아옴		
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			List boardList = boardDao.selectBoardList(pi);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("boardList", boardList);
			map.put("pi", pi);
			return map;
	}


	public Board selectOneBoard(int boardNo) {
		Board b = boardDao.selectOneBoard(boardNo);
		//List fileList = boardDao.selectOneBoardFile(boardNo);
		//b.setFileList(fileList);
		return b;
	}

}

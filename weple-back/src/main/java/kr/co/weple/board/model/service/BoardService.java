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
import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;



@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	@Transactional
	public int insertBoard(Board b) {
		Member member = memberDao.selectOneMember(b.getMemberId());
		b.setBoardWriter(member.getMemberId());
		int result = boardDao.insertBoard(b);
		return result;
	}


	public HashMap<String, Object> boardList(int reqPage, int boardType) {
			int numPerPage = 10; 	//한페이지당 게시물 수 
			int pageNaviSize = 5;	//페이지 네비게이션 길이
			int totalCount=0;
			if(boardType == 99) {
				totalCount = boardDao.totalCount();//전체 게시물 수
			}else{
				totalCount = boardDao.totalCountByBoardType(boardType);
			}
			//페이징조회 및 페이지 네비 제작에 필요한 데이터를 객체로 받아옴	
			System.out.println("totalCount pi 전"+totalCount);
			
			PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			
			System.out.println("totalCount pi 후"+totalCount);
			List boardList;
			if(boardType == 99)
			{
				boardList = boardDao.selectAllBoardList(pi);				
			}
			else
			{
				boardList = boardDao.selectBoardList(pi, boardType);
			}
			
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

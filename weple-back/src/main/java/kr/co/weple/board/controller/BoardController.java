package kr.co.weple.board.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.weple.FileUtil;
import kr.co.weple.board.model.service.BoardService;
import kr.co.weple.board.model.vo.Board;


@RestController
@RequestMapping(value="/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//게시판 목록
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = boardService.boardList(reqPage);
		return map;
	}
	//게시판 삽입
	@PostMapping(value="/insert")
	public int insertBoard(@ModelAttribute Board b,@RequestAttribute String memberId) {	
		//System.out.println("boardController" + b);
		b.setMemberId(memberId);
		int result = boardService.insertBoard(b);		
		return result;
	}
	//게시판 texteditor 사진
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath=root+"board/editor/";
		String filename= image.getOriginalFilename();
		System.out.println("ContentImg + " + filename);
		String filepath=fileUtil.getFilepath(savepath, filename, image);
		return "/board/editor/"+filepath;
	}
	//게시판 보기
	@GetMapping(value="/view/{boardNo}")
	public Board view(@PathVariable int boardNo) {
		return boardService.selectOneBoard(boardNo);
	}
}

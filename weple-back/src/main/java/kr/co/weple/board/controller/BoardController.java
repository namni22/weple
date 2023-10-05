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

	@PostMapping(value="/insert")
	public int insertBoard(@ModelAttribute Board b) {	
		System.out.println("boardController" + b);
		int result = boardService.insertBoard(b);		
		return result;
	}
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath=root+"board/editor/";
		String filename= image.getOriginalFilename();
		String filepath=fileUtil.getFilepath(savepath, filename, image);
		return "/board/editor/"+filepath;
	}
	
}

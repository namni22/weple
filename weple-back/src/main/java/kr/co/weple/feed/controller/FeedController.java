package kr.co.weple.feed.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.weple.FileUtil;
import kr.co.weple.feed.model.service.FeedService;
import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.feed.model.vo.Feed;

@RestController
@RequestMapping(value="/feed")
public class FeedController {
	@Autowired
	private FeedService feedService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@PostMapping(value="/insert")
	public int insert(
			@ModelAttribute Feed f,
			@ModelAttribute MultipartFile[] fImage
			) {
		//임시 아이디값 넣기 (로그인로직 완료되면 작성자 불러오기)
		f.setFeedWriter("admin");
		String savepath = root+"feed/";
		ArrayList<FImage> imageList = new ArrayList<FImage>();
		for(MultipartFile file : fImage) {				
			String filename = file.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, file);
			FImage fI = new FImage(); //파일 VO변수 생성
			fI.setFImageName(filename); //파일이름세팅
			imageList.add(fI); //배열에 추가
		}
		int result = feedService.insertFeed(f,imageList);
		System.out.println(result);
		return result;
	}

}

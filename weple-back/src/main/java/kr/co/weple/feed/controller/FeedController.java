package kr.co.weple.feed.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
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
	
	//피드작성
	@PostMapping(value="/insert")
	public int insert(
			@ModelAttribute Feed f,
			@ModelAttribute MultipartFile[] fImage,
			@RequestAttribute String memberId
			) {
		f.setFeedWriter(memberId);
		String savepath = root+"feed/";
		ArrayList<FImage> imageList = new ArrayList<FImage>();
		for(MultipartFile file : fImage) {				
			String filename = file.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, file);
			FImage fI = new FImage();
			fI.setFImageName(filepath);
			imageList.add(fI);
		}
		int result = feedService.insertFeed(f,imageList);
		return result;
	}
	
	//피드출력
	@GetMapping(value="/list/{start}/{end}")
	public List list(
			@PathVariable int start,
			@PathVariable int end
			) {
		List feedList = feedService.feedList(start, end);
		return feedList;
	}

	//피드수정
	@PostMapping(value="/modify")
	public int modify(
			@ModelAttribute Feed f,
			@ModelAttribute MultipartFile[] fImage,
			@RequestAttribute String memberId
			) {
		return 0;
	}
}

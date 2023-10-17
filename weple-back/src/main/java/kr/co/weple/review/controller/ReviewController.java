package kr.co.weple.review.controller;

import java.util.ArrayList;
import java.util.List;

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
import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.review.model.service.ReviewService;
import kr.co.weple.review.model.vo.RImage;
import kr.co.weple.review.model.vo.Review;

@RestController
@RequestMapping(value="/review")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//리뷰 리스트 조회
	@GetMapping(value = "/reviewList/{meetNo}")
	public List reviewList(@PathVariable int meetNo) {
		List list = reviewService.reviewList(meetNo);
		return list;
	}
	//리뷰 별점,후기개수 조회
	@GetMapping(value = "/reviewTotal/{meetNo}")
	public List reviewTotal(@PathVariable int meetNo) {
		List list = reviewService.reviewList(meetNo);
		return list;
	}
	//reviewInsert
	@PostMapping(value="/insert")
	public int insert(
			@ModelAttribute Review r,
			@ModelAttribute MultipartFile[] rImage,
			@RequestAttribute String memberId
			) {
		r.setMemberId(memberId);
		String savepath = root+"review/";
		ArrayList<RImage> imageList = new ArrayList<RImage>();
		for(MultipartFile file : rImage) {				
			String filename = file.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, file);
			RImage rI = new RImage();
			rI.setRImageName(filepath);
			imageList.add(rI);
		}
		return reviewService.insertReview(r,imageList);
	}
		
}

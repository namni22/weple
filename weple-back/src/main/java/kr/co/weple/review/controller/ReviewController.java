package kr.co.weple.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.review.model.service.ReviewService;

@RestController
@RequestMapping(value="/review")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	//리뷰 리스트 조회
	@GetMapping(value = "/reviewList/{meetNo}")
	public List reviewList(@PathVariable int meetNo) {
		List list = reviewService.reviewList(meetNo);
		return list;
	}
	
	@GetMapping(value = "/reviewTotal/{meetNo}")
	public List reviewTotal(@PathVariable int meetNo) {
		List list = reviewService.reviewList(meetNo);
		return list;
	}
}

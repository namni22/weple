package kr.co.weple.review.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.weple.review.model.dao.ReviewDao;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;

	public List reviewList(int meetNo) {
		// TODO Auto-generated method stub
		return reviewDao.reviewList(meetNo);
	}
	
}

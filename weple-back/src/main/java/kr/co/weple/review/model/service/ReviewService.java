package kr.co.weple.review.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.review.model.dao.ReviewDao;
import kr.co.weple.review.model.vo.RImage;
import kr.co.weple.review.model.vo.Review;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;

	public List reviewList(int meetNo) {
		// TODO Auto-generated method stub
		return reviewDao.reviewList(meetNo);
	}
//reviewInsert
	@Transactional
	public int insertReview(Review r, ArrayList<RImage> imageList) {
		int result = reviewDao.insertReview(r);
		for(RImage rImage : imageList) {
			rImage.setReviewNo(r.getReviewNo());
			result += reviewDao.insertRImage(rImage);
		}
		return result;
	}
	
}

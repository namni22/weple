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

	public List previewList(int meetNo) {
		// TODO Auto-generated method stub
		return reviewDao.previewList(meetNo);
	}
	public List reviewList(int meetNo, int start, int end) {
		// TODO Auto-generated method stub
		return reviewDao.reviewList(meetNo,start, end);
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
	
	public List preReviewList(int meetNo) {
		// TODO Auto-generated method stub
		return reviewDao.preReviewList(meetNo);
	}
	//reviewModify
		@Transactional
		public List<RImage> modify(Review r, ArrayList<RImage> imageList) {
			List<RImage> delImageList = new ArrayList<RImage>();
			String [] deleteImg = {};
			int result = 0;
			System.out.println(r);
			//�궘�젣�뙆�씪 DB泥섎━
			if(!r.getDeleteImg().equals("")) {
				deleteImg = r.getDeleteImg().split("/");
				delImageList = reviewDao.selectReviewFile(deleteImg);
				result += reviewDao.deleteReviewFile(deleteImg);
			}
			//異붽��븳�뙆�씪 泥섎━
			for(RImage ri : imageList) {
				ri.setReviewNo(r.getReviewNo());
				result += reviewDao.insertRImage(ri);
			}
			//由щ럭�닔�젙
			result += reviewDao.updateReview(r);
			if(result == 1+imageList.size()+deleteImg.length) {
				return delImageList;
			}	
			return null;
		}
}

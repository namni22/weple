package kr.co.weple.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import kr.co.weple.review.model.vo.RImage;
import kr.co.weple.review.model.vo.Review;

@Mapper
public interface ReviewDao {
	List previewList(int meetNo);
	List reviewList(int meetNo,int start, int end);
	List<RImage> selectImageList(int reviewNo);
	int insertReview(Review r);

	int insertRImage(RImage rImage);

	List<RImage> selectReviewFile(String[] deleteImg);

	int deleteReviewFile(String[] deleteImg);

	int updateReview(Review r);

	List preReviewList(int meetNo);

}

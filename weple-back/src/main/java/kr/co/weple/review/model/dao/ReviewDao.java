package kr.co.weple.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.review.model.vo.RImage;
import kr.co.weple.review.model.vo.Review;

@Mapper
public interface ReviewDao {
	List reviewList(int meetNo);

	int insertReview(Review r);

	int insertRImage(RImage rImage);

}

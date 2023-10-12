package kr.co.weple.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewDao {

	List reviewList(int meetNo);

}

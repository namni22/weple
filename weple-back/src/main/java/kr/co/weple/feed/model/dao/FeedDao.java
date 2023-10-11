package kr.co.weple.feed.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.feed.model.vo.Feed;

@Mapper
public interface FeedDao {

	int insertFeed(Feed f);

	int insertFImage(FImage fImage);

	int totalCount();

	List selectFeedList(int start, int end);

	List<FImage> selectImageList(int feedNo);

}

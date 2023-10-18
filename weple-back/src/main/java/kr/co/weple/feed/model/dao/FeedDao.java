package kr.co.weple.feed.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.feed.model.vo.FComment;
import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.feed.model.vo.FLike;
import kr.co.weple.feed.model.vo.Feed;

@Mapper
public interface FeedDao {

	int insertFeed(Feed f);

	int insertFImage(FImage fImage);

	int totalCount();

	List selectFeedList(int start, int end);

	List<FImage> selectImageList(int feedNo);

	List<FImage> selectFeedFile(String[] deleteImg);

	int deleteFeedFile(String[] deleteImg);

	int updateFeed(Feed f);

	int deleteFeed(int feedNo);

	int commentInsert(FComment f);

	List commentList(int feedNo);

	int deleteComment(int fCommentNo);

	List like(int memberNo, int feedNo);

	int deleteLike(int memberNo, int feedNo);

	int insertLike(int memberNo, int feedNo);

	List commentLike(int memberNo, int fCommentNo);

	int commentInsertLike(int memberNo, int fCommentNo);

	int commentDeleteLike(int memberNo, int fCommentNo);

	List one(int feedNo);

}

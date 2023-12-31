package kr.co.weple.feed.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.feed.model.dao.FeedDao;
import kr.co.weple.feed.model.vo.FComment;
import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.feed.model.vo.Feed;
import kr.co.weple.member.model.dao.MemberDao;
import kr.co.weple.member.model.vo.Member;

@Service
public class FeedService {
	@Autowired
	private FeedDao feedDao;
	@Autowired
	private MemberDao memberDao;
	
	//피드작성
	@Transactional
	public int insertFeed(Feed f, ArrayList<FImage> imageList) {
		int result = feedDao.insertFeed(f);
		for(FImage fImage : imageList) {
			fImage.setFeedNo(f.getFeedNo());
			result += feedDao.insertFImage(fImage);
		}
		return result;
	}

	public int totalCount() {
		return feedDao.totalCount();
	}
	//피드출력
	public List feedList(int start, int end) {
		int totalCount = feedDao.totalCount();
		if(start<=totalCount) {	
			List feedList = feedDao.selectFeedList(start,end);
			return feedList;
		}
		return null;
	}

	//피드하나출력
	public Feed one(int feedNo) {
		List list = feedDao.one(feedNo);
		Feed feed = (Feed)list.get(0);
		List fComment =  feedDao.commentList(feedNo);
		feed.setFComment(fComment);
		return feed;
	}
	
	//피드수정
	@Transactional
	public List<FImage> modify(Feed f, ArrayList<FImage> imageList) {
		List<FImage> delImageList = new ArrayList<FImage>();
		String [] deleteImg = {};
		int result = 0;
		//삭제파일 DB처리
		
		if(!f.getDeleteImg().equals("")) {
			deleteImg = f.getDeleteImg().split("/");
			delImageList = feedDao.selectFeedFile(deleteImg);
			result += feedDao.deleteFeedFile(deleteImg);
		}
		//추가한파일 처리
		for(FImage fi : imageList) {
			fi.setFeedNo(f.getFeedNo());
			result += feedDao.insertFImage(fi);
		}
		//피드수정
		result += feedDao.updateFeed(f);
		if(result == 1+imageList.size()+deleteImg.length) {
			return delImageList;
		}	
		return null;
	}

	//피드삭제
	@Transactional
	public List<FImage> delete(int feedNo) {
		List<FImage> list = feedDao.selectImageList(feedNo);
		int result = feedDao.deleteFeed(feedNo);
		if(result >0) {
			return list;
		}
		return null;
	}

	//댓글등록
	@Transactional
	public int commentInsert(FComment f) {
		return feedDao.commentInsert(f);
	}

	//댓글출력
	public List commentList(int feedNo) {
		return  feedDao.commentList(feedNo);
	}

	//댓글삭제
	@Transactional
	public int deleteComment(int fCommentNo) {
		return feedDao.deleteComment(fCommentNo);
	}

	//좋아요조회
	public int like(String memberId, int feedNo) {
		Member m = memberDao.selectOneMember(memberId);
		List list = feedDao.like(m.getMemberNo(),feedNo);
		if(list.size()!=0) {
			return 1;
		}
		return 0;
	}

	//좋아요 클릭이벤트
	@Transactional
	public int updateLike(String memberId, int feedNo) {
		Member m = memberDao.selectOneMember(memberId);
		List list = feedDao.like(m.getMemberNo(),feedNo);
		if(list.size()==0) {
			return feedDao.insertLike(m.getMemberNo(),feedNo);
		}else {
			int result = feedDao.deleteLike(m.getMemberNo(),feedNo);
			if(result>0) {				
				return 2;
			}
		}
		return 0;
	}

	//댓글 좋아요 조회
	public int commentLike(String memberId, int fCommentNo) {
		Member m = memberDao.selectOneMember(memberId);
		List list = feedDao.commentLike(m.getMemberNo(),fCommentNo);
		if(list.size()!=0) {
			return 1;
		}
		return 0;
	}
	//댓글 좋아요 클릭이벤트
	@Transactional
	public int updateCommentLike(String memberId, int fCommentNo) {
		Member m = memberDao.selectOneMember(memberId);
		List list = feedDao.commentLike(m.getMemberNo(),fCommentNo);
		if(list.size()==0) {
			return feedDao.commentInsertLike(m.getMemberNo(),fCommentNo);
		}else {
			int result = feedDao.commentDeleteLike(m.getMemberNo(),fCommentNo);
			if(result>0) {				
				return 2;
			}
		}
		return 0;
	}
	//좋아요개수, 댓글개수 불러오기
	public Feed totalCount(int feedNo) {
		List total = feedDao.totalCountLC(feedNo);
		Feed feed = (Feed)total.get(0);
		return feed;
	}




	
}

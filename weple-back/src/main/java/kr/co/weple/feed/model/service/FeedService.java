package kr.co.weple.feed.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.feed.model.dao.FeedDao;
import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.feed.model.vo.Feed;

@Service
public class FeedService {
	@Autowired
	private FeedDao feedDao;
	
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

	//피드출력
	public List feedList(int start, int end) {
		int totalCount = feedDao.totalCount();
		if(start<=totalCount) {	
			List feedList = feedDao.selectFeedList(start,end);
			return feedList;
		}
		return null;
	}

	//피드수정
	@Transactional
	public List<FImage> modify(Feed f, ArrayList<FImage> imageList) {
		List<FImage> delImageList = new ArrayList<FImage>();
		String [] deleteImg = {};
		int result = 0;
		System.out.println(f);
		//삭제파일 DB처리
		if(!f.getDeleteImg().equals("")) {
			System.out.println("gg : "+f.getDeleteImg());
			deleteImg = f.getDeleteImg().split("/");
			System.out.println(deleteImg);
			delImageList = feedDao.selectFeedFile(deleteImg);
			System.out.println(delImageList);
			result += feedDao.deleteFeedFile(deleteImg);
			System.out.println("result : "+result);
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
	
}

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
	
}

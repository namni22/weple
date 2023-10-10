package kr.co.weple.feed.model.service;

import java.util.ArrayList;

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

	@Transactional
	public int insertFeed(Feed f, ArrayList<FImage> imageList) {
		int result = feedDao.insertFeed(f);
		
		for(FImage fImage : imageList) {
			fImage.setFeedNo(f.getFeedNo());
			result += feedDao.insertFImage(fImage);
		}
		return result;
	}
	
}

package kr.co.weple.feed.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.weple.FileUtil;
import kr.co.weple.feed.model.service.FeedService;
import kr.co.weple.feed.model.vo.FComment;
import kr.co.weple.feed.model.vo.FImage;
import kr.co.weple.feed.model.vo.FLike;
import kr.co.weple.feed.model.vo.Feed;

@RestController
@RequestMapping(value="/feed")
public class FeedController {
	@Autowired
	private FeedService feedService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//피드작성
	@PostMapping(value="/insert")
	public int insert(
			@ModelAttribute Feed f,
			@ModelAttribute MultipartFile[] fImage,
			@RequestAttribute String memberId
			) {
		f.setFeedWriter(memberId);
		String savepath = root+"feed/";
		ArrayList<FImage> imageList = new ArrayList<FImage>();
		for(MultipartFile file : fImage) {				
			String filename = file.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, file);
			FImage fI = new FImage();
			fI.setFImageName(filepath);
			imageList.add(fI);
		}
		return feedService.insertFeed(f,imageList);
	}
	
	//피드출력
	@GetMapping(value="/list/{start}/{end}")
	public List list(
			@PathVariable int start,
			@PathVariable int end
			) {
		return feedService.feedList(start, end);
	}
	//피드하나출력
		@GetMapping(value="/one/{feedNo}")
		public Feed one(@PathVariable int feedNo) {
			return feedService.one(feedNo);
		}

	//피드수정
	@PostMapping(value="/modify")
	public int modify(
			@ModelAttribute Feed f,
			@ModelAttribute MultipartFile[] fImage,
			@RequestAttribute String memberId
			) {
		System.out.println(fImage);
		String savepath = root+"feed/";
		ArrayList<FImage> imageList = new ArrayList<FImage>();
		if(fImage != null) {			
			for(MultipartFile file : fImage) {				
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				FImage fI = new FImage();
				fI.setFImageName(filepath);
				imageList.add(fI);
			}
		}
		List<FImage> delImageList = feedService.modify(f,imageList);
		//물리적위치 파일 삭제
		if(delImageList != null) {	
			for(FImage fi : delImageList) {
				File deleteImg = new File(savepath+fi.getFImageName());
				deleteImg.delete();
			}
			return 1;
		}
		return 0;
	}
	//피드삭제
	@GetMapping(value="/delete/{feedNo}")
	public int delete(@PathVariable int feedNo) {
		int result = 0;
		//해당게시물 첨부파일 삭제를 위해 파일목록을 결과로 받음
		List<FImage> imageList = feedService.delete(feedNo);
		//물리적위치 파일 삭제
		String savepath = root+"feed/";
		//파일길이만큼 파일삭제
		for(FImage fi : imageList) {
			File file = new File (savepath+fi.getFImageName());
			file.delete();
			result++;
		}
		return result;
	}
	//좋아요조회
	@PostMapping(value="/like")
	public int like(
			@RequestBody Feed f,
			@RequestAttribute String memberId) {
		return feedService.like(memberId,f.getFeedNo());
	}
	//좋아요클릭이벤트
	@PostMapping (value="/updateLike")
	public int updateLike(@RequestBody Feed f,
			@RequestAttribute String memberId) {
		return feedService.updateLike(memberId,f.getFeedNo());
	}
	
	//댓글등록
	@PostMapping(value="/comment/insert")
	public int commentInsert(
			@ModelAttribute FComment f,
			@RequestAttribute String memberId) {
		f.setFCommentWriter(memberId);
		f.setCrnNo(f.getFCommentRefNo()==0?null:f.getFCommentRefNo());
		return feedService.commentInsert(f);
	}
	//댓글출력
	@GetMapping(value="/comment/list/{feedNo}")
	public List commentList(
			@PathVariable int feedNo) {
		return feedService.commentList(feedNo);
		
	}
	//댓글삭제
	@GetMapping(value="/comment/delete/{fCommentNo}")
	public int deletecomment(@PathVariable int fCommentNo) {
		return feedService.deleteComment(fCommentNo);
	}
	//댓글좋아요조회
	@PostMapping(value="/commentLike")
	public int commentLike(
			@RequestBody FComment fc,
			@RequestAttribute String memberId) {
		return feedService.commentLike(memberId,fc.getFCommentNo());
	}
	//좋아요클릭이벤트
	@PostMapping (value="/updateCommentLike")
	public int updateCommentLike(@RequestBody FComment fc,
			@RequestAttribute String memberId) {
		return feedService.updateCommentLike(memberId,fc.getFCommentNo());
	}
	
}

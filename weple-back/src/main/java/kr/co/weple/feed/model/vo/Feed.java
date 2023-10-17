package kr.co.weple.feed.model.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="feed")
public class Feed {
	private int feedNo;
	private String feedWriter;
	private String feedContent;
	private String feedDate;
	private List imageList;
	private String deleteImg; //피드이미지삭제번호
	private String memberImage;//작성자 프로필이미지
	private int totalLike;//좋아요개수
	private int totalComment;//댓글개수
}

package kr.co.weple.review.model.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="review")
public class Review {
	private int reviewNo;
	private String reviewContent;
	private double reviewStar;
	private String reviewDate;
	private String memberId;
	private int meetNo;
	//별점평균
	private double avgStar;
	//삭제번호
	private String deleteImg;
	private List imageList;
	private String memberImage;//작성자 프로필이미지
	private String rimageName;	//리뷰 썸네일
}

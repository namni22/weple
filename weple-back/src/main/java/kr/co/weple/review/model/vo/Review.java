package kr.co.weple.review.model.vo;

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
}

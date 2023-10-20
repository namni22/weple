package kr.co.weple.meet.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WishList {
	private String meetNo;
	private String memberNo;
	
	private int meetLikeCount;

}

package kr.co.weple.meet.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "follower")
public class Follower {
	private int followerStatus;
	private int meetNo;
	private int memberNo;
	
	//추가 회원 정보
	private String memberId;
	private String memberGender;
	private String memberImage;
	private String memberLike;
	private int isLike;
}

package kr.co.weple.meet.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "enrollMember")
public class EnrollMember {
	private String memberId;
	private String memberGender;
	private String memberImage;
	private String memberLike;
	private int followerStatus;
	private int meetNo;
	private int memberNo;
}

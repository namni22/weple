package kr.co.weple.member.model.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="member")
public class Member {
	private int memberNo;
	private String memberId;
	private String memberName;
	private String memberPw;
	private String memberEmail;
	private String memberPhone;
	private String memberBirth;
	private String memberGender;
	private String memberImage;
	private int memberLike;
	private int memberGrade;
	private String memberCategory;
	private int memberMeet;
}

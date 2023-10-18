package kr.co.weple.member.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "memberLike")
public class MemberLike {
	private int mlikeGiverNo;
	private int mlikeTakerNo;
	private int meetNo;
}

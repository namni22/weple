package kr.co.weple.feed.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="fLike")
public class FLike {
	private int feedNo;
	private int memberNo;
}

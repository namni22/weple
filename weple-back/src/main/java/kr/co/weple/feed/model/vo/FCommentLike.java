package kr.co.weple.feed.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="fCommentLike")
public class FCommentLike {
	private int fCommentNo;
	private int memberNo;
}

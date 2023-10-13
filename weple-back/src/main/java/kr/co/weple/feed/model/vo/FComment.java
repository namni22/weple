package kr.co.weple.feed.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="fComment")
public class FComment {
	private int fCommentNo;
	private int feedNo;
	private String fCommentContent;
	private String fCommentDate;
	private String fCommentWriter;
	private int fCommentRefNo;
	private Object crnNo;
}

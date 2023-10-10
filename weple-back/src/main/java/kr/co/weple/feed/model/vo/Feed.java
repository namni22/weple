package kr.co.weple.feed.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="feed")
public class Feed {
	private int feedNo;
	private String feedWriter;
	private String feedContent;
	private String feedDate;
}

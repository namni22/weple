package kr.co.weple.feed.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="fImage")
public class FImage {
	private int fImageNo;
	private int feedNo;
	private String fImageName;
}

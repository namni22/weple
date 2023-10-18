package kr.co.weple.review.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="rImage")
public class RImage {
		private int rImageNo;
		private int reviewNo;
		private String rImageName;
}

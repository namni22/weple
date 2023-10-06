package kr.co.weple.meet.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="category")

public class Category {
	private int categoryNo;
	private String categoryName;
	private int categoryRefNo;
}

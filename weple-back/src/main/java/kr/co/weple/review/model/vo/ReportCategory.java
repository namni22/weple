package kr.co.weple.review.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "reportCategory")
public class ReportCategory {
	private int reportCategoryNo;
	private int reportType;
	private String reportCategoryContent;
}

package kr.co.weple.review.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "report")
public class Report {
	private int reportNo;
	private int reportItemNo;
	private String reportContent;
	private String reportedMember;
	private int reportStatus;
	private String reportMember;
	private int reportCategoryNo;
	private int reportType;
	private String reportDate;
	private String reportCategoryContent;
}

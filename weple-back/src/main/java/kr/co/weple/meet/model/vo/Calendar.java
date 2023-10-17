package kr.co.weple.meet.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("calendar")
public class Calendar {
	private int calNo;
	private int meetNo;
	private String calTitle;
	private String calContent;
	private String calStart;
	private String calEnd;
}

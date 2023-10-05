package kr.co.weple.meet.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "meet")
public class Meet {
	private int meetNo;
	private String meetDate;
	private String meetTitle;
	private String meetContentS;
	private String meetContentD;
	private int meetMargin;
	private int meetPrepare;
	private int meetCategory;
	private String meetAddress1;
	private String meetAddrsee2;
	private int meetLatitude;
	private int meetLongitude;
	private String meetThumbNail;
	private int meetType;
	private String meetId;
}

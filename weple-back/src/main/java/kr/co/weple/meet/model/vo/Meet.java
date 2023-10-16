package kr.co.weple.meet.model.vo;

import java.util.List;

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
	private int meetTotal;
	private int meetMargin;
	private String meetPrepare;
	private int meetCategory;
	private String meetAddress1;
	private String meetAddress2;
	private int meetLatitude;
	private int meetLongitude;
	private String meetThumbNail;
	private int meetType;
	private String meetCaptain;
	
	//준비물 추가를 위한 변수
	private List meetPrepareList;

	//모임 별점
	private double reviewStar;
	private int reviewCount;


}

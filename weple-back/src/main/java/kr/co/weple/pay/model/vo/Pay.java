package kr.co.weple.pay.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="pay")
public class Pay {
	private int payNo;
	private int memberNo;
	private int payCount;
	private int payPrice;
	private String payDate;
}

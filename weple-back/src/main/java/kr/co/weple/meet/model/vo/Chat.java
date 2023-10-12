package kr.co.weple.meet.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "chat")
public class Chat {
	private int chatNo;
	private String chatContent;
	private String memberId;
	private int meetNo;
	private String chatDate;
	
	//추가로 필요한 값
	private String memberImage;
}

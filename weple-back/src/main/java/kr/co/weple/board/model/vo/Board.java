package kr.co.weple.board.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="board")
public class Board {
	private int boardNo;
	private int boardType;
	private String boardTitle;
	private String boardContent;
	private String boardDate;
	private String boardWriter;

	
}

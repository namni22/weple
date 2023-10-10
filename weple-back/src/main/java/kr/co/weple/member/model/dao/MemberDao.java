package kr.co.weple.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.member.model.vo.Member;

@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);	

	List categoryList();

	List subCategory(int categoryNo);

}

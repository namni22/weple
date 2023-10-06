package kr.co.weple.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.member.model.vo.Member;

@Mapper
public interface AdminDao {
	
	int totalCount();

	List memberList(PageInfo pi);

	int changeMemberGrade(Member member);
}

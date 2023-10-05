package kr.co.weple.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.member.model.vo.Member;

@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);

}

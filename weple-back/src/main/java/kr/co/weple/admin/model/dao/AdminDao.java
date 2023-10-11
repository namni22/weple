package kr.co.weple.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.PageInfo;
import kr.co.weple.meet.model.vo.Meet;
import kr.co.weple.member.model.vo.Member;

@Mapper
public interface AdminDao {
	
	int memberListCount(); 

	List memberList(PageInfo pi);

	int changeMemberGrade(Member member);
	
	List meetList(PageInfo pi);

	int meetListCount();

	int changeMeetType(Meet meet);

	Member selectOneMember(String memberId);

	
}

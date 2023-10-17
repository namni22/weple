package kr.co.weple.pay.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.weple.pay.model.vo.Pay;
@Mapper
public interface PayDao {

	int paySuccess(Pay pay);

	int meetCountUp(int memberNo, int payCount);


}

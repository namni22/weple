package kr.co.weple.payment.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.weple.pay.model.dao.PayDao;
import kr.co.weple.pay.model.vo.Pay;

@Service
public class PayService {
	@Autowired 
	PayDao payDao;
	@Transactional
	public int paySuccess(Pay pay) {
		int result = payDao.paySuccess(pay);
		if(result > 0) {
			result = payDao.meetCountUp(pay.getMemberNo(), pay.getPayCount());
		}
		return result;
	}

}

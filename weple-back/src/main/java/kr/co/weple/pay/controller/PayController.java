package kr.co.weple.pay.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.pay.model.vo.Pay;
import kr.co.weple.payment.model.service.PayService;

@RestController
@RequestMapping(value = "/payment")
public class PayController {
	@Autowired
	private PayService payService;
	
	@PostMapping(value = "/paySuccess")
	public int paySuccess(@RequestBody Pay pay) {
		int result = payService.paySuccess(pay);

		return result;
	}
}

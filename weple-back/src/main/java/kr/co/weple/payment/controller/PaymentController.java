package kr.co.weple.payment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.weple.payment.model.service.PaymentService;

@RestController
@RequestMapping(value = "/payment")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping(value = "/paySuccess")
	public int paySuccess() {
		return 0;
	}
}

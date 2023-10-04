package kr.co.weple.meet.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.weple.meet.model.dao.MeetDao;

@Service
public class MeetService {
	@Autowired
	private MeetDao meetDao;

	public void myMeetList(int reqPage) {
		//
		
	}
}

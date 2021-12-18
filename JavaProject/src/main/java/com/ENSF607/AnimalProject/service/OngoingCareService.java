package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.OngoingCare;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.OngoingCareRepository;
import com.ENSF607.AnimalProject.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.List;

@Service
public class OngoingCareService {

	@Autowired
	OngoingCareRepository ongoingCareRepository;

	@Autowired
	UserRepo userRepo;

	public List<OngoingCare> getOngoingCareByanimalId(Long ucid, String pass, Long animalid) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null){
			throw new AuthenticationException("Only registered users can see all health records");
		}
		return ongoingCareRepository.findByanimalid(animalid);
	}



	public OngoingCare addOngoingCare(Long ucid, String pass, OngoingCare care) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null || !(u.getRole().equals("Health Technician") || u.getRole().equals("Care Attendant") ||
				u.getRole().equals("Admin"))){
			throw new AuthenticationException("Only Admin, care attendant, and health technician can add ongoing care record");
		}
        return ongoingCareRepository.save(care);
    }

}

package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.OngoingCare;
import com.ENSF607.AnimalProject.repository.OngoingCareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OngoingCareService {

	@Autowired
	OngoingCareRepository ongoingCareRepository;

	public List<OngoingCare> searchByanimalId(Long animalid){
		return ongoingCareRepository.findByanimalid(animalid);
	}

    public List<OngoingCare> getAllOngoingCare(){
        return ongoingCareRepository.findAll();
    }


	public OngoingCare addOngoingCare(OngoingCare care){
        return ongoingCareRepository.save(care);
    }

}

package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.AnimalStatus;
import com.ENSF607.AnimalProject.repository.AnimalStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalStatusService {

    @Autowired
    AnimalStatusRepository animalStatusRepository;

    public AnimalStatus getAnimalStatusByAnimalId (String animalName){
       // return animalStatusRepository.getByAnimalId(animalId);
        return animalStatusRepository.findAllByanimalName(animalName);
    }

    public List<AnimalStatus> getAllAnimalStatus(){
        return animalStatusRepository.findAll();
    }
}

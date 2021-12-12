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


//

    public List<AnimalStatus> getAnimalStatusByStage(String stage){
        return animalStatusRepository.findAllBystage(stage);
    }

    public AnimalStatus getAnimalStatusByanimalid(Long animalid){
        return animalStatusRepository.findAllByanimalid(animalid);
    }

    public AnimalStatus getAnimalStatusBysymptoms(String symptoms){
        return animalStatusRepository.findAllBysymptoms(symptoms);
    }

    public AnimalStatus getAnimalStatusByStatusId(Long statusid){
        return animalStatusRepository.findBystatusid(statusid);
    }


    public AnimalStatus addAnimalStatus(AnimalStatus animalStatus){
        return animalStatusRepository.save(animalStatus);
    }

    public List<AnimalStatus> getAllAnimalStatus(){
        return animalStatusRepository.findAll();
    }
}

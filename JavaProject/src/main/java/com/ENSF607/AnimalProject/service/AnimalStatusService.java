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


//    public AnimalStatus getAnimalStatusByAnimalId (Integer animalid){
//       // return animalStatusRepository.getByAnimalId(animalId);
//        return animalStatusRepository.findAllByanimalid(animalid);
//    }

    public List<AnimalStatus> getAnimalStatusByStage(String stage){
        return animalStatusRepository.findAllBystage(stage);
    }

    public Integer addAnimalStatus (Integer careattid, String animalName, String date, String processDescription,
                                    Integer temperature, Integer weight, Integer heartRate, String symptoms, String diagnoseDrug,
                                    Integer vetid){
        return animalStatusRepository.addAnimalStatus(careattid,animalName,date,processDescription,temperature,weight,
                heartRate,symptoms,diagnoseDrug,vetid);
    }

    ///////////////////////////// new

    public List<AnimalStatus> getAllAnimalStatus(){
        return animalStatusRepository.findAll();
    }
}

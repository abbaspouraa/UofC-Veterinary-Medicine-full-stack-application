package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.AnimalStatus;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.AnimalStatusRepository;
import com.ENSF607.AnimalProject.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.List;

@Service
public class AnimalStatusService {

    @Autowired
    AnimalStatusRepository animalStatusRepository;

    @Autowired
    UserRepo userRepo;


//

    public List<AnimalStatus> getAnimalStatusByStage(Long ucid, String pass, String stage) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null){
            throw new AuthenticationException("Only registered users can access");
        }
        return animalStatusRepository.findAllBystage(stage);
    }

    public List<AnimalStatus> getAnimalStatusByanimalid(Long ucid, String pass, Long animalid) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null || !(u.getRole().equals("Health Technician") || u.getRole().equals("Care Attendant") ||
                u.getRole().equals("Admin"))){
            throw new AuthenticationException("Only Admin, care attendant, and health technician can access AnimalStatus");
        }
        return animalStatusRepository.findAllByanimalid(animalid);
    }



    public AnimalStatus getAnimalStatusByStatusId(Long ucid, String pass,Long statusid) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null || !(u.getRole().equals("Health Technician") || u.getRole().equals("Care Attendant") ||
                u.getRole().equals("Admin"))){
            throw new AuthenticationException("Only Admin, care attendant, and health technician can access record");
        }
        return animalStatusRepository.findBystatusid(statusid);
    }


    public AnimalStatus addAnimalStatus(Long ucid, String pass, AnimalStatus animalStatus) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null || !(u.getRole().equals("Health Technician") || u.getRole().equals("Care Attendant") ||
                u.getRole().equals("Admin"))){
            throw new AuthenticationException("Only Admin, care attendant, and health technician can add treatment record");
        }
        return animalStatusRepository.save(animalStatus);
    }

    public List<AnimalStatus> getAllAnimalStatus(){
        return animalStatusRepository.findAll();
    }

    public AnimalStatus updateAnimalStatus (Long ucid, String pass, Long statusid, AnimalStatus animalStatus) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null || !(u.getRole().equals("Health Technician") || u.getRole().equals("Care Attendant") ||
                u.getRole().equals("Admin"))){
            throw new AuthenticationException("Only Admin, care attendant, and health technician can add ongoing care record");
        }
        AnimalStatus updateAnimalStatus = animalStatusRepository.findBystatusid(statusid);

        updateAnimalStatus.setStage(animalStatus.getStage());
        updateAnimalStatus.setProcessDescription(animalStatus.getProcessDescription());
        updateAnimalStatus.setDiagnoseDrug(animalStatus.getDiagnoseDrug());
        updateAnimalStatus.setVetid(animalStatus.getVetid());
        updateAnimalStatus.setSymptoms(animalStatus.getSymptoms());
        updateAnimalStatus.setHeartRate(animalStatus.getHeartRate());
        updateAnimalStatus.setTemperature(animalStatus.getTemperature());
        return animalStatusRepository.save(updateAnimalStatus);
    }
}

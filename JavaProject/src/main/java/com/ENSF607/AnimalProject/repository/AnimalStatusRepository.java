package com.ENSF607.AnimalProject.repository;

import com.ENSF607.AnimalProject.model.AnimalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalStatusRepository extends JpaRepository <AnimalStatus, Long> {

//    @Query(value = "SELECT * FROM ANIMAL_STATUS WHERE animalid = :animalid", nativeQuery = true)
//    AnimalStatus getByAnimalId(@Param("animalid") Integer animalId);

    AnimalStatus findAllByanimalid(Long animalid);
    List<AnimalStatus> findAllBystage(String stage);

    AnimalStatus findAllBysymptoms(String symptoms);

    AnimalStatus findBystatusid(Long statusid);


//    @Modifying
//    @Transactional
//    @Query(value = "INSERT INTO ANIMAL_STATUS (Stage,CareAttId,Animal_Name,Date,Process_Description,Temperature," +
//            "Weight,Heart_Rate,Symptoms,Diagnose_Drug,VetId) VALUES ('Started', ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)", nativeQuery = true)
//    Integer addAnimalStatus(Integer careattid, String animalName, String date, String processDescription,
//                            Integer temperature, Integer weight, Integer heartRate, String symptoms, String diagnoseDrug,
//                            Integer vetid);
}

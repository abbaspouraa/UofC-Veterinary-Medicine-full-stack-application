package com.ENSF607.AnimalProject.repository;

import com.ENSF607.AnimalProject.model.AnimalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalStatusRepository extends JpaRepository <AnimalStatus, Integer> {

//    @Query(value = "SELECT * FROM ANIMAL_STATUS WHERE animalid = :animalid", nativeQuery = true)
//    AnimalStatus getByAnimalId(@Param("animalid") Integer animalId);

    AnimalStatus findAllByanimalName(String animalName);

}

package com.ENSF607.AnimalProject.controller;


import com.ENSF607.AnimalProject.model.AnimalStatus;
import com.ENSF607.AnimalProject.service.AnimalStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/treatment")
public class AnimalStatusController {

    @Autowired
    AnimalStatusService animalStatusService;

//    @GetMapping("/{id}")
//    public ResponseEntity<AnimalStatus> getAnimalStatusByAnimalId(@PathVariable Integer id){
//        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByAnimalId(id));
//    }

    @GetMapping("/getStage/{stage}")
    public ResponseEntity<List<AnimalStatus>> getAllAnimalStatusByStage(@PathVariable String stage){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByStage(stage));
    }

    @PostMapping("/{careattid}/{animalName}/{date}/{processDescription}/{temperature}/{weight}/" +
            "{heartRate}/{symptoms}/{diagnoseDrug}/{vetid}")
    public ResponseEntity<Void> addAnimalStatus(@PathVariable Integer careattid,
                                                @PathVariable String animalName,
                                                @PathVariable String date,
                                                @PathVariable String processDescription,
                                                @PathVariable Integer temperature,
                                                @PathVariable Integer weight,
                                                @PathVariable Integer heartRate,
                                                @PathVariable String symptoms,
                                                @PathVariable String diagnoseDrug,
                                                @PathVariable Integer vetid){
        animalStatusService.addAnimalStatus(careattid,animalName,date,processDescription,temperature,weight,
                heartRate,symptoms,diagnoseDrug,vetid);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping()
    public ResponseEntity<List<AnimalStatus>> getAllAnimalStatus(){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAllAnimalStatus());
    }
}

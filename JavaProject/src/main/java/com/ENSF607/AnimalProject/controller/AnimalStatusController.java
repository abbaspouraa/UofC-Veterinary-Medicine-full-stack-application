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

    @GetMapping("/stage/{stage}")
    public ResponseEntity<List<AnimalStatus>> getAllAnimalStatusByStage(@PathVariable String stage){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByStage(stage));
    }

    @GetMapping("/record/{animalid}")
    public ResponseEntity<List<AnimalStatus>> getAnimalStatusByAnimalId(@PathVariable Long animalid){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByanimalid(animalid));
    }

//    @GetMapping("/{symptoms}")
//    public ResponseEntity<AnimalStatus> getAnimalStatusBysymptoms(@PathVariable String symptoms){
//        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusBysymptoms(symptoms));
//    }

    @GetMapping("/{statusid}")
    public ResponseEntity<AnimalStatus> getAnimalStatusByStatusId(@PathVariable Long statusid){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByStatusId(statusid));
    }


    @PutMapping("/{statusid}")
    public ResponseEntity<AnimalStatus> updateAnimalStatus(@PathVariable Long statusid,
                                                           @RequestBody AnimalStatus animalStatus){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.updateAnimalStatus(statusid,animalStatus));
    }


    @PostMapping("/")
    public ResponseEntity<AnimalStatus> addAnimalStatus (@RequestBody AnimalStatus animalStatus){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.addAnimalStatus(animalStatus));
    }

//    @PostMapping("/{careattid}/{animalName}/{date}/{processDescription}/{temperature}/{weight}/" +
//            "{heartRate}/{symptoms}/{diagnoseDrug}/{vetid}")
//    public ResponseEntity<Void> addAnimalStatus(@PathVariable Integer careattid,
//                                                @PathVariable String animalName,
//                                                @PathVariable String date,
//                                                @PathVariable String processDescription,
//                                                @PathVariable Integer temperature,
//                                                @PathVariable Integer weight,
//                                                @PathVariable Integer heartRate,
//                                                @PathVariable String symptoms,
//                                                @PathVariable String diagnoseDrug,
//                                                @PathVariable Integer vetid){
//        animalStatusService.addAnimalStatus(careattid,animalName,date,processDescription,temperature,weight,
//                heartRate,symptoms,diagnoseDrug,vetid);
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }

//    @GetMapping()
//    public ResponseEntity<List<AnimalStatus>> getAllAnimalStatus(){
//        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAllAnimalStatus());
//    }
}

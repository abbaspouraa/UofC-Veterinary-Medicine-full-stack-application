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

    @GetMapping("/{name}")
    public ResponseEntity<AnimalStatus> getAnimalStatusByAnimalId(@PathVariable String name){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByAnimalId(name));
    }

    @GetMapping()
    public ResponseEntity<List<AnimalStatus>> getAllAnimalStatus(){
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAllAnimalStatus());
    }
}

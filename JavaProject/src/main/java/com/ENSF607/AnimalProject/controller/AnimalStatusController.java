package com.ENSF607.AnimalProject.controller;


import com.ENSF607.AnimalProject.model.AnimalStatus;
import com.ENSF607.AnimalProject.service.AnimalStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
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

    @GetMapping("/stage/{ucid}/{pass}/{stage}")
    public ResponseEntity<List<AnimalStatus>> getAllAnimalStatusByStage(@PathVariable Long ucid,
                                                                        @PathVariable String pass,
                                                                        @PathVariable String stage) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByStage(ucid,pass,stage));
    }

    @GetMapping("/record/{ucid}/{pass}/{animalid}")
    public ResponseEntity<List<AnimalStatus>> getAnimalStatusByAnimalId(@PathVariable Long ucid,
                                                                        @PathVariable String pass,
                                                                        @PathVariable Long animalid) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByanimalid(ucid, pass, animalid));
    }



    @GetMapping("/{ucid}/{pass}/{statusid}")
    public ResponseEntity<AnimalStatus> getAnimalStatusByStatusId(@PathVariable Long ucid,
                                                                  @PathVariable String pass,
                                                                  @PathVariable Long statusid) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.getAnimalStatusByStatusId(ucid, pass, statusid));
    }


    @PutMapping("/{ucid}/{pass}/{statusid}")
    public ResponseEntity<AnimalStatus> updateAnimalStatus(@PathVariable Long ucid,
                                                           @PathVariable String pass,
                                                           @PathVariable Long statusid,
                                                           @RequestBody AnimalStatus animalStatus) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.updateAnimalStatus(ucid,pass,statusid,animalStatus));
    }


    @PostMapping("/{ucid}/{pass}")
    public ResponseEntity<AnimalStatus> addAnimalStatus (@PathVariable Long ucid,
                                                         @PathVariable String pass,
                                                         @RequestBody AnimalStatus animalStatus) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(animalStatusService.addAnimalStatus(ucid, pass, animalStatus));
    }

}

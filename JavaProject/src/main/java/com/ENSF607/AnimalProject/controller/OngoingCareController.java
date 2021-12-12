package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.OngoingCare;
import com.ENSF607.AnimalProject.service.OngoingCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/ongoingcare")
public class OngoingCareController{

	@Autowired
	OngoingCareService ongoingCareService;

	@GetMapping("/{animalid}")
	public ResponseEntity<List<OngoingCare>> getOngoingCareByAnimalId(@PathVariable Long animalid){
		return ResponseEntity.status(HttpStatus.OK).body(ongoingCareService.searchByanimalId(animalid));
	}

	@PostMapping("/")
    public ResponseEntity<OngoingCare> addOngoingCare(@RequestBody OngoingCare care){
        return ResponseEntity.status(HttpStatus.OK).body(ongoingCareService.addOngoingCare(care));
    }

}

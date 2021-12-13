package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.OngoingCare;
import com.ENSF607.AnimalProject.service.OngoingCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/ongoingcare")
public class OngoingCareController{

	@Autowired
	OngoingCareService ongoingCareService;

	@GetMapping("/{ucid}/{pass}/{animalid}")
	public ResponseEntity<List<OngoingCare>> getOngoingCareByAnimalId(@PathVariable Long ucid,
																	  @PathVariable String pass,
																	  @PathVariable Long animalid) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body(ongoingCareService.getOngoingCareByanimalId(ucid,pass,animalid));
	}

	@PostMapping("/{ucid}/{pass}")
    public ResponseEntity<OngoingCare> addOngoingCare(@PathVariable Long ucid,
													  @PathVariable String pass,
													  @RequestBody OngoingCare care) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(ongoingCareService.addOngoingCare(ucid,pass,care));
    }

}

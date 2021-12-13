package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.service.AnimalService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/animal")
public class AnimalController {


	@Autowired
	private AnimalService animalService;

	@GetMapping("/{ucid}/{pass}")
	public ResponseEntity<List<Animal>> getAllData(
			@PathVariable Long ucid,
			@PathVariable String pass
	) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAllData(ucid, pass));
	}

	@GetMapping("/{ucid}/{pass}/{id}")
	public ResponseEntity<Animal> getAnimalById(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable Long id
	) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body((animalService.getAnimalById(ucid, pass, id)));
	}

	@GetMapping("/getRequested/{ucid}/{pass}/{request}")
	public ResponseEntity<List<Animal>> getRequestedAnimals(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable String request
	) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getRequestedAnimals(ucid, pass, request));
	}

	@GetMapping("/getByMe/{ucid}/{pass}")
	public ResponseEntity<List<Animal>> getRequestedByMe(
			@PathVariable Long ucid,
			@PathVariable String pass
	) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAllRequestedByMe(ucid, pass));
	}

	@GetMapping("/{ucid}/{pass}/{name}")
	public List<Animal> searchByName(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable String name
	) throws AuthenticationException {
		return animalService.searchByName(ucid, pass, name);
	}
	
	@PostMapping("/{ucid}/{pass}")
    public String addAnimal(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@RequestBody Animal animal
	) throws AuthenticationException {
        return animalService.addAnimal(ucid, pass, animal);
    }
	
	@GetMapping("/{ucid}/{pass}/{id}/{booked}")
	public ResponseEntity<Animal> updateAnimalRequest(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable Long id,
			@PathVariable String booked
	) throws NotFoundException, AuthenticationException {
		return  ResponseEntity.status(HttpStatus.OK).body(animalService.updateAnimalRequest(
				ucid,
				pass,
				id,
				booked
		));
	}

	@GetMapping("/stat/{ucid}/{pass}/{id}/{status}")
	public ResponseEntity<Animal> updateAnimalStatus(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable Long id,
			@PathVariable String status
	) throws NotFoundException, AuthenticationException {
		return  ResponseEntity.status(HttpStatus.OK).body(animalService.updateAnimalStatus(ucid, pass, id, status));
	}
	
	@DeleteMapping("/{ucid}/{pass}/{id}")
    public String deleteAnimal(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable("id") Long id
	) throws AuthenticationException {
		return animalService.deleteAnimal(ucid, pass, id);
    }
	
	@GetMapping("/{name}/{species}/{sex}")
	public ResponseEntity<List<Animal>> searchAnimal(@PathVariable(required = false) String name,
													 @PathVariable(required = false) String species,
													 @PathVariable(required = false) String sex){
		return ResponseEntity.status(HttpStatus.OK).body(animalService.searchAnimal(name, species, sex));
	}
}

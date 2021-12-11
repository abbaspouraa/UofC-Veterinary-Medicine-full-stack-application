package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.service.AnimalService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/animal")
public class AnimalController {


	@Autowired
	private AnimalService animalService;

//	@CrossOrigin(origins = "http://localhost:8090")
	@GetMapping
	public ResponseEntity<List<Animal>> getAllData(){
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAllData());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Animal> getAnimalById(@PathVariable Integer id){
		return ResponseEntity.status(HttpStatus.OK).body((animalService.getAnimalById(id)));
	}

	@GetMapping("/getStats/{status}")
	public ResponseEntity<List<Animal>> getAllByStatus(@PathVariable String status){
		return ResponseEntity.status(HttpStatus.OK).body(animalService.getAnimalsByStatus(status));
	}


	@GetMapping("/{name}")
	public List<Animal> searchByName(@PathVariable String name){
		return animalService.searchByName(name);
	}
	
	@PostMapping()
    public String addAnimal(@RequestBody Animal animal){
        return animalService.addAnimal(animal);
    }
	
	@GetMapping("/{id}/{status}")
	public ResponseEntity<Animal> updateAnimalStatus(
			@PathVariable Integer id,
			@PathVariable String status
	) throws NotFoundException {
		return  ResponseEntity.status(HttpStatus.OK).body(animalService.updateAnimalStatus(id, status));
	}
	
	@DeleteMapping("/{id}")
    public String deleteAnimal(@PathVariable("id") int id){
		return animalService.deleteAnimal(id);
    }
	
	@GetMapping("/{name}/{species}/{sex}")
	public ResponseEntity<List<Animal>> searchAnimal(@PathVariable(required = false) String name,
													 @PathVariable(required = false) String species,
													 @PathVariable(required = false) String sex){
		return ResponseEntity.status(HttpStatus.OK).body(animalService.searchAnimal(name, species, sex));
	}
}

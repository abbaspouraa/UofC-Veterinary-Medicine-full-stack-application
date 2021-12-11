package com.ENSF607.AnimalProject.service;


import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.AnimalRepository;
import com.ENSF607.AnimalProject.repository.UserRepo;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.List;

@Service
public class AnimalService {
	
	@Autowired
    AnimalRepository animalRepository;

	@Autowired
	UserRepo userRepo;
	
	public List<Animal> getAllData(){
		return animalRepository.findAll();
	}

	public List<Animal> getAnimalsByStatus(String status){
		return animalRepository.findAllBystatus(status);
	}

	public Animal getAnimalById(Long id){
		return animalRepository.findByanimalid(id);
	}
	
	public List<Animal> searchByName(String name){
		return animalRepository.findByname(name);
	}

	public List<Animal> searchAnimal(String name, String species, String sex){
		return animalRepository.searchAnimal(name,species,sex);
	}

	public String addAnimal(Animal animal){
        animalRepository.save(animal);
        return "Successfully added: Animal " + animal.getAnimalid();
    }

	/**
	 * Request an animal
	 * @param UCID ucid of the user who calls this API
	 * @param pass password of the user
	 * @param id id of the animal
	 * @param request "Request" status of the animal
	 * @return animal with the given id
	 * @throws NotFoundException if animal is not found
	 * @throws AuthenticationException if the user type is not Admin or Instructor
	 */
	public Animal updateAnimalRequest(
			Long UCID,
			String pass,
			Long id,
			String request
	) throws NotFoundException, AuthenticationException {
		User u = userRepo.findByuseridAndPassword(UCID, pass);
		// Initial authorization check
		if (u==null || !(u.getRole().equals("Admin") || u.getRole().equals("Instructor"))){
			throw new AuthenticationException("This API is only for admins and instructors");
		}

		// Animal must exist
		Animal theAnimal = animalRepository.findByanimalid(id);
		if (theAnimal == null) {
			throw new NotFoundException("Such animal does not exist!");
		}

		// Instructor is booking an animal
		if (request.equals("Requested") && u.getRole().equals("Instructor")){
			// The animal must be available to be booked
			if (!theAnimal.getRequest().equals("Available")){
				throw new AuthenticationException("Animal is already booked");
			}
			// Animal is available
			theAnimal.setRequest(request); // updating request
			theAnimal.setBookedId(UCID); // User who booked the animal
		}

		// Instructor is cancelling their request
		if (request.equals("Available") && u.getRole().equals("Instructor")){
			// The animal must be booked by the current user
			if (!theAnimal.getBookedId().equals(UCID)){
				throw new AuthenticationException("You can cancel a request submitted by yourself");
			}
			// The animal is booked by the current user
			theAnimal.setRequest("Available");
			theAnimal.setBookedId(null);
		}

		// Admin approves a request
		if (request.equals("Approved") && u.getRole().equals("Admin")){
			// The animal must be requested
			if (!theAnimal.getRequest().equals("Requested")){
				throw new AuthenticationException("You can only approve a requested animal");
			}
			// The animal is requested
			theAnimal.setRequest("Approved");
		}

		// Admin rejects a request
		if (request.equals("Available") && u.getRole().equals("Admin")){
			// The animal must be requested
			if (!theAnimal.getRequest().equals("Requested")){
				throw new AuthenticationException("You can only approve a requested animal");
			}
			// The animal is requested
			theAnimal.setRequest("Available");
			theAnimal.setBookedId(null);
		}

		return animalRepository.save(theAnimal);
	}
	
	public String deleteAnimal(Long id){
		animalRepository.deleteById(id);
        return "Successfully deleted: Animal " + id;
    }
}

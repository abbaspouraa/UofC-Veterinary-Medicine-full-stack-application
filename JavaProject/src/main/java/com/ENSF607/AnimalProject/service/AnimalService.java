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
	
	public List<Animal> getAllData(Long ucid, String pass) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null){
			throw new AuthenticationException("Only registered users can see all the animals");
		}
		return animalRepository.findAll();
	}

	public List<Animal> getRequestedAnimals(Long ucid, String pass, String request) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null || !u.getRole().equals("Admin")){
			throw new AuthenticationException("Only admins can get get all requested animals");
		}
		return animalRepository.findAllByrequest(request);
	}

	public List<Animal> getAllRequestedByMe(Long ucid, String pass) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null || !u.getRole().equals("Instructor")){
			throw new AuthenticationException("Only instructors can get their requested animals");
		}
		return animalRepository.findAllBybookedId(u.getUserid());
	}

	public Animal getAnimalById(Long ucid, String pass, Long id) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null){
			throw new AuthenticationException("Only registered users can an animals");
		}
		return animalRepository.findByanimalid(id);
	}
	
	public List<Animal> searchByName(Long ucid, String pass, String name) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null){
			throw new AuthenticationException("Only registered users search animals");
		}
		return animalRepository.findByname(name);
	}

	public List<Animal> searchAnimal(String name, String species, String sex){
		return animalRepository.searchAnimal(name,species,sex);
	}

	public String addAnimal(Long ucid, String pass, Animal animal) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null || !(u.getRole().equals("Care Attendant") || u.getRole().equals("Admin"))){
			throw new AuthenticationException("Only Admins and Care Attendants can add animals");
		}
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
	
	public String deleteAnimal(Long ucid, String pass, Long id) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null || !(u.getRole().equals("Care Attendant") || u.getRole().equals("Admin"))){
			throw new AuthenticationException("Only Admins and Care Attendants can delete an animals");
		}
		animalRepository.deleteById(id);
        return "Successfully deleted: Animal " + id;
    }
}

package com.ENSF607.AnimalProject.service;


import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.AnimalRepository;
import com.ENSF607.AnimalProject.repository.UserRepo;
import javassist.NotFoundException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import javax.transaction.Transactional;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
		if (u==null || !(u.getRole().equals("Admin") ||
				u.getRole().equals("Care Attendant"))
		){
			throw new AuthenticationException("Only admins and Care attendants can get get all requested animals");
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

	public List<Animal> searchAnimal(Long ucid, String pass, String name, String species, String sex) throws AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null){
			throw new AuthenticationException("Only registered users search animals");
		}
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

	public Animal updateAnimalStatus(Long ucid, String pass, Long id, String status) throws NotFoundException, AuthenticationException {
		User u = userRepo.findByuseridAndPassword(ucid, pass);
		if (u==null || !(u.getRole().equals("Care Attendant") ||
						u.getRole().equals("Admin") ||
						u.getRole().equals("Health Technician"))){
			throw new AuthenticationException("Only Admins, Care Attendants, and Health Technician can change stats of animal");
		}

		Animal theAnimal = animalRepository.findByanimalid(id);
		if (theAnimal == null) {
			throw new NotFoundException("Such animal does not exist!");
		}

		theAnimal.setStatus(status); // updating status
		return animalRepository.save(theAnimal);
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

		// If the newly added animal has a blank Request attribute
		if (theAnimal.getRequest()==null){
			theAnimal.setRequest("Available");
		}

		// Instructor is booking an animal
		if (request.equals("Requested") && u.getRole().equals("Instructor")){
			// The animal must be available and healthy to be booked
			if (!theAnimal.getRequest().equals("Available") || !theAnimal.getStatus().equals("Healthy")){
				throw new AuthenticationException("Animal is unavailable");
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

	@Transactional
	public Animal upload(Long id, MultipartFile file) throws Exception {
		final Animal animal = animalRepository.findById(id).orElseThrow(() -> new Exception("Animal not found")); // is id exist if exist we save filename in table

		if (file != null) {

			File destinationFile = null;
			// Check file type
//			if (FilenameUtils.getExtension(file.getOriginalFilename()).toUpperCase().equals("EXE")) {
//				System.out.println("not this extention");
//			}
			if (!file.isEmpty()) {

				String currentDate = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());

				String changedFileName = file.getOriginalFilename().replace(
						file.getOriginalFilename(),
						UUID.randomUUID() + "." + FilenameUtils.getExtension(file.getOriginalFilename())
				).toUpperCase();

				String uploadDir = "E:\\Amir\\Uni\\Software M.Eng\\Fall\\607 Software Design and Architecture I\\Project\\pictures\\";
				new File(uploadDir + File.separator).mkdirs();
				destinationFile = new File(uploadDir + changedFileName);
				file.transferTo(destinationFile);

				animal.setFileName(file.getOriginalFilename());
				animal.setFileNewName(changedFileName);
				animal.setFileSize(String.valueOf(file.getSize()));
				animal.setFileDateCreated(currentDate);
			}

		}

//		if (file != null && registerPriceHeader.getSpareProductFileNewName() != null)
//			new File(uploadDir + "fani/" + registerPriceHeader.getSpareProductFileNewName()).delete();
		return animalRepository.save(animal);// dar table esm file ro sabt mikonel
	}
}

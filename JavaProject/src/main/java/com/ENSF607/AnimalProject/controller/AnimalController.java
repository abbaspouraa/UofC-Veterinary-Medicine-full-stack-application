package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.service.AnimalService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
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

	@GetMapping("byId/{ucid}/{pass}/{id}")
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
	
	@GetMapping("/{ucid}/{pass}/{name}/{species}/{sex}")
	public ResponseEntity<List<Animal>> searchAnimal(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@PathVariable(required = false) String name,
			@PathVariable(required = false) String species,
			@PathVariable(required = false) String sex
	) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.searchAnimal(ucid, pass, name, species, sex));
	}

	@GetMapping(value = "/downloadFile/{fileName}")
	public void downloadFile(
			HttpServletResponse response,
			@PathVariable String fileName
	) throws Exception {
		String filePath = "E:\\Amir\\Uni\\Software M.Eng\\Fall\\607 Software Design and Architecture I\\Project\\pictures\\" + fileName;
		File downloadFile = new File(filePath);
		FileInputStream inputStream = new FileInputStream(downloadFile);
		String mimeType = "application/octet-stream";
		response.setContentType(mimeType);
		response.setContentLength((int)downloadFile.length());
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"", fileName);
		response.setHeader(headerKey, headerValue);

		BufferedInputStream bis = new BufferedInputStream(inputStream);
		BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
		byte[] buf = new byte[1024];
		while (true) {
			int length = bis.read(buf);
			if (length == -1)
				break;

			bos.write(buf, 0, length);
		}
		bos.flush();
		bos.close();
		bis.close();
	}


	@PutMapping(value = "/{id}")
	public ResponseEntity<Animal> upload(
			@PathVariable Long id,
			@RequestParam(value = "file") MultipartFile file
//			Principal principal
	) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(animalService.upload(id, file));
	}

}

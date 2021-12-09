package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.model.LoginRequest;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.service.UserServiceImpl;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.net.ssl.HttpsURLConnection;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserServiceImpl userService;

//    @GetMapping("/getAll/{ucid}/{pass}")
//    public ResponseEntity<List<User>> getAllUser(
//            @PathVariable Long ucid,
//            @PathVariable String pass
//    ) throws AuthenticationException {
//        return ResponseEntity.status(HttpStatus.OK).body(userService.getAll(ucid, pass));
//    }
    
    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUser(){
    	return ResponseEntity.status(HttpStatus.OK).body(userService.getAll());
    }
    
    @GetMapping("/{name}/{ucid}/{email}/{role}")
	public ResponseEntity<List<User>> searchUsers(@PathVariable(required = false) String name,
													 @PathVariable(required = false) String ucid,
													 @PathVariable(required = false) String email,
    												 @PathVariable(required = false) String role){
		return ResponseEntity.status(HttpStatus.OK).body(userService.searchUsers(name, ucid, email, role));
	}

    @PostMapping("/addUser/{ucid}/{pass}")
    public ResponseEntity<User> addUser(
            @RequestBody User user,
            @PathVariable Long ucid,
            @PathVariable String pass
    ) throws AuthenticationException {
        return ResponseEntity.status(HttpsURLConnection.HTTP_CREATED).body(userService.addUser(user, ucid, pass));
    }

    @DeleteMapping("/{ucid}/{pass}/{deletedUcid}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long deletedUcid,
            @PathVariable Long ucid,
            @PathVariable String pass
    ) throws AuthenticationException, NotFoundException {
        userService.deleteUser(deletedUcid, ucid, pass);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/updateUser/{ucid}/{pass}")
    public ResponseEntity<User> updateUser(
            User user,
            @PathVariable Long ucid,
            @PathVariable String pass
    ) throws NotFoundException, AuthenticationException {

        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(user, ucid, pass));
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(
    		@RequestBody LoginRequest request){
    	return ResponseEntity.status(HttpStatus.OK).body(userService.authenticateUser(request));
    }
    

}

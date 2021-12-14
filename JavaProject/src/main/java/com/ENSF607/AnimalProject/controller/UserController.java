package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.LoginRequest;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.service.UserServiceImpl;
import javassist.NotFoundException;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @GetMapping("/getAll/{ucid}/{pass}")
    public ResponseEntity<List<User>> getAllUser(
            @PathVariable Long ucid,
            @PathVariable String pass
    ) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAll(ucid, pass));
    }

    @GetMapping("/role/{ucid}/{pass}/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Long ucid,
                                                     @PathVariable String pass,
                                                     @PathVariable String role
                                                     ) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUserByRole(ucid,pass,role));
    }


    @PostMapping("/{ucid}/{pass}")
	public ResponseEntity<List<User>> searchUsers(
			@PathVariable Long ucid,
			@PathVariable String pass,
			@RequestBody User user
	) throws AuthenticationException {
		return ResponseEntity.status(HttpStatus.OK).body(userService.searchUsers(ucid, pass, user));
	}

    
    @GetMapping("/{ucid}/{pass}/{blockedUcid}")
	public ResponseEntity<User> blockUser(
            @PathVariable Long ucid,
            @PathVariable String pass,
			@PathVariable Long blockedUcid
	) throws NotFoundException, AuthenticationException {
		return  ResponseEntity.status(HttpStatus.OK).body(userService.blockUser(ucid, pass, blockedUcid));
	}


    @PostMapping("/addUser/{ucid}/{pass}")
    public ResponseEntity<User> addUser(
            @RequestBody User user,
            @PathVariable Long ucid,
            @PathVariable String pass
    ) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.addUser(ucid, pass, user));
    }

    @DeleteMapping("/{ucid}/{pass}/{deletedUcid}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long ucid,
            @PathVariable String pass,
            @PathVariable Long deletedUcid
    ) throws AuthenticationException, NotFoundException {
        userService.deleteUser(ucid, pass, deletedUcid);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/updateUser/{ucid}/{pass}")
    public ResponseEntity<User> updateUser(
            @RequestBody User user,
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

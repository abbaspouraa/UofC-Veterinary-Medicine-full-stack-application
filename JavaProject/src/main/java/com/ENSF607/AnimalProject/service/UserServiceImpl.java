package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.LoginRequest;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.UserRepo;
import javassist.NotFoundException;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl{

    @Autowired
    UserRepo userRepo;

    public List<User> getAll(Long ucid, String pass) throws AuthenticationException {
        User demander = userRepo.findByuseridAndPassword(ucid, pass);
        if (demander == null || !demander.getRole().equals("Admin")){
            throw new AuthenticationException("You are not authorized!");
        }
        return userRepo.findAll();
    }

    public List<User> searchUsers(Long ucid, String pass, User user) throws AuthenticationException {
		User demander = userRepo.findByuseridAndPassword(ucid, pass);
		if (demander == null || !(demander.getRole().equals("Admin") || demander.getRole().equals("Instructor"))){
			throw new AuthenticationException("You are not authorized!");
		}

		String fname = user.getfname();
		String lname = user.getlname();
		String uucid = user.getUserid() +"";
		String email = user.getEmail();
		String role = user.getRole();
		return userRepo.searchUsers(fname,lname, uucid,email,role);
	}

    public User addUser(Long ucid, String pass, User user) throws AuthenticationException {
        User demander = userRepo.findByuseridAndPassword(ucid, pass);
        if (demander == null || !(demander.getRole().equals("Admin") || demander.getRole().equals("Instructor"))){
            throw new AuthenticationException("You are not authorized!");
        }
        return userRepo.save(user);
    }

    public void deleteUser(Long ucid, String pass, Long doomedUserUcid) throws NotFoundException, AuthenticationException {
        User demander = userRepo.findByuseridAndPassword(ucid, pass);
        if (demander == null || !demander.getRole().equals("Admin")){
            throw new AuthenticationException("You are not authorized!");
        }
        User u = userRepo.findByuserid(doomedUserUcid);
        if (u==null){
            throw new NotFoundException("Such user does not exist!");
        }
        userRepo.delete(u);
    }

    public User updateUser(User user, Long ucid, String pass) throws NotFoundException, AuthenticationException {
        User demander = userRepo.findByuseridAndPassword(ucid, pass);
        if (demander == null || !demander.getRole().equals("Admin")){
            throw new AuthenticationException("You are not authorized!");
        }

        User u = userRepo.findByuserid(user.getUserid());
        if (u==null){
            throw new NotFoundException("Such user does not exist!");
        }
        return userRepo.save(user);
    }
    
    public Map<String, String> authenticateUser(LoginRequest request){
    	User user = userRepo.findByuseridAndPassword(request.getUcid(), request.getPassword());
    	HashMap<String, String> map = new HashMap<>();
    	
    	if(user == null || user.getBlocked().equals("Yes")) {
    		map.put(" ", " ");
    		return null;
    	}
    	else {
    		map.put("token", user.getRole());
    		map.put("UCID", user.getUserid().toString());
    		map.put("password", user.getPassword());
    		
    		return map;
    	}
    }

	public User blockUser(Long ucid, String pass, Long bloockedUcid) throws NotFoundException, AuthenticationException {
        User demander = userRepo.findByuseridAndPassword(ucid, pass);
        if (demander == null || !(demander.getRole().equals("Admin")) || demander.getRole().equals("Instructor")){
            throw new AuthenticationException("You are not authorized!");
        }

		User u = userRepo.findByuserid(bloockedUcid);
		
		if(u == null) {
			throw new NotFoundException("That user does not exist!");
		}
		
		u.setBlocked("Yes");
		return userRepo.save(u);
	}

}

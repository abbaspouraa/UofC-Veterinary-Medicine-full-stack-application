package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.model.LoginRequest;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.UserRepo;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl{

    @Autowired
    UserRepo userRepo;

    @Autowired
    JdbcTemplate jdbcTemplate;

//    public List<User> getAll(Long ucid, String pass) throws AuthenticationException {
//        User demander = userRepo.findByuseridAndPassword(ucid, pass);
//        if (demander == null || !demander.getRole().equals("Admin")){
//            throw new AuthenticationException("You are not authorized!");
//        }
//        return userRepo.findAll();
//    }
    
    public List<User> getAll(){
		return userRepo.findAll();
	}
    
    public List<User> searchUsers(String fname, String lname, String ucid, String email, String role){
		return userRepo.searchUsers(fname,lname, ucid,email,role);
	}
    
    public void deleteUser(Long ucid) {
    	User u = userRepo.findByuserid(ucid);
    	userRepo.delete(u);
    }
    
    public Integer addUser(String fname, String lname, Long ucid, String email, String role, String password) {
    	return userRepo.addUser(fname, lname, ucid, email, role, password);
    }

//    public User addUser(User user, Long ucid, String pass) throws AuthenticationException {
//        User demander = userRepo.findByuseridAndPassword(ucid, pass);
//        if (demander == null || !demander.getRole().equals("Admin")){
//            throw new AuthenticationException("You are not authorized!");
//        }
//        return userRepo.save(user);
//    }

//    public void deleteUser(Long doomedUserUcid, Long ucid, String pass) throws NotFoundException, AuthenticationException {
//        User demander = userRepo.findByuseridAndPassword(ucid, pass);
//        if (demander == null || !demander.getRole().equals("Admin")){
//            throw new AuthenticationException("You are not authorized!");
//        }
//        User u = userRepo.findByuserid(doomedUserUcid);
//        if (u==null){
//            throw new NotFoundException("Such user does not exist!");
//        }
//        userRepo.delete(u);
//    }

//    public User updateUser(User user, Long ucid, String pass) throws NotFoundException, AuthenticationException {
//        User demander = userRepo.findByuseridAndPassword(ucid, pass);
//        if (demander == null || !demander.getRole().equals("Admin")){
//            throw new AuthenticationException("You are not authorized!");
//        }
//
//        User u = userRepo.findByuserid(user.getUserid());
//        if (u==null){
//            throw new NotFoundException("Such user does not exist!");
//        }
//        return userRepo.save(user);
//    }
    
    public Map<String, String> authenticateUser(LoginRequest request){
    	User user = userRepo.findByfnameAndPassword(request.getfName(), request.getPassword());
    	HashMap<String, String> map = new HashMap<>();
    	
    	if(user == null || user.getBlocked().equals("Yes")) {
    		map.put(" ", " ");
    		return null;
    	}
    	else {
    		map.put("token", user.getRole());
    		return map;
    	}
    }

	public User blockUser(Long ucid) throws NotFoundException {
		User u = userRepo.findByuserid(ucid);
		
		if(u == null) {
			throw new NotFoundException("That user does not exist!");
		}
		
		u.setBlocked("Yes");
		return userRepo.save(u);
	}
	
	public User editUser(String fname, String lname, Long ucid, String email, String role) throws NotFoundException {
		User u = userRepo.findByuserid(ucid);
		
		if(u == null) {
			throw new NotFoundException("That user does not exist!");
		}
		
		u.setfname(fname);
		u.setlname(lname);
		u.setEmail(email);
		u.setRole(role);
		
		return userRepo.save(u);
	}

//    public List<User> findUser(String userId, String pass){
//        String query = "SELECT * FROM user WHERE userId=\"" +
//                userId +
//                "\" AND password = \"" +
//                pass + "\";";
//        return jdbcTemplate.query(
//                query,
//                new BeanPropertyRowMapper<User>(User.class)
//        );
//    }

//    public List<Comment> seeComments(Integer animalId){
//        String query = "SELECT * FROM comment";
//        return jdbcTemplate.query(
//                query,
//                new BeanPropertyRowMapper<Comment>(Comment.class)
//                );
//    }
//
//    public List<Animal> seeAlertedAnimals(){
//        String query = "SELECT * FROM animal WHERE status = \"Alerting\"";
//        return jdbcTemplate.query(
//                query,
//                new BeanPropertyRowMapper<Animal>(Animal.class)
//        );
//    }
//
//    public List<AnimalStatus> seeAnimalsTreatment(){
//        String query = "SELECT * FROM animalstatus";
//        return jdbcTemplate.query(
//                query,
//                new BeanPropertyRowMapper<AnimalStatus>(AnimalStatus.class)
//        );
//    }
}

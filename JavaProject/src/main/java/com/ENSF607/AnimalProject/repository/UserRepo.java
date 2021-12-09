package com.ENSF607.AnimalProject.repository;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.model.User;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepo extends PagingAndSortingRepository<User, Integer> {

//    Optional<User> findBylName(String name);
//    Optional<User> findByfName(String name);



//    List<User> findByRole(String role);

    List<User> findAll();
    User findByuserid(Long userid);
    User findByuseridAndPassword(Long userid, String pass);
    
    User findByfnameAndPassword(String fname, String pass);
    
    @Query(value = "SELECT DISTINCT * FROM user WHERE fname LIKE ?1 OR lname LIKE ?2 OR userid LIKE ?3 OR email LIKE ?4 OR role LIKE ?5", nativeQuery = true)
	List<User> searchUsers(String fname, String lname, String ucid, String email, String role);
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO USER (UserId,FName,LName,Email,Role,Password,Blocked) VALUES (?3, ?1, ?2, ?4, ?5, ?6, 'No')", nativeQuery = true)
	Integer addUser(String fname, String lname, Long ucid, String email, String role, String password);

    
//    Page<User> findAll(Pageable pageable);
}

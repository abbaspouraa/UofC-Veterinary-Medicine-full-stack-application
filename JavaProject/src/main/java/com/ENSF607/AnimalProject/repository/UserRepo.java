package com.ENSF607.AnimalProject.repository;

import com.ENSF607.AnimalProject.model.Animal;
import com.ENSF607.AnimalProject.model.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

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
    
    @Query(value = "SELECT DISTINCT * FROM user WHERE fname LIKE ?1 OR userid LIKE ?2 OR email LIKE ?3 OR role LIKE ?4", nativeQuery = true)
	List<User> searchUsers(String name, String ucid, String email, String role);

//    Page<User> findAll(Pageable pageable);
}

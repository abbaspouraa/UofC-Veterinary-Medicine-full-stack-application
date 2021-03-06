package com.ENSF607.AnimalProject.repository;

import com.ENSF607.AnimalProject.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAll();

    List<Comment> findAllByanimalid(Long animalid);

}

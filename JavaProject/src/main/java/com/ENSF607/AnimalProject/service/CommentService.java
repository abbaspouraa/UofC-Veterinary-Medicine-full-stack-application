package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.Comment;
import com.ENSF607.AnimalProject.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;


    public List<Comment> getAllComments(){
       return commentRepository.findAll();
    }

    public Comment addComments(Comment comment){
        return commentRepository.save(comment);
    }

    public List<Comment> findCommentForAnimal(Integer animalId){
        return commentRepository.findAllByanimalid(animalId);
    }


}

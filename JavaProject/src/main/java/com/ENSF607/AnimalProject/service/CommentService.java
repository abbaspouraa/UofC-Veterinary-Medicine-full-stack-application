package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.Comment;
import com.ENSF607.AnimalProject.model.CommentDTO;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.CommentRepository;
import com.ENSF607.AnimalProject.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepo userRepo;


    public List<Comment> getAllComments(){
       return commentRepository.findAll();
    }

    public Comment addComments(Comment comment){
        return commentRepository.save(comment);
    }

    public List<CommentDTO> findCommentForAnimal(Long animalId){
        List<CommentDTO> result = new ArrayList<>();
        List<Comment> allComments = commentRepository.findAllByanimalid(animalId);

        for (Comment c:allComments){
            CommentDTO addingComment = new CommentDTO();
            addingComment.setAnimalid(c.getAnimalid());
            addingComment.setCmntid(c.getCmntid());
            addingComment.setCreatedAt(c.getCreatedAt());
            addingComment.setNote(c.getNote());
            addingComment.setUserid(c.getUserid());

            User commentUser = userRepo.findByuserid(c.getUserid());
            addingComment.setFname(commentUser.getfname());
            addingComment.setRole(commentUser.getRole());
            addingComment.setLname(commentUser.getlname());

            result.add(addingComment);
        }
        return result;
    }


}

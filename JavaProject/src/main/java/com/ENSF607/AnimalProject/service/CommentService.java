package com.ENSF607.AnimalProject.service;

import com.ENSF607.AnimalProject.model.Comment;
import com.ENSF607.AnimalProject.model.CommentDTO;
import com.ENSF607.AnimalProject.model.User;
import com.ENSF607.AnimalProject.repository.CommentRepository;
import com.ENSF607.AnimalProject.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepo userRepo;


    public List<Comment> getAllComments(Long ucid, String pass) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null){
            throw new AuthenticationException("Only registered users can see comments");
        }
       return commentRepository.findAll();
    }

    public Comment addComments(Long ucid, String pass, Comment comment) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null){
            throw new AuthenticationException("Only registered users can make comments");
        }
        return commentRepository.save(comment);
    }

    public List<CommentDTO> findCommentForAnimal(Long ucid, String pass, Long animalId) throws AuthenticationException {
        User u = userRepo.findByuseridAndPassword(ucid, pass);
        if (u==null){
            throw new AuthenticationException("Only registered users can see comments");
        }
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

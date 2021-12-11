package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.Comment;
import com.ENSF607.AnimalProject.model.CommentDTO;
import com.ENSF607.AnimalProject.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins="*")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/")
    public ResponseEntity<Void> addComment(@RequestBody Comment comment) {
        commentService.addComments(comment);
        return ResponseEntity.status(HttpURLConnection.HTTP_CREATED).build();
    }

    @GetMapping("/")
    public ResponseEntity<List<Comment>> getAllComments(){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getAllComments());
    }

    @GetMapping("/{animalId}")
    public ResponseEntity<List<CommentDTO>> getAnimalComments(@PathVariable Long animalId){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findCommentForAnimal(animalId));
    }
}

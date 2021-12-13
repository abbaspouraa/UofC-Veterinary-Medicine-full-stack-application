package com.ENSF607.AnimalProject.controller;

import com.ENSF607.AnimalProject.model.Comment;
import com.ENSF607.AnimalProject.model.CommentDTO;
import com.ENSF607.AnimalProject.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.net.HttpURLConnection;
import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins="*")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/{ucid}/{pass}")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long ucid,
            @PathVariable String pass,
            @RequestBody Comment comment
    ) throws AuthenticationException {
        return ResponseEntity.status(HttpURLConnection.HTTP_CREATED).body(commentService.addComments(ucid, pass, comment));
    }

    @GetMapping("/{ucid}/{pass}")
    public ResponseEntity<List<Comment>> getAllComments(
            @PathVariable Long ucid,
            @PathVariable String pass
    ) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getAllComments(ucid, pass));
    }

    @GetMapping("/{ucid}/{pass}/{animalId}")
    public ResponseEntity<List<CommentDTO>> getAnimalComments(
            @PathVariable Long ucid,
            @PathVariable String pass,
            @PathVariable Long animalId
    ) throws AuthenticationException {
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findCommentForAnimal(ucid, pass, animalId));
    }
}

package com.cloudacademy.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.List;

import com.cloudacademy.Comment;
import com.cloudacademy.CommentRequest;

import com.cloudacademy.jwt.TokenManagement;


@RestController
@EnableAutoConfiguration
public class CommentsController {

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/comments", method = RequestMethod.GET, produces = "application/json")
  List<Comment> comments(@RequestHeader(value="x-auth-token") String token) {
    System.out.println("/comments GET called...");
    TokenManagement.authenticateJWTToken(token);
    return Comment.fetch_all();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/comments", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
  Comment createComment(@RequestHeader(value="x-auth-token") String token, @RequestBody CommentRequest input) {
    System.out.println("/comments POST called...");
    System.out.println("token: " + token);
    System.out.println("input.username: " + input.username);
    System.out.println("input.body: " + input.body);
    return Comment.create(input.username, input.body);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/comments/{id}", method = RequestMethod.DELETE, produces = "application/json")
  Boolean deleteComment(@RequestHeader(value="x-auth-token") String token, @PathVariable("id") String id) {
    System.out.println("/comments DELETE called...");
    return Comment.delete(id);
  }
}
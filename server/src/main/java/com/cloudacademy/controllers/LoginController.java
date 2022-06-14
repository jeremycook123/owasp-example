package com.cloudacademy.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import com.cloudacademy.LoginRequest;
import com.cloudacademy.LoginResponse;
import com.cloudacademy.Unauthorized;
import com.cloudacademy.jwt.TokenManagement;
import com.cloudacademy.User;
import com.cloudacademy.database.Postgres;

@RestController
@EnableAutoConfiguration
public class LoginController {
	@CrossOrigin(origins = "*")
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    LoginResponse login(@RequestBody LoginRequest input) {
        System.out.println("login POST called...");
        var authenticated = false;

        User user = User.fetch(input.username);
        System.out.println("database hash=" + user.hashedPassword);
        System.out.println("java hash=" + Postgres.md5(input.password));
        if (Postgres.md5(input.password).equals(user.hashedPassword)) {
          authenticated = true;
        } 

        if (authenticated) {
            System.out.println("username: " + input.username);
            String sessionToken = TokenManagement.createJWTToken(input.username);
            return new LoginResponse(sessionToken);
        } else {
            throw new Unauthorized("Access Denied");
        }
	}
}
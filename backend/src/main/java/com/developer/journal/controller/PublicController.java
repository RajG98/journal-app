package com.developer.journal.controller;

import com.developer.journal.model.Users;
import com.developer.journal.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class PublicController {
    @Autowired
    private UsersService usersService;

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody Users user){
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return new ResponseEntity<>(usersService.saveUser(user),HttpStatus.CREATED);
    }
}

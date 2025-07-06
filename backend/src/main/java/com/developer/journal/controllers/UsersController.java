package com.developer.journal.controllers;

import com.developer.journal.models.Users;
import com.developer.journal.services.UsersService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody Users user){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        Users userInfo= usersService.findByEmail(email);
        if(userInfo!=null){
            userInfo.setName(user.getName());
            userInfo.setEmail(user.getEmail());
            userInfo.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        }
        return new ResponseEntity<>(usersService.registerUser(userInfo),HttpStatus.NO_CONTENT);
    }
    @DeleteMapping
    @Transactional
    public ResponseEntity<?> deleteUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        usersService.deleteByEmail(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}

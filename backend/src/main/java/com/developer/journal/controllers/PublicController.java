package com.developer.journal.controllers;

import com.developer.journal.models.Users;
import com.developer.journal.services.JwtService;
import com.developer.journal.services.UserDetailsServiceImpl;
import com.developer.journal.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class PublicController {
    @Autowired
    private UsersService usersService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Users user){
        return new ResponseEntity<>(usersService.registerUser(user),HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user){
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String jwt = jwtService.generateToken(userDetails);
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>("Incorrect username or password",HttpStatus.BAD_REQUEST);
        }
    }

}

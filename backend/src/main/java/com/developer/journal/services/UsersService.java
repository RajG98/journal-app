package com.developer.journal.services;

import com.developer.journal.models.Users;
import com.developer.journal.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public Users registerUser(Users user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return usersRepository.save(user);
    }


    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email).orElse(null);
    }


    public void deleteByEmail(String email) {
        usersRepository.deleteByEmail(email);
    }
}

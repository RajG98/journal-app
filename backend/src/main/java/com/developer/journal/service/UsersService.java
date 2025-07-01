package com.developer.journal.service;

import com.developer.journal.model.Users;
import com.developer.journal.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }


    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email).orElse(null);
    }


    public void deleteByEmail(String email) {
        usersRepository.deleteByEmail(email);
    }
}

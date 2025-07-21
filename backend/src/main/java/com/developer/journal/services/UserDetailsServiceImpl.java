package com.developer.journal.services;

import com.developer.journal.models.Users;
import com.developer.journal.repositories.UsersRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UsersRepository usersRepository;

    public UserDetailsServiceImpl(UsersRepository usersRepository){
        this.usersRepository=usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user= usersRepository.findByEmail(email).orElse(null);
        if(user!=null){
            return User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .build();
        }
        throw new UsernameNotFoundException("User not found with email: "+email);
    }
}

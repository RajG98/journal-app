package com.developer.journal.hashing;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGenerator {
    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("test123"));
    }
}


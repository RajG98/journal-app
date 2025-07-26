package com.developer.journal.logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ProfileLogger implements CommandLineRunner {

    @Value("${spring.profiles.active:default}")
    private String profile;


    @Value("${security.jwt.secret-key}")
    private String key;

    @Override
    public void run(String... args) {
        log.info("ACTIVE SPRING PROFILE: {} with jwt key: {}", profile,key);
    }
//    @Override
//    public void run(String... args) {
//        log.info("ACTIVE SPRING PROFILE: {}", profile);
//    }
}

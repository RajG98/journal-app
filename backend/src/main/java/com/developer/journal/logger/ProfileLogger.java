package com.developer.journal.logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class ProfileLogger implements CommandLineRunner {

    @Value("${spring.profiles.active:default}")
    private String profile;

    @Override
    public void run(String... args) {
        System.out.println("✅ ACTIVE SPRING PROFILE: " + profile);
    }
}

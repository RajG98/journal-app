package com.developer.journal.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    @Value("${spring.profiles.active}")
    private String env;
    @GetMapping("/")
    public String getHome(){
        return "Hello World from "+env;
    }
}

package com.developer.journal.controller;

import com.developer.journal.service.LogsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LogsController {

    LogsController(LogsService service){
        this.service=service;
    }
    private final LogsService service;

    @GetMapping("/logs")
    public ResponseEntity<?> getLogs(){

        return ResponseEntity.ok( service.getLogs());
    }
}

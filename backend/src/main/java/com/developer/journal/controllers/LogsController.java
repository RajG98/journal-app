package com.developer.journal.controllers;

import com.developer.journal.models.Logs;
import com.developer.journal.services.LogsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LogsController {

    LogsController(LogsService service){
        this.service=service;
    }
    private final LogsService service;

    @GetMapping("/logs")
    public ResponseEntity<List<Logs>> getLogs(){
        
        return ResponseEntity.ok( service.getLogs());
    }
}

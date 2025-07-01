package com.developer.journal.service;

import com.developer.journal.model.Logs;
import com.developer.journal.repository.LogsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogsService {
    LogsService(LogsRepository repo){
        this.repo=repo;
    }
    private final LogsRepository repo;

    public List<Logs> getLogs(){
        return repo.findAll();
    }
}

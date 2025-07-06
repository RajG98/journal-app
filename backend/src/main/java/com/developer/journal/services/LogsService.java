package com.developer.journal.services;

import com.developer.journal.models.Logs;
import com.developer.journal.repositories.LogsRepository;
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

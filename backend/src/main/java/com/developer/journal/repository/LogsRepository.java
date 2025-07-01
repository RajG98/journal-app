package com.developer.journal.repository;

import com.developer.journal.model.Logs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LogsRepository extends JpaRepository<Logs,UUID> {
}

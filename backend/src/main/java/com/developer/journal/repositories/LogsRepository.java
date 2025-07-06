package com.developer.journal.repositories;

import com.developer.journal.models.Logs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LogsRepository extends JpaRepository<Logs,UUID> {
}

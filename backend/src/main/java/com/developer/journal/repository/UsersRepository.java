package com.developer.journal.repository;

import com.developer.journal.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID> {
    public Optional<Users> findByEmail(String email);

    public void deleteByEmail(String email);
}

package com.developer.journal.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    @Column(unique = true,nullable = false)
    private String email;
    @Column(name = "password_hash")
    private String password;
    @Column(name = "created_at",updatable = false)
    private LocalDateTime createdAt=LocalDateTime.now();
    @JsonManagedReference
    @OneToMany(mappedBy = "users",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Logs> logs=new ArrayList<>();
}

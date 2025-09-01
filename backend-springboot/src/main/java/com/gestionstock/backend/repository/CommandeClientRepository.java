package com.gestionstock.backend.repository;

import com.gestionstock.backend.entity.CommandeClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeClientRepository extends JpaRepository<CommandeClient, Long> {
}
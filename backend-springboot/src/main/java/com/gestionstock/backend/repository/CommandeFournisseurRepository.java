package com.gestionstock.backend.repository;

import com.gestionstock.backend.entity.CommandeFournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeFournisseurRepository extends JpaRepository<CommandeFournisseur, Long> {
}
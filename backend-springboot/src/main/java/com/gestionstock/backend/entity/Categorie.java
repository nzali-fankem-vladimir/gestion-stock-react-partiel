package com.gestionstock.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String designation;
    private String codeCategory;
    private String description;
    
    public Categorie() {}
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    
    public String getCodeCategory() { return codeCategory; }
    public void setCodeCategory(String codeCategory) { this.codeCategory = codeCategory; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
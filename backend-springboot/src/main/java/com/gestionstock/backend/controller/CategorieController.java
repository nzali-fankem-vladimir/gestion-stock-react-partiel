package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.Categorie;
import com.gestionstock.backend.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategorieController {
    
    @Autowired
    private CategorieRepository categorieRepository;
    
    @GetMapping("/all")
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategorie(@PathVariable Long id) {
        return categorieRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieRepository.save(categorie);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategorie(@PathVariable Long id) {
        categorieRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.Fournisseur;
import com.gestionstock.backend.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/fournisseurs")
@CrossOrigin(origins = "http://localhost:3000")
public class FournisseurController {
    
    @Autowired
    private FournisseurRepository fournisseurRepository;
    
    @GetMapping("/all")
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Fournisseur> getFournisseur(@PathVariable Long id) {
        return fournisseurRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public Fournisseur createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFournisseur(@PathVariable Long id) {
        fournisseurRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
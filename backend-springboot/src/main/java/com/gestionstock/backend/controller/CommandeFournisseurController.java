package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.CommandeFournisseur;
import com.gestionstock.backend.repository.CommandeFournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/commandesfournisseurs")
@CrossOrigin(origins = "http://localhost:3000")
public class CommandeFournisseurController {
    
    @Autowired
    private CommandeFournisseurRepository commandeFournisseurRepository;
    
    @GetMapping("/all")
    public List<CommandeFournisseur> getAllCommandesFournisseurs() {
        return commandeFournisseurRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CommandeFournisseur> getCommandeFournisseur(@PathVariable Long id) {
        return commandeFournisseurRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public CommandeFournisseur createCommandeFournisseur(@RequestBody CommandeFournisseur commande) {
        return commandeFournisseurRepository.save(commande);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCommandeFournisseur(@PathVariable Long id) {
        commandeFournisseurRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
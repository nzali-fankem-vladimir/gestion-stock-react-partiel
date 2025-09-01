package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.CommandeClient;
import com.gestionstock.backend.repository.CommandeClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/commandesclients")
@CrossOrigin(origins = "http://localhost:3000")
public class CommandeClientController {
    
    @Autowired
    private CommandeClientRepository commandeClientRepository;
    
    @GetMapping("/all")
    public List<CommandeClient> getAllCommandesClients() {
        return commandeClientRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CommandeClient> getCommandeClient(@PathVariable Long id) {
        return commandeClientRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public CommandeClient createCommandeClient(@RequestBody CommandeClient commande) {
        return commandeClientRepository.save(commande);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCommandeClient(@PathVariable Long id) {
        commandeClientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
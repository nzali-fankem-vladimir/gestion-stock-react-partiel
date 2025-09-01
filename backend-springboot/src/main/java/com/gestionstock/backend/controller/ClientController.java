package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.Client;
import com.gestionstock.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {
    
    @Autowired
    private ClientRepository clientRepository;
    
    @GetMapping("/all")
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        return clientRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public Client createClient(@RequestBody Client client) {
        return clientRepository.save(client);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
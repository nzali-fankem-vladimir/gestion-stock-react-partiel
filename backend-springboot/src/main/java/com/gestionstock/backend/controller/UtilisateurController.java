package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.Utilisateur;
import com.gestionstock.backend.entity.Role;
import com.gestionstock.backend.repository.UtilisateurRepository;
import com.gestionstock.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/utilisateurs")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @GetMapping("/all")
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }
    
    @GetMapping("/find/{email}")
    public ResponseEntity<Utilisateur> getUtilisateurByEmail(@PathVariable String email) {
        return utilisateurRepository.findByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateur(@PathVariable Long id) {
        return utilisateurRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public Utilisateur createUtilisateur(@RequestBody Utilisateur utilisateur) {
        // Crypter le mot de passe avant sauvegarde
        if (utilisateur.getMotDePasse() != null && !utilisateur.getMotDePasse().isEmpty()) {
            utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        }
        
        // TOUJOURS assigner le rôle USER par défaut
        Role roleUser = roleRepository.findByRoleName("USER")
            .orElseThrow(() -> new RuntimeException("Role USER non trouvé"));
        utilisateur.setRoles(Set.of(roleUser));
        
        return utilisateurRepository.save(utilisateur);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/update/password")
    public ResponseEntity<?> changerMotDePasse(@RequestBody Map<String, String> donnees) {
        try {
            String email = donnees.get("email");
            String nouveauMotDePasse = donnees.get("nouveauMotDePasse");
            
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            
            utilisateur.setMotDePasse(passwordEncoder.encode(nouveauMotDePasse));
            utilisateurRepository.save(utilisateur);
            
            return ResponseEntity.ok("Mot de passe modifié avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur: " + e.getMessage());
        }
    }
    
    @PostMapping("/fix-roles")
    public ResponseEntity<?> corrigerRoles() {
        try {
            Role roleUser = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER non trouvé"));
            
            List<Utilisateur> utilisateursSansRoles = utilisateurRepository.findAll().stream()
                .filter(u -> u.getRoles() == null || u.getRoles().isEmpty())
                .toList();
            
            for (Utilisateur utilisateur : utilisateursSansRoles) {
                utilisateur.setRoles(Set.of(roleUser));
                utilisateurRepository.save(utilisateur);
            }
            
            return ResponseEntity.ok(utilisateursSansRoles.size() + " utilisateur(s) corrigé(s)");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur: " + e.getMessage());
        }
    }
    
    @PostMapping("/fix-user/{email}")
    public ResponseEntity<?> corrigerUtilisateur(@PathVariable String email) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            
            Role roleUser = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER non trouvé"));
            
            utilisateur.setRoles(Set.of(roleUser));
            utilisateurRepository.save(utilisateur);
            
            return ResponseEntity.ok("Utilisateur " + email + " corrigé avec le rôle USER");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur: " + e.getMessage());
        }
    }
}
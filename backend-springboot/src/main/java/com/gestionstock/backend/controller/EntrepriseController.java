package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.Entreprise;
import com.gestionstock.backend.entity.Utilisateur;
import com.gestionstock.backend.entity.Role;
import com.gestionstock.backend.repository.EntrepriseRepository;
import com.gestionstock.backend.repository.UtilisateurRepository;
import com.gestionstock.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequestMapping("/entreprises")
@CrossOrigin(origins = "http://localhost:3000")
public class EntrepriseController {
    
    @Autowired
    private EntrepriseRepository entrepriseRepository;
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/save")
    public ResponseEntity<?> sauvegarderEntreprise(@RequestBody Entreprise entreprise) {
        try {
            // Vérifier si l'email existe déjà
            if (entrepriseRepository.findByEmail(entreprise.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email déjà utilisé");
            }
            
            // Sauvegarder l'entreprise
            Entreprise entrepriseSauvee = entrepriseRepository.save(entreprise);
            
            // Créer un utilisateur admin pour cette entreprise
            Utilisateur adminEntreprise = new Utilisateur();
            adminEntreprise.setNom(entreprise.getNom());
            adminEntreprise.setPrenom("Admin");
            adminEntreprise.setEmail(entreprise.getEmail());
            adminEntreprise.setMotDePasse(passwordEncoder.encode("som3R@nd0mP@$$word"));
            adminEntreprise.setNumTel(entreprise.getNumTel());
            
            // Assigner le rôle ADMIN
            Role roleAdmin = roleRepository.findByRoleName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Role ADMIN non trouvé"));
            adminEntreprise.setRoles(Set.of(roleAdmin));
            
            utilisateurRepository.save(adminEntreprise);
            
            return ResponseEntity.ok(entrepriseSauvee);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'inscription: " + e.getMessage());
        }
    }
}
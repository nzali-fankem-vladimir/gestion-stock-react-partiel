package com.gestionstock.backend.controller;

import com.gestionstock.backend.dto.LoginRequest;
import com.gestionstock.backend.dto.LoginResponse;
import com.gestionstock.backend.entity.Utilisateur;
import com.gestionstock.backend.entity.Role;
import com.gestionstock.backend.repository.UtilisateurRepository;
import com.gestionstock.backend.repository.RoleRepository;
import com.gestionstock.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getPassword())
            );
            
            String token = jwtUtil.generateToken(loginRequest.getLogin());
            return ResponseEntity.ok(new LoginResponse(token));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Identifiants incorrects");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utilisateur utilisateur) {
        try {
            if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email déjà utilisé");
            }
            
            utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
            
            Role roleUser = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER non trouvé"));
            utilisateur.setRoles(Set.of(roleUser));
            
            Utilisateur nouvelUtilisateur = utilisateurRepository.save(utilisateur);
            String token = jwtUtil.generateToken(nouvelUtilisateur.getEmail());
            
            return ResponseEntity.ok(new LoginResponse(token));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'inscription: " + e.getMessage());
        }
    }
}
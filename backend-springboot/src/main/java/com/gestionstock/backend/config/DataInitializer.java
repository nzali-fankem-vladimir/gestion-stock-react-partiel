package com.gestionstock.backend.config;

import com.gestionstock.backend.entity.Role;
import com.gestionstock.backend.entity.Utilisateur;
import com.gestionstock.backend.entity.Categorie;
import com.gestionstock.backend.entity.Article;
import com.gestionstock.backend.repository.RoleRepository;
import com.gestionstock.backend.repository.UtilisateurRepository;
import com.gestionstock.backend.repository.CategorieRepository;
import com.gestionstock.backend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private CategorieRepository categorieRepository;
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Créer les rôles seulement s'ils n'existent pas
        Role adminRole = roleRepository.findByRoleName("ADMIN")
            .orElseGet(() -> roleRepository.save(new Role("ADMIN")));
        Role managerRole = roleRepository.findByRoleName("MANAGER")
            .orElseGet(() -> roleRepository.save(new Role("MANAGER")));
        Role userRole = roleRepository.findByRoleName("USER")
            .orElseGet(() -> roleRepository.save(new Role("USER")));
        
        // Créer les utilisateurs seulement s'ils n'existent pas
        if (!utilisateurRepository.findByEmail("admin@gestionstock.com").isPresent()) {
            Utilisateur admin = new Utilisateur();
            admin.setNom("Admin");
            admin.setPrenom("Système");
            admin.setEmail("admin@gestionstock.com");
            admin.setMotDePasse(passwordEncoder.encode("admin123"));
            admin.setNumTel("06 12 34 56 78");
            admin.setRoles(Set.of(adminRole));
            utilisateurRepository.save(admin);
        }
        
        if (!utilisateurRepository.findByEmail("manager@gestionstock.com").isPresent()) {
            Utilisateur manager = new Utilisateur();
            manager.setNom("Martin");
            manager.setPrenom("Marie");
            manager.setEmail("manager@gestionstock.com");
            manager.setMotDePasse(passwordEncoder.encode("manager123"));
            manager.setNumTel("06 11 22 33 44");
            manager.setRoles(Set.of(managerRole));
            utilisateurRepository.save(manager);
        }
        
        if (!utilisateurRepository.findByEmail("user@gestionstock.com").isPresent()) {
            Utilisateur user = new Utilisateur();
            user.setNom("Dupont");
            user.setPrenom("Jean");
            user.setEmail("user@gestionstock.com");
            user.setMotDePasse(passwordEncoder.encode("user123"));
            user.setNumTel("06 98 76 54 32");
            user.setRoles(Set.of(userRole));
            utilisateurRepository.save(user);
        }
        
        // Créer les catégories
        Categorie electronique = new Categorie();
        electronique.setDesignation("Électronique");
        electronique.setCodeCategory("ELEC001");
        electronique.setDescription("Appareils électroniques et accessoires");
        
        Categorie informatique = new Categorie();
        informatique.setDesignation("Informatique");
        informatique.setCodeCategory("INFO001");
        informatique.setDescription("Matériel informatique et logiciels");
        
        Categorie mobilier = new Categorie();
        mobilier.setDesignation("Mobilier");
        mobilier.setCodeCategory("MOBI001");
        mobilier.setDescription("Meubles et équipements de bureau");
        
        categorieRepository.saveAll(Arrays.asList(electronique, informatique, mobilier));
        
        // Créer les articles
        Article laptop = new Article();
        laptop.setDesignation("Ordinateur portable HP");
        laptop.setCodeArticle("HP-LAP-001");
        laptop.setPrixUnitaireHt(new BigDecimal("599.99"));
        laptop.setTauxTva(new BigDecimal("20"));
        laptop.setPrixUnitaireTtc(new BigDecimal("719.99"));
        laptop.setQuantite(15);
        laptop.setCategory(informatique);
        
        Article smartphone = new Article();
        smartphone.setDesignation("Smartphone Samsung Galaxy");
        smartphone.setCodeArticle("SAM-GAL-001");
        smartphone.setPrixUnitaireHt(new BigDecimal("399.99"));
        smartphone.setTauxTva(new BigDecimal("20"));
        smartphone.setPrixUnitaireTtc(new BigDecimal("479.99"));
        smartphone.setQuantite(8);
        smartphone.setCategory(electronique);
        
        Article bureau = new Article();
        bureau.setDesignation("Bureau en bois");
        bureau.setCodeArticle("BUR-BOI-001");
        bureau.setPrixUnitaireHt(new BigDecimal("249.99"));
        bureau.setTauxTva(new BigDecimal("20"));
        bureau.setPrixUnitaireTtc(new BigDecimal("299.99"));
        bureau.setQuantite(5);
        bureau.setCategory(mobilier);
        
        articleRepository.saveAll(Arrays.asList(laptop, smartphone, bureau));
    }
}
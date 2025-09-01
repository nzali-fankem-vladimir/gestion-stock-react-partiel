package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.MouvementStock;
import com.gestionstock.backend.repository.MouvementStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/mvtstk")
@CrossOrigin(origins = "http://localhost:3000")
public class MouvementStockController {
    
    @Autowired
    private MouvementStockRepository mouvementStockRepository;
    
    @GetMapping("/all")
    public List<MouvementStock> getAllMouvements() {
        return mouvementStockRepository.findAll();
    }
    
    @GetMapping("/filter/article/{articleId}")
    public List<MouvementStock> getMouvementsByArticle(@PathVariable Long articleId) {
        return mouvementStockRepository.findByArticleId(articleId);
    }
    
    @PostMapping("/entree")
    public MouvementStock entreeStock(@RequestBody MouvementStock mouvement) {
        mouvement.setTypeMouvement("ENTREE");
        mouvement.setDateMouvement(LocalDateTime.now());
        return mouvementStockRepository.save(mouvement);
    }
    
    @PostMapping("/sortie")
    public MouvementStock sortieStock(@RequestBody MouvementStock mouvement) {
        mouvement.setTypeMouvement("SORTIE");
        mouvement.setDateMouvement(LocalDateTime.now());
        return mouvementStockRepository.save(mouvement);
    }
    
    @PostMapping("/correctionpos")
    public MouvementStock correctionStock(@RequestBody MouvementStock mouvement) {
        mouvement.setTypeMouvement("CORRECTION");
        mouvement.setDateMouvement(LocalDateTime.now());
        return mouvementStockRepository.save(mouvement);
    }
}
package com.gestionstock.backend.controller;

import com.gestionstock.backend.entity.Article;
import com.gestionstock.backend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @GetMapping("/all")
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        return articleRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create")
    public Article createArticle(@RequestBody Article article) {
        return articleRepository.save(article);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id) {
        try {
            if (!articleRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            articleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la suppression: " + e.getMessage());
        }
    }
}
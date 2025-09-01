package com.gestionstock.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mouvements_stock")
public class MouvementStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;
    
    private String typeMouvement;
    private Integer quantite;
    private LocalDateTime dateMouvement;
    
    public MouvementStock() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Article getArticle() { return article; }
    public void setArticle(Article article) { this.article = article; }
    
    public String getTypeMouvement() { return typeMouvement; }
    public void setTypeMouvement(String typeMouvement) { this.typeMouvement = typeMouvement; }
    
    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
    
    public LocalDateTime getDateMouvement() { return dateMouvement; }
    public void setDateMouvement(LocalDateTime dateMouvement) { this.dateMouvement = dateMouvement; }
}
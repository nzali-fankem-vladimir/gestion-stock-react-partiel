package com.gestionstock.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String designation;
    private String codeArticle;
    private BigDecimal prixUnitaireHt;
    private BigDecimal tauxTva;
    private BigDecimal prixUnitaireTtc;
    private Integer quantite = 0;
    private String photo;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categorie category;
    
    public Article() {}
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    
    public String getCodeArticle() { return codeArticle; }
    public void setCodeArticle(String codeArticle) { this.codeArticle = codeArticle; }
    
    public BigDecimal getPrixUnitaireHt() { return prixUnitaireHt; }
    public void setPrixUnitaireHt(BigDecimal prixUnitaireHt) { this.prixUnitaireHt = prixUnitaireHt; }
    
    public BigDecimal getTauxTva() { return tauxTva; }
    public void setTauxTva(BigDecimal tauxTva) { this.tauxTva = tauxTva; }
    
    public BigDecimal getPrixUnitaireTtc() { return prixUnitaireTtc; }
    public void setPrixUnitaireTtc(BigDecimal prixUnitaireTtc) { this.prixUnitaireTtc = prixUnitaireTtc; }
    
    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
    
    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
    
    public Categorie getCategory() { return category; }
    public void setCategory(Categorie category) { this.category = category; }
}
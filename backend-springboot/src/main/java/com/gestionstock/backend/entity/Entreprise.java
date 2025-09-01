package com.gestionstock.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "entreprises")
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nom;
    private String description;
    private String codeFiscal;
    private String photo;
    private String email;
    private String numTel;
    private String steWeb;
    
    @Embedded
    private Adresse adresse;
    
    public Entreprise() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCodeFiscal() { return codeFiscal; }
    public void setCodeFiscal(String codeFiscal) { this.codeFiscal = codeFiscal; }
    
    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNumTel() { return numTel; }
    public void setNumTel(String numTel) { this.numTel = numTel; }
    
    public String getSteWeb() { return steWeb; }
    public void setSteWeb(String steWeb) { this.steWeb = steWeb; }
    
    public Adresse getAdresse() { return adresse; }
    public void setAdresse(Adresse adresse) { this.adresse = adresse; }
}

@Embeddable
class Adresse {
    private String adresse1;
    private String adresse2;
    private String ville;
    private String codePostale;
    private String pays;
    
    public String getAdresse1() { return adresse1; }
    public void setAdresse1(String adresse1) { this.adresse1 = adresse1; }
    
    public String getAdresse2() { return adresse2; }
    public void setAdresse2(String adresse2) { this.adresse2 = adresse2; }
    
    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
    
    public String getCodePostale() { return codePostale; }
    public void setCodePostale(String codePostale) { this.codePostale = codePostale; }
    
    public String getPays() { return pays; }
    public void setPays(String pays) { this.pays = pays; }
}
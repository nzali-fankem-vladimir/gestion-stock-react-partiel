package com.gestionstock.backend.repository;

import com.gestionstock.backend.entity.MouvementStock;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {
    List<MouvementStock> findByArticleId(Long articleId);
}
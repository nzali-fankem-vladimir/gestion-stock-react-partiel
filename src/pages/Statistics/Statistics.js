import React, { useState, useEffect } from 'react';
import { serviceArticle, serviceClient, serviceFournisseur, serviceCommandeClient } from '../../services/api';
import './Statistics.css';

/**
 * Page des statistiques et tableau de bord
 * Affiche les métriques principales de l'application
 */
const Statistiques = () => {
  // États pour les données statistiques
  const [donnees, setDonnees] = useState({
    nombreArticles: 0,
    nombreClients: 0,
    nombreFournisseurs: 0,
    nombreCommandes: 0
  });
  const [chargement, setChargement] = useState(true);

  /**
   * Charge les données statistiques au montage du composant
   */
  useEffect(() => {
    chargerStatistiques();
  }, []);

  /**
   * Récupère toutes les statistiques depuis l'API
   */
  const chargerStatistiques = async () => {
    try {
      setChargement(true);
      
      // Récupération parallèle de toutes les données
      const [articles, clients, fournisseurs, commandes] = await Promise.all([
        serviceArticle.obtenirTous(),
        serviceClient.obtenirTous(),
        serviceFournisseur.obtenirTous(),
        serviceCommandeClient.obtenirTous()
      ]);

      setDonnees({
        nombreArticles: articles.data?.length || 0,
        nombreClients: clients.data?.length || 0,
        nombreFournisseurs: fournisseurs.data?.length || 0,
        nombreCommandes: commandes.data?.length || 0
      });
    } catch (erreur) {
      console.error('Erreur lors du chargement des statistiques:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Cartes de statistiques à afficher
   */
  const cartesStats = [
    {
      titre: 'Articles',
      valeur: donnees.nombreArticles,
      icone: 'fas fa-cubes',
      couleur: 'primary',
      lien: '/articles'
    },
    {
      titre: 'Clients',
      valeur: donnees.nombreClients,
      icone: 'fas fa-users',
      couleur: 'success',
      lien: '/clients'
    },
    {
      titre: 'Fournisseurs',
      valeur: donnees.nombreFournisseurs,
      icone: 'fas fa-truck',
      couleur: 'warning',
      lien: '/fournisseurs'
    },
    {
      titre: 'Commandes',
      valeur: donnees.nombreCommandes,
      icone: 'fas fa-shopping-cart',
      couleur: 'info',
      lien: '/commandes-clients'
    }
  ];

  if (chargement) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-statistiques">
      {/* En-tête de la page */}
      <div className="en-tete-page">
        <h2>
          <i className="fas fa-chart-line"></i>
          Tableau de bord
        </h2>
        <p className="text-muted">Vue d'ensemble de votre système de gestion de stock</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="row">
        {cartesStats.map((carte, index) => (
          <div key={index} className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${carte.couleur} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-${carte.couleur} text-uppercase mb-1`}>
                      {carte.titre}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {carte.valeur}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className={`${carte.icone} fa-2x text-gray-300`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Actions rapides</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <a href="/articles/nouveau" className="btn btn-primary btn-block">
                    <i className="fas fa-plus"></i> Nouvel article
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/clients/nouveau" className="btn btn-success btn-block">
                    <i className="fas fa-user-plus"></i> Nouveau client
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/fournisseurs/nouveau" className="btn btn-warning btn-block">
                    <i className="fas fa-truck"></i> Nouveau fournisseur
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/mouvements-stock" className="btn btn-info btn-block">
                    <i className="fas fa-exchange-alt"></i> Mouvement stock
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques et informations supplémentaires */}
      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Activité récente</h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <i className="fas fa-chart-area fa-3x text-gray-300 mb-3"></i>
                <p className="text-muted">Graphique d'activité à venir</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Alertes stock</h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <p className="text-muted">Système d'alertes à venir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;
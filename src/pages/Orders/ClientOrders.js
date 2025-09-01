import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceCommandeClient } from '../../services/api';
import BoutonAction from '../../components/ActionButton/ActionButton';
import Pagination from '../../components/Pagination/Pagination';
import './ClientOrders.css';

/**
 * Page de gestion des commandes clients
 */
const CommandesClients = () => {
  const [commandes, setCommandes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const commandesParPage = 10;

  useEffect(() => {
    chargerCommandes();
  }, []);

  const chargerCommandes = async () => {
    try {
      setChargement(true);
      const reponse = await serviceCommandeClient.obtenirTous();
      setCommandes(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des commandes');
    } finally {
      setChargement(false);
    }
  };

  const supprimerCommande = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      try {
        await serviceCommandeClient.supprimer(id);
        await chargerCommandes();
      } catch (erreur) {
        setErreur('Erreur lors de la suppression');
      }
    }
  };

  const commandesFiltrees = commandes.filter(commande =>
    commande.code?.toLowerCase().includes(recherche.toLowerCase()) ||
    commande.client?.nom?.toLowerCase().includes(recherche.toLowerCase())
  );

  const indexDernier = pageActuelle * commandesParPage;
  const indexPremier = indexDernier - commandesParPage;
  const commandesAffichees = commandesFiltrees.slice(indexPremier, indexDernier);
  const nombrePages = Math.ceil(commandesFiltrees.length / commandesParPage);

  const getStatutBadge = (statut) => {
    switch (statut) {
      case 'EN_PREPARATION': return 'badge bg-warning';
      case 'VALIDEE': return 'badge bg-success';
      case 'LIVREE': return 'badge bg-info';
      case 'COMMANDEE': return 'badge bg-primary';
      default: return 'badge bg-secondary';
    }
  };

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
    <div className="page-commandes-clients">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-shopping-cart"></i>
            Commandes clients
          </h2>
          <p className="text-muted">Gérez les commandes de vos clients</p>
        </div>
        <Link to="/nouvellecommandeclt" className="btn btn-primary">
          <i className="fas fa-plus"></i> Nouvelle commande
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher une commande..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-info">
                {commandesFiltrees.length} commande(s) trouvée(s)
              </span>
            </div>
          </div>
        </div>
      </div>

      {erreur && (
        <div className="alert alert-danger" role="alert">
          {erreur}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          {commandesAffichees.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucune commande trouvée</p>
              <Link to="/nouvellecommandeclt" className="btn btn-primary">
                Créer la première commande
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Code</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandesAffichees.map((commande) => (
                      <tr key={commande.id}>
                        <td>
                          <span className="badge bg-secondary">
                            {commande.code}
                          </span>
                        </td>
                        <td>
                          <div>
                            <div className="fw-bold">
                              {commande.client?.nom} {commande.client?.prenom}
                            </div>
                            <small className="text-muted">{commande.client?.email}</small>
                          </div>
                        </td>
                        <td>
                          {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}
                        </td>
                        <td>
                          <span className={getStatutBadge(commande.etatCommande)}>
                            {commande.etatCommande?.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold text-success">
                            {commande.ligneCommandeClients?.reduce((total, ligne) => 
                              total + (ligne.quantite * ligne.prixUnitaire), 0
                            )?.toFixed(2) || '0.00'} €
                          </span>
                        </td>
                        <td>
                          <BoutonAction
                            onVoir={() => console.log('Voir commande', commande.id)}
                            onModifier={() => window.location.href = `/nouvellecommandeclt/${commande.id}`}
                            onSupprimer={() => supprimerCommande(commande.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {nombrePages > 1 && (
                <Pagination
                  pageActuelle={pageActuelle}
                  nombrePages={nombrePages}
                  onChangerPage={setPageActuelle}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandesClients;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceClient } from '../../services/api';
import BoutonAction from '../../components/ActionButton/ActionButton';
import Pagination from '../../components/Pagination/Pagination';
import './Clients.css';

/**
 * Page de gestion des clients
 * Affiche la liste des clients avec possibilité de CRUD
 */
const Clients = () => {
  // États pour la gestion des clients
  const [clients, setClients] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const clientsParPage = 10;

  /**
   * Charge la liste des clients au montage
   */
  useEffect(() => {
    chargerClients();
  }, []);

  /**
   * Récupère tous les clients depuis l'API
   */
  const chargerClients = async () => {
    try {
      setChargement(true);
      const reponse = await serviceClient.obtenirTous();
      setClients(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des clients');
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Supprime un client
   */
  const supprimerClient = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await serviceClient.supprimer(id);
        await chargerClients();
      } catch (erreur) {
        setErreur('Erreur lors de la suppression');
        console.error('Erreur:', erreur);
      }
    }
  };

  /**
   * Filtre les clients selon la recherche
   */
  const clientsFiltres = clients.filter(client =>
    client.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
    client.prenom?.toLowerCase().includes(recherche.toLowerCase()) ||
    client.email?.toLowerCase().includes(recherche.toLowerCase())
  );

  /**
   * Calcul de la pagination
   */
  const indexDernier = pageActuelle * clientsParPage;
  const indexPremier = indexDernier - clientsParPage;
  const clientsAffiches = clientsFiltres.slice(indexPremier, indexDernier);
  const nombrePages = Math.ceil(clientsFiltres.length / clientsParPage);

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
    <div className="page-clients">
      {/* En-tête de la page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-users"></i>
            Gestion des clients
          </h2>
          <p className="text-muted">Gérez votre base de données clients</p>
        </div>
        <Link to="/nouveauclient" className="btn btn-primary">
          <i className="fas fa-user-plus"></i> Nouveau client
        </Link>
      </div>

      {/* Barre de recherche */}
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
                  placeholder="Rechercher un client..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-info">
                {clientsFiltres.length} client(s) trouvé(s)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages d'erreur */}
      {erreur && (
        <div className="alert alert-danger" role="alert">
          {erreur}
        </div>
      )}

      {/* Tableau des clients */}
      <div className="card">
        <div className="card-body">
          {clientsAffiches.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucun client trouvé</p>
              <Link to="/nouveauclient" className="btn btn-primary">
                Ajouter le premier client
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Photo</th>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Adresse</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsAffiches.map((client) => (
                      <tr key={client.id}>
                        <td>
                          <div className="avatar-client">
                            {client.photo ? (
                              <img
                                src={client.photo}
                                alt={`${client.nom} ${client.prenom}`}
                                className="photo-client"
                              />
                            ) : (
                              <div className="avatar-initiales">
                                {client.nom?.charAt(0)}{client.prenom?.charAt(0)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="fw-bold">{client.nom} {client.prenom}</div>
                            <small className="text-muted">ID: {client.id}</small>
                          </div>
                        </td>
                        <td>
                          <a href={`mailto:${client.email}`} className="text-primary">
                            {client.email}
                          </a>
                        </td>
                        <td>
                          {client.numTel ? (
                            <a href={`tel:${client.numTel}`} className="text-success">
                              {client.numTel}
                            </a>
                          ) : (
                            <span className="text-muted">Non renseigné</span>
                          )}
                        </td>
                        <td>
                          <div className="adresse-client">
                            {client.adresse ? (
                              <>
                                <div>{client.adresse.adresse1}</div>
                                {client.adresse.ville && (
                                  <small className="text-muted">
                                    {client.adresse.codePostal} {client.adresse.ville}
                                  </small>
                                )}
                              </>
                            ) : (
                              <span className="text-muted">Non renseignée</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <BoutonAction
                            onModifier={() => window.location.href = `/nouveauclient/${client.id}`}
                            onSupprimer={() => supprimerClient(client.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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

export default Clients;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceFournisseur } from '../../services/api';
import BoutonAction from '../../components/ActionButton/ActionButton';
import Pagination from '../../components/Pagination/Pagination';
import './Suppliers.css';

/**
 * Page de gestion des fournisseurs
 * Affiche la liste des fournisseurs avec possibilité de CRUD
 */
const Fournisseurs = () => {
  // États pour la gestion des fournisseurs
  const [fournisseurs, setFournisseurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const fournisseursParPage = 10;

  /**
   * Charge la liste des fournisseurs au montage
   */
  useEffect(() => {
    chargerFournisseurs();
  }, []);

  /**
   * Récupère tous les fournisseurs depuis l'API
   */
  const chargerFournisseurs = async () => {
    try {
      setChargement(true);
      const reponse = await serviceFournisseur.obtenirTous();
      setFournisseurs(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des fournisseurs');
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Supprime un fournisseur
   */
  const supprimerFournisseur = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      try {
        await serviceFournisseur.supprimer(id);
        await chargerFournisseurs();
      } catch (erreur) {
        setErreur('Erreur lors de la suppression');
        console.error('Erreur:', erreur);
      }
    }
  };

  /**
   * Filtre les fournisseurs selon la recherche
   */
  const fournisseursFiltres = fournisseurs.filter(fournisseur =>
    fournisseur.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
    fournisseur.prenom?.toLowerCase().includes(recherche.toLowerCase()) ||
    fournisseur.email?.toLowerCase().includes(recherche.toLowerCase())
  );

  /**
   * Calcul de la pagination
   */
  const indexDernier = pageActuelle * fournisseursParPage;
  const indexPremier = indexDernier - fournisseursParPage;
  const fournisseursAffiches = fournisseursFiltres.slice(indexPremier, indexDernier);
  const nombrePages = Math.ceil(fournisseursFiltres.length / fournisseursParPage);

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
    <div className="page-fournisseurs">
      {/* En-tête de la page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-truck"></i>
            Gestion des fournisseurs
          </h2>
          <p className="text-muted">Gérez votre réseau de fournisseurs</p>
        </div>
        <Link to="/nouveaufournisseur" className="btn btn-primary">
          <i className="fas fa-plus"></i> Nouveau fournisseur
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
                  placeholder="Rechercher un fournisseur..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-info">
                {fournisseursFiltres.length} fournisseur(s) trouvé(s)
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

      {/* Tableau des fournisseurs */}
      <div className="card">
        <div className="card-body">
          {fournisseursAffiches.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-truck fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucun fournisseur trouvé</p>
              <Link to="/nouveaufournisseur" className="btn btn-primary">
                Ajouter le premier fournisseur
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
                    {fournisseursAffiches.map((fournisseur) => (
                      <tr key={fournisseur.id}>
                        <td>
                          <div className="avatar-fournisseur">
                            {fournisseur.photo ? (
                              <img
                                src={fournisseur.photo}
                                alt={`${fournisseur.nom} ${fournisseur.prenom}`}
                                className="photo-fournisseur"
                              />
                            ) : (
                              <div className="avatar-initiales">
                                {fournisseur.nom?.charAt(0)}{fournisseur.prenom?.charAt(0)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="fw-bold">{fournisseur.nom} {fournisseur.prenom}</div>
                            <small className="text-muted">ID: {fournisseur.id}</small>
                          </div>
                        </td>
                        <td>
                          <a href={`mailto:${fournisseur.email}`} className="text-primary">
                            {fournisseur.email}
                          </a>
                        </td>
                        <td>
                          {fournisseur.numTel ? (
                            <a href={`tel:${fournisseur.numTel}`} className="text-success">
                              {fournisseur.numTel}
                            </a>
                          ) : (
                            <span className="text-muted">Non renseigné</span>
                          )}
                        </td>
                        <td>
                          <div className="adresse-fournisseur">
                            {fournisseur.adresse ? (
                              <>
                                <div>{fournisseur.adresse.adresse1}</div>
                                {fournisseur.adresse.ville && (
                                  <small className="text-muted">
                                    {fournisseur.adresse.codePostal} {fournisseur.adresse.ville}
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
                            onModifier={() => window.location.href = `/nouveaufournisseur/${fournisseur.id}`}
                            onSupprimer={() => supprimerFournisseur(fournisseur.id)}
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

export default Fournisseurs;
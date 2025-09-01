import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceUtilisateur } from '../../services/api';
import BoutonAction from '../../components/ActionButton/ActionButton';
import Pagination from '../../components/Pagination/Pagination';
import './Users.css';

/**
 * Page de gestion des utilisateurs
 * Affiche la liste des utilisateurs avec possibilité de CRUD
 */
const Utilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const utilisateursParPage = 10;

  useEffect(() => {
    chargerUtilisateurs();
  }, []);

  const chargerUtilisateurs = async () => {
    try {
      setChargement(true);
      const reponse = await serviceUtilisateur.obtenirTous();
      setUtilisateurs(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des utilisateurs');
    } finally {
      setChargement(false);
    }
  };

  const supprimerUtilisateur = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await serviceUtilisateur.supprimer(id);
        await chargerUtilisateurs();
      } catch (erreur) {
        setErreur('Erreur lors de la suppression');
      }
    }
  };

  const utilisateursFiltres = utilisateurs.filter(utilisateur =>
    utilisateur.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
    utilisateur.email?.toLowerCase().includes(recherche.toLowerCase())
  );

  const indexDernier = pageActuelle * utilisateursParPage;
  const indexPremier = indexDernier - utilisateursParPage;
  const utilisateursAffiches = utilisateursFiltres.slice(indexPremier, indexDernier);
  const nombrePages = Math.ceil(utilisateursFiltres.length / utilisateursParPage);

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
    <div className="page-utilisateurs">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-user-cog"></i>
            Gestion des utilisateurs
          </h2>
          <p className="text-muted">Gérez les comptes utilisateurs du système</p>
        </div>
        <Link to="/nouvelutilisateur" className="btn btn-primary">
          <i className="fas fa-user-plus"></i> Nouvel utilisateur
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
                  placeholder="Rechercher un utilisateur..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-info">
                {utilisateursFiltres.length} utilisateur(s) trouvé(s)
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
          {utilisateursAffiches.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucun utilisateur trouvé</p>
              <Link to="/nouvelutilisateur" className="btn btn-primary">
                Créer le premier utilisateur
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
                      <th>Rôle</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilisateursAffiches.map((utilisateur) => (
                      <tr key={utilisateur.id}>
                        <td>
                          <div className="avatar-utilisateur">
                            {utilisateur.photo ? (
                              <img
                                src={utilisateur.photo}
                                alt={`${utilisateur.nom} ${utilisateur.prenom}`}
                                className="photo-utilisateur"
                              />
                            ) : (
                              <div className="avatar-initiales">
                                {utilisateur.nom?.charAt(0)}{utilisateur.prenom?.charAt(0)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="fw-bold">{utilisateur.nom} {utilisateur.prenom}</div>
                            <small className="text-muted">ID: {utilisateur.id}</small>
                          </div>
                        </td>
                        <td>
                          <a href={`mailto:${utilisateur.email}`} className="text-primary">
                            {utilisateur.email}
                          </a>
                        </td>
                        <td>
                          {utilisateur.numTel ? (
                            <a href={`tel:${utilisateur.numTel}`} className="text-success">
                              {utilisateur.numTel}
                            </a>
                          ) : (
                            <span className="text-muted">Non renseigné</span>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-primary">
                            {utilisateur.roles?.[0]?.roleName || 'USER'}
                          </span>
                        </td>
                        <td>
                          <BoutonAction
                            onModifier={() => window.location.href = `/nouvelutilisateur/${utilisateur.id}`}
                            onSupprimer={() => supprimerUtilisateur(utilisateur.id)}
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

export default Utilisateurs;
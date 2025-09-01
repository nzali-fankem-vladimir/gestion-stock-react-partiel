import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategorie } from '../../services/api';
import BoutonAction from '../../components/ActionButton/ActionButton';
import Pagination from '../../components/Pagination/Pagination';
import './Categories.css';

/**
 * Page de gestion des catégories
 * Affiche la liste des catégories avec possibilité de CRUD
 */
const Categories = () => {
  // États pour la gestion des catégories
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const categoriesParPage = 10;

  /**
   * Charge la liste des catégories au montage
   */
  useEffect(() => {
    chargerCategories();
  }, []);

  /**
   * Récupère toutes les catégories depuis l'API
   */
  const chargerCategories = async () => {
    try {
      setChargement(true);
      const reponse = await serviceCategorie.obtenirTous();
      setCategories(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des catégories');
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Supprime une catégorie
   */
  const supprimerCategorie = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await serviceCategorie.supprimer(id);
        await chargerCategories();
      } catch (erreur) {
        setErreur('Erreur lors de la suppression');
        console.error('Erreur:', erreur);
      }
    }
  };

  /**
   * Filtre les catégories selon la recherche
   */
  const categoriesFiltrees = categories.filter(categorie =>
    categorie.designation?.toLowerCase().includes(recherche.toLowerCase()) ||
    categorie.codeCategory?.toLowerCase().includes(recherche.toLowerCase())
  );

  /**
   * Calcul de la pagination
   */
  const indexDernier = pageActuelle * categoriesParPage;
  const indexPremier = indexDernier - categoriesParPage;
  const categoriesAffichees = categoriesFiltrees.slice(indexPremier, indexDernier);
  const nombrePages = Math.ceil(categoriesFiltrees.length / categoriesParPage);

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
    <div className="page-categories">
      {/* En-tête de la page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-tags"></i>
            Gestion des catégories
          </h2>
          <p className="text-muted">Organisez vos articles par catégories</p>
        </div>
        <Link to="/nouvellecategorie" className="btn btn-primary">
          <i className="fas fa-plus"></i> Nouvelle catégorie
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
                  placeholder="Rechercher une catégorie..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-info">
                {categoriesFiltrees.length} catégorie(s) trouvée(s)
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

      {/* Tableau des catégories */}
      <div className="card">
        <div className="card-body">
          {categoriesAffichees.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-tags fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucune catégorie trouvée</p>
              <Link to="/nouvellecategorie" className="btn btn-primary">
                Créer la première catégorie
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Code</th>
                      <th>Désignation</th>
                      <th>Description</th>
                      <th>Nombre d'articles</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesAffichees.map((categorie) => (
                      <tr key={categorie.id}>
                        <td>
                          <span className="badge bg-secondary">
                            {categorie.codeCategory}
                          </span>
                        </td>
                        <td className="fw-bold">{categorie.designation}</td>
                        <td className="text-muted">
                          {categorie.description || 'Aucune description'}
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {categorie.articles?.length || 0} article(s)
                          </span>
                        </td>
                        <td>
                          <BoutonAction
                            onModifier={() => window.location.href = `/nouvellecategorie/${categorie.id}`}
                            onSupprimer={() => supprimerCategorie(categorie.id)}
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

export default Categories;
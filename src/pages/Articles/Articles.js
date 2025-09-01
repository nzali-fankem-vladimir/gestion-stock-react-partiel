import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serviceArticle } from '../../services/api';
import BoutonAction from '../../components/ActionButton/ActionButton';
import Pagination from '../../components/Pagination/Pagination';
import './Articles.css';

/**
 * Page de gestion des articles
 * Affiche la liste des articles avec possibilité de CRUD
 */
const Articles = () => {
  const naviguer = useNavigate();
  
  // États pour la gestion des articles
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const articlesParPage = 10;

  /**
   * Charge la liste des articles au montage
   */
  useEffect(() => {
    chargerArticles();
  }, []);

  /**
   * Réinitialise la page lors du changement de recherche
   */
  useEffect(() => {
    setPageActuelle(1);
  }, [recherche]);

  /**
   * Récupère tous les articles depuis l'API
   */
  const chargerArticles = async () => {
    try {
      setChargement(true);
      const reponse = await serviceArticle.obtenirTous();
      setArticles(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des articles');
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Supprime un article
   */
  const supprimerArticle = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await serviceArticle.supprimer(id);
        await chargerArticles();
      } catch (erreur) {
        setErreur('Erreur lors de la suppression');
        console.error('Erreur:', erreur);
      }
    }
  };

  /**
   * Navigue vers la modification d'un article
   */
  const modifierArticle = (id) => {
    naviguer(`/nouvelarticle/${id}`);
  };

  /**
   * Filtre les articles selon la recherche (mémorisé pour éviter les recalculs)
   */
  const articlesFiltres = React.useMemo(() => {
    if (!recherche.trim()) return articles;
    return articles.filter(article =>
      article.designation?.toLowerCase().includes(recherche.toLowerCase()) ||
      article.codeArticle?.toLowerCase().includes(recherche.toLowerCase())
    );
  }, [articles, recherche]);

  /**
   * Calcul de la pagination (mémorisé)
   */
  const { articlesAffiches, nombrePages } = React.useMemo(() => {
    const indexDernier = pageActuelle * articlesParPage;
    const indexPremier = indexDernier - articlesParPage;
    return {
      articlesAffiches: articlesFiltres.slice(indexPremier, indexDernier),
      nombrePages: Math.ceil(articlesFiltres.length / articlesParPage)
    };
  }, [articlesFiltres, pageActuelle, articlesParPage]);

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
    <div className="page-articles">
      {/* En-tête de la page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-cubes"></i>
            Gestion des articles
          </h2>
          <p className="text-muted">Gérez votre catalogue d'articles</p>
        </div>
        <Link to="/nouvelarticle" className="btn btn-primary">
          <i className="fas fa-plus"></i> Nouvel article
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
                  placeholder="Rechercher un article..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="badge bg-info">
                {articlesFiltres.length} article(s) trouvé(s)
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

      {/* Tableau des articles */}
      <div className="card">
        <div className="card-body">
          {articlesAffiches.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucun article trouvé</p>
              <Link to="/nouvelarticle" className="btn btn-primary">
                Créer le premier article
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Photo</th>
                      <th>Code</th>
                      <th>Désignation</th>
                      <th>Catégorie</th>
                      <th>Prix unitaire HT</th>
                      <th>Quantité</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articlesAffiches.map((article) => (
                      <tr key={article.id}>
                        <td>
                          <div className="photo-container">
                            <img
                              src={article.photo || '/favicon.ico'}
                              alt={article.designation}
                              className="photo-article"
                              onError={(e) => {
                                e.target.src = '/favicon.ico';
                              }}
                              loading="lazy"
                            />
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary">
                            {article.codeArticle}
                          </span>
                        </td>
                        <td className="fw-bold">{article.designation}</td>
                        <td>{article.category?.designation || 'N/A'}</td>
                        <td>
                          <span className="text-success fw-bold">
                            {typeof article.prixUnitaireHt === 'number' ? article.prixUnitaireHt.toFixed(2) : '0.00'} €
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${
                            (article.quantite || 0) > 10 ? 'bg-success' : 
                            (article.quantite || 0) > 0 ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {article.quantite || 0}
                          </span>
                        </td>
                        <td>
                          <BoutonAction
                            onModifier={() => modifierArticle(article.id)}
                            onSupprimer={() => supprimerArticle(article.id)}
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

export default Articles;
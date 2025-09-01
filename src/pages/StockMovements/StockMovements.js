import React, { useState, useEffect } from 'react';
import { serviceMouvementStock, serviceArticle } from '../../services/api';
import Pagination from '../../components/Pagination/Pagination';
import './StockMovements.css';

/**
 * Page de gestion des mouvements de stock
 * Affiche l'historique et permet d'ajouter des mouvements
 */
const MouvementsStock = () => {
  // États pour la gestion des mouvements
  const [mouvements, setMouvements] = useState([]);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [pageActuelle, setPageActuelle] = useState(1);
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const mouvementsParPage = 15;

  // États pour le formulaire de mouvement
  const [nouveauMouvement, setNouveauMouvement] = useState({
    typeMouvement: 'ENTREE',
    quantite: '',
    articleId: '',
    dateMouvement: new Date().toISOString().split('T')[0]
  });

  /**
   * Charge les données au montage
   */
  useEffect(() => {
    chargerMouvements();
    chargerArticles();
  }, []);

  /**
   * Récupère tous les mouvements de stock
   */
  const chargerMouvements = async () => {
    try {
      setChargement(true);
      const reponse = await serviceMouvementStock.obtenirTous();
      setMouvements(reponse.data || []);
    } catch (erreur) {
      setErreur('Erreur lors du chargement des mouvements');
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Récupère tous les articles
   */
  const chargerArticles = async () => {
    try {
      const reponse = await serviceArticle.obtenirTous();
      setArticles(reponse.data || []);
    } catch (erreur) {
      console.error('Erreur lors du chargement des articles:', erreur);
    }
  };

  /**
   * Gère les changements dans le formulaire
   */
  const gererChangement = (e) => {
    const { name, value } = e.target;
    setNouveauMouvement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Ajoute un nouveau mouvement de stock
   */
  const ajouterMouvement = async (e) => {
    e.preventDefault();
    
    if (!nouveauMouvement.articleId || !nouveauMouvement.quantite) {
      setErreur('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setChargement(true);
      
      const donneesM = {
        quantite: parseFloat(nouveauMouvement.quantite),
        dateMouvement: nouveauMouvement.dateMouvement,
        article: { id: nouveauMouvement.articleId }
      };

      // Appeler le bon service selon le type de mouvement
      switch (nouveauMouvement.typeMouvement) {
        case 'ENTREE':
          await serviceMouvementStock.entreeStock(donneesM);
          break;
        case 'SORTIE':
          await serviceMouvementStock.sortieStock(donneesM);
          break;
        case 'CORRECTION':
          await serviceMouvementStock.correctionStock(donneesM);
          break;
        default:
          throw new Error('Type de mouvement non valide');
      }

      // Réinitialiser le formulaire et recharger les données
      setNouveauMouvement({
        typeMouvement: 'ENTREE',
        quantite: '',
        articleId: '',
        dateMouvement: new Date().toISOString().split('T')[0]
      });
      setAfficherFormulaire(false);
      await chargerMouvements();
      setErreur('');
      
    } catch (erreur) {
      setErreur('Erreur lors de l\'ajout du mouvement');
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Formate la date pour l'affichage
   */
  const formaterDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Retourne la classe CSS selon le type de mouvement
   */
  const getClasseMouvement = (type) => {
    switch (type) {
      case 'ENTREE': return 'badge bg-success';
      case 'SORTIE': return 'badge bg-danger';
      case 'CORRECTION_POS': return 'badge bg-info';
      case 'CORRECTION_NEG': return 'badge bg-warning';
      default: return 'badge bg-secondary';
    }
  };

  /**
   * Calcul de la pagination
   */
  const indexDernier = pageActuelle * mouvementsParPage;
  const indexPremier = indexDernier - mouvementsParPage;
  const mouvementsAffiches = mouvements.slice(indexPremier, indexDernier);
  const nombrePages = Math.ceil(mouvements.length / mouvementsParPage);

  if (chargement && mouvements.length === 0) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-mouvements-stock">
      {/* En-tête de la page */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-exchange-alt"></i>
            Mouvements de stock
          </h2>
          <p className="text-muted">Suivez et gérez les mouvements de votre stock</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
        >
          <i className="fas fa-plus"></i> Nouveau mouvement
        </button>
      </div>

      {/* Formulaire d'ajout de mouvement */}
      {afficherFormulaire && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-plus-circle"></i>
              Ajouter un mouvement de stock
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={ajouterMouvement}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Type de mouvement *</label>
                  <select
                    className="form-select"
                    name="typeMouvement"
                    value={nouveauMouvement.typeMouvement}
                    onChange={gererChangement}
                    required
                  >
                    <option value="ENTREE">Entrée de stock</option>
                    <option value="SORTIE">Sortie de stock</option>
                    <option value="CORRECTION">Correction de stock</option>
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">Article *</label>
                  <select
                    className="form-select"
                    name="articleId"
                    value={nouveauMouvement.articleId}
                    onChange={gererChangement}
                    required
                  >
                    <option value="">Sélectionner un article</option>
                    {articles.map(article => (
                      <option key={article.id} value={article.id}>
                        {article.designation} ({article.codeArticle})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2 mb-3">
                  <label className="form-label">Quantité *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantite"
                    value={nouveauMouvement.quantite}
                    onChange={gererChangement}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>

                <div className="col-md-2 mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateMouvement"
                    value={nouveauMouvement.dateMouvement}
                    onChange={gererChangement}
                  />
                </div>

                <div className="col-md-2 mb-3 d-flex align-items-end">
                  <button type="submit" className="btn btn-success me-2" disabled={chargement}>
                    <i className="fas fa-check"></i> Ajouter
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setAfficherFormulaire(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Messages d'erreur */}
      {erreur && (
        <div className="alert alert-danger" role="alert">
          {erreur}
        </div>
      )}

      {/* Tableau des mouvements */}
      <div className="card">
        <div className="card-body">
          {mouvements.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-exchange-alt fa-3x text-muted mb-3"></i>
              <p className="text-muted">Aucun mouvement de stock enregistré</p>
              <button 
                className="btn btn-primary"
                onClick={() => setAfficherFormulaire(true)}
              >
                Ajouter le premier mouvement
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Article</th>
                      <th>Type</th>
                      <th>Quantité</th>
                      <th>Stock après</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mouvementsAffiches.map((mouvement) => (
                      <tr key={mouvement.id}>
                        <td>{formaterDate(mouvement.dateMouvement)}</td>
                        <td>
                          <div>
                            <div className="fw-bold">{mouvement.article?.designation}</div>
                            <small className="text-muted">{mouvement.article?.codeArticle}</small>
                          </div>
                        </td>
                        <td>
                          <span className={getClasseMouvement(mouvement.typeMouvement)}>
                            {mouvement.typeMouvement?.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <span className={`fw-bold ${
                            mouvement.typeMouvement === 'ENTREE' ? 'text-success' : 
                            mouvement.typeMouvement === 'SORTIE' ? 'text-danger' : 'text-info'
                          }`}>
                            {mouvement.typeMouvement === 'ENTREE' ? '+' : 
                             mouvement.typeMouvement === 'SORTIE' ? '-' : '±'}
                            {mouvement.quantite}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {mouvement.article?.quantite || 0}
                          </span>
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

export default MouvementsStock;
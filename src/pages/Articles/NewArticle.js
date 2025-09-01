import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceArticle, serviceCategorie } from '../../services/api';
import './NewArticle.css';

/**
 * Page de création/modification d'un article
 * Gère le formulaire d'ajout et de modification des articles
 */
const NouvelArticle = () => {
  const naviguer = useNavigate();
  const { id } = useParams();
  const estModification = !!id;

  // États pour le formulaire
  const [article, setArticle] = useState({
    designation: '',
    codeArticle: '',
    prixUnitaireHt: '',
    tauxTva: '',
    prixUnitaireTtc: '',
    photo: '',
    category: { id: '' }
  });
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState({});

  /**
   * Charge les données au montage du composant
   */
  useEffect(() => {
    chargerCategories();
    if (estModification) {
      chargerArticle();
    }
  }, [id]);

  /**
   * Calcule automatiquement le prix TTC
   */
  useEffect(() => {
    if (article.prixUnitaireHt && article.tauxTva) {
      const prixHt = parseFloat(article.prixUnitaireHt);
      const taux = parseFloat(article.tauxTva);
      const prixTtc = prixHt * (1 + taux / 100);
      setArticle(prev => ({
        ...prev,
        prixUnitaireTtc: prixTtc.toFixed(2)
      }));
    }
  }, [article.prixUnitaireHt, article.tauxTva]);

  /**
   * Charge la liste des catégories
   */
  const chargerCategories = async () => {
    try {
      const reponse = await serviceCategorie.obtenirTous();
      setCategories(reponse.data || []);
    } catch (erreur) {
      console.error('Erreur lors du chargement des catégories:', erreur);
    }
  };

  /**
   * Charge les données de l'article à modifier
   */
  const chargerArticle = async () => {
    try {
      setChargement(true);
      const reponse = await serviceArticle.obtenirParId(id);
      setArticle(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors du chargement de l\'article:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Gère les changements dans le formulaire
   */
  const gererChangement = (e) => {
    const { name, value } = e.target;
    
    if (name === 'categoryId') {
      setArticle(prev => ({
        ...prev,
        category: { id: value }
      }));
    } else {
      setArticle(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Supprimer l'erreur du champ modifié
    if (erreurs[name]) {
      setErreurs(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Valide le formulaire
   */
  const validerFormulaire = () => {
    const nouvellesErreurs = {};

    if (!article.designation.trim()) {
      nouvellesErreurs.designation = 'La désignation est obligatoire';
    }
    if (!article.codeArticle.trim()) {
      nouvellesErreurs.codeArticle = 'Le code article est obligatoire';
    }
    if (!article.prixUnitaireHt || article.prixUnitaireHt <= 0) {
      nouvellesErreurs.prixUnitaireHt = 'Le prix unitaire HT doit être supérieur à 0';
    }
    if (!article.tauxTva || article.tauxTva < 0) {
      nouvellesErreurs.tauxTva = 'Le taux de TVA est obligatoire';
    }
    if (!article.category.id) {
      nouvellesErreurs.categoryId = 'La catégorie est obligatoire';
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  /**
   * Soumet le formulaire
   */
  const gererSoumission = async (e) => {
    e.preventDefault();
    
    if (!validerFormulaire()) {
      return;
    }

    try {
      setChargement(true);
      
      const donneesArticle = {
        ...article,
        prixUnitaireHt: parseFloat(article.prixUnitaireHt),
        tauxTva: parseFloat(article.tauxTva),
        prixUnitaireTtc: parseFloat(article.prixUnitaireTtc)
      };

      if (estModification) {
        await serviceArticle.modifier(donneesArticle);
      } else {
        await serviceArticle.creer(donneesArticle);
      }
      
      naviguer('/articles');
    } catch (erreur) {
      console.error('Erreur lors de la sauvegarde:', erreur);
      setErreurs({ general: 'Erreur lors de la sauvegarde de l\'article' });
    } finally {
      setChargement(false);
    }
  };

  if (chargement && estModification) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-nouvel-article">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-cube"></i>
            {estModification ? 'Modifier l\'article' : 'Nouvel article'}
          </h2>
          <p className="text-muted">
            {estModification ? 'Modifiez les informations de l\'article' : 'Ajoutez un nouvel article à votre catalogue'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => naviguer('/articles')}
        >
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>

      {/* Formulaire */}
      <div className="card">
        <div className="card-body">
          {erreurs.general && (
            <div className="alert alert-danger" role="alert">
              {erreurs.general}
            </div>
          )}

          <form onSubmit={gererSoumission}>
            <div className="row">
              {/* Désignation */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Désignation *</label>
                <input
                  type="text"
                  className={`form-control ${erreurs.designation ? 'is-invalid' : ''}`}
                  name="designation"
                  value={article.designation}
                  onChange={gererChangement}
                  placeholder="Nom de l'article"
                />
                {erreurs.designation && (
                  <div className="invalid-feedback">{erreurs.designation}</div>
                )}
              </div>

              {/* Code article */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Code article *</label>
                <input
                  type="text"
                  className={`form-control ${erreurs.codeArticle ? 'is-invalid' : ''}`}
                  name="codeArticle"
                  value={article.codeArticle}
                  onChange={gererChangement}
                  placeholder="Code unique de l'article"
                />
                {erreurs.codeArticle && (
                  <div className="invalid-feedback">{erreurs.codeArticle}</div>
                )}
              </div>

              {/* Prix unitaire HT */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Prix unitaire HT *</label>
                <div className="input-group">
                  <input
                    type="number"
                    step="0.01"
                    className={`form-control ${erreurs.prixUnitaireHt ? 'is-invalid' : ''}`}
                    name="prixUnitaireHt"
                    value={article.prixUnitaireHt}
                    onChange={gererChangement}
                    placeholder="0.00"
                  />
                  <span className="input-group-text">€</span>
                  {erreurs.prixUnitaireHt && (
                    <div className="invalid-feedback">{erreurs.prixUnitaireHt}</div>
                  )}
                </div>
              </div>

              {/* Taux TVA */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Taux TVA *</label>
                <div className="input-group">
                  <input
                    type="number"
                    step="0.01"
                    className={`form-control ${erreurs.tauxTva ? 'is-invalid' : ''}`}
                    name="tauxTva"
                    value={article.tauxTva}
                    onChange={gererChangement}
                    placeholder="20.00"
                  />
                  <span className="input-group-text">%</span>
                  {erreurs.tauxTva && (
                    <div className="invalid-feedback">{erreurs.tauxTva}</div>
                  )}
                </div>
              </div>

              {/* Prix unitaire TTC */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Prix unitaire TTC</label>
                <div className="input-group">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="prixUnitaireTtc"
                    value={article.prixUnitaireTtc}
                    readOnly
                    placeholder="Calculé automatiquement"
                  />
                  <span className="input-group-text">€</span>
                </div>
              </div>

              {/* Catégorie */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Catégorie *</label>
                <select
                  className={`form-select ${erreurs.categoryId ? 'is-invalid' : ''}`}
                  name="categoryId"
                  value={article.category.id}
                  onChange={gererChangement}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(categorie => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.designation}
                    </option>
                  ))}
                </select>
                {erreurs.categoryId && (
                  <div className="invalid-feedback">{erreurs.categoryId}</div>
                )}
              </div>

              {/* Photo */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Photo (URL)</label>
                <input
                  type="url"
                  className="form-control"
                  name="photo"
                  value={article.photo}
                  onChange={gererChangement}
                  placeholder="https://exemple.com/photo.jpg"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => naviguer('/articles')}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={chargement}
              >
                {chargement ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    {estModification ? ' Modifier' : ' Créer'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NouvelArticle;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceCategorie } from '../../services/api';
import './NewCategory.css';

/**
 * Page de création/modification d'une catégorie
 * Gère le formulaire d'ajout et de modification des catégories
 */
const NouvelleCategorie = () => {
  const naviguer = useNavigate();
  const { id } = useParams();
  const estModification = !!id;

  // États pour le formulaire
  const [categorie, setCategorie] = useState({
    designation: '',
    codeCategory: '',
    description: ''
  });
  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState({});

  /**
   * Charge les données au montage du composant
   */
  useEffect(() => {
    if (estModification) {
      chargerCategorie();
    }
  }, [id]);

  /**
   * Charge les données de la catégorie à modifier
   */
  const chargerCategorie = async () => {
    try {
      setChargement(true);
      const reponse = await serviceCategorie.obtenirParId(id);
      setCategorie(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors du chargement de la catégorie:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Gère les changements dans le formulaire
   */
  const gererChangement = (e) => {
    const { name, value } = e.target;
    setCategorie(prev => ({
      ...prev,
      [name]: value
    }));
    
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

    if (!categorie.designation.trim()) {
      nouvellesErreurs.designation = 'La désignation est obligatoire';
    }
    if (!categorie.codeCategory.trim()) {
      nouvellesErreurs.codeCategory = 'Le code catégorie est obligatoire';
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
      
      if (estModification) {
        await serviceCategorie.modifier(categorie);
      } else {
        await serviceCategorie.creer(categorie);
      }
      
      naviguer('/categories');
    } catch (erreur) {
      console.error('Erreur lors de la sauvegarde:', erreur);
      setErreurs({ general: 'Erreur lors de la sauvegarde de la catégorie' });
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
    <div className="page-nouvelle-categorie">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-tag"></i>
            {estModification ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h2>
          <p className="text-muted">
            {estModification ? 'Modifiez les informations de la catégorie' : 'Ajoutez une nouvelle catégorie pour organiser vos articles'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => naviguer('/categories')}
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
                  value={categorie.designation}
                  onChange={gererChangement}
                  placeholder="Nom de la catégorie"
                />
                {erreurs.designation && (
                  <div className="invalid-feedback">{erreurs.designation}</div>
                )}
              </div>

              {/* Code catégorie */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Code catégorie *</label>
                <input
                  type="text"
                  className={`form-control ${erreurs.codeCategory ? 'is-invalid' : ''}`}
                  name="codeCategory"
                  value={categorie.codeCategory}
                  onChange={gererChangement}
                  placeholder="Code unique de la catégorie"
                />
                {erreurs.codeCategory && (
                  <div className="invalid-feedback">{erreurs.codeCategory}</div>
                )}
              </div>

              {/* Description */}
              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={categorie.description}
                  onChange={gererChangement}
                  placeholder="Description de la catégorie (optionnel)"
                ></textarea>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => naviguer('/categories')}
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

export default NouvelleCategorie;
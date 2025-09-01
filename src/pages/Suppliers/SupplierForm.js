import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceFournisseur } from '../../services/api';
import './SupplierForm.css';

/**
 * Formulaire pour créer/modifier un fournisseur
 */
const FormulaireFournisseur = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const estModification = Boolean(id);

  // État du formulaire
  const [fournisseur, setFournisseur] = useState({
    nom: '',
    mail: '',
    numTel: '',
    adresse: {
      adresse1: ''
    }
  });

  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState('');

  /**
   * Charge les données du fournisseur en mode modification
   */
  useEffect(() => {
    if (estModification) {
      chargerFournisseur();
    }
  }, [id, estModification]);

  /**
   * Récupère les données du fournisseur à modifier
   */
  const chargerFournisseur = async () => {
    try {
      setChargement(true);
      const reponse = await serviceFournisseur.obtenirParId(id);
      const donnees = reponse.data;
      
      setFournisseur({
        ...donnees,
        adresse: donnees.adresse || {
          adresse1: '',
          adresse2: '',
          ville: '',
          codePostale: '',
          pays: ''
        }
      });
      
      if (donnees.photo) {
        setPreviewPhoto(donnees.photo);
      }
    } catch (erreur) {
      setErreurs(['Erreur lors du chargement du fournisseur']);
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Gère les changements dans les champs du formulaire
   */
  const gererChangement = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('adresse.')) {
      const champAdresse = name.split('.')[1];
      setFournisseur(prev => ({
        ...prev,
        adresse: {
          ...prev.adresse,
          [champAdresse]: value
        }
      }));
    } else {
      setFournisseur(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Gère la sélection de photo
   */
  const gererSelectionPhoto = (e) => {
    const fichier = e.target.files[0];
    if (fichier) {
      setPhoto(fichier);
      
      // Créer un aperçu
      const lecteur = new FileReader();
      lecteur.onload = (event) => {
        setPreviewPhoto(event.target.result);
      };
      lecteur.readAsDataURL(fichier);
    }
  };

  /**
   * Valide le formulaire
   */
  const validerFormulaire = () => {
    const nouvellesErreurs = [];

    if (!fournisseur.nom?.trim()) {
      nouvellesErreurs.push('Le nom est obligatoire');
    }
    if (fournisseur.mail && !/\S+@\S+\.\S+/.test(fournisseur.mail)) {
      nouvellesErreurs.push('L\'email n\'est pas valide');
    }

    setErreurs(nouvellesErreurs);
    return nouvellesErreurs.length === 0;
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
      setErreurs([]);

      // Structure exacte du backend réel
      const fournisseurData = {
        nom: fournisseur.nom,
        email: fournisseur.mail || null,
        telephone: fournisseur.numTel || null,
        adresse: fournisseur.adresse.adresse1 || null
      };

      console.log('Données à envoyer:', JSON.stringify(fournisseurData, null, 2));

      if (estModification) {
        await serviceFournisseur.modifier({ ...fournisseurData, id });
      } else {
        await serviceFournisseur.creer(fournisseurData);
      }

      navigate('/fournisseurs');
    } catch (erreur) {
      if (erreur.response?.data?.errors) {
        setErreurs(erreur.response.data.errors);
      } else {
        setErreurs(['Erreur lors de l\'enregistrement']);
      }
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Annule et retourne à la liste
   */
  const annuler = () => {
    navigate('/fournisseurs');
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
    <div className="formulaire-fournisseur">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-truck"></i>
            {estModification ? 'Modifier le fournisseur' : 'Nouveau fournisseur'}
          </h2>
          <p className="text-muted">
            {estModification ? 'Modifiez les informations du fournisseur' : 'Ajoutez un nouveau fournisseur'}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {/* Photo */}
          <div className="text-center mb-4">
            <div className="photo-container">
              <img
                src={previewPhoto || '/assets/product.png'}
                alt="Photo fournisseur"
                className="photo-preview"
                onClick={() => document.getElementById('photoInput').click()}
              />
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                onChange={gererSelectionPhoto}
                style={{ display: 'none' }}
              />
              <div className="photo-overlay">
                <i className="fas fa-camera"></i>
              </div>
            </div>
            <small className="text-muted">Cliquez pour changer la photo</small>
          </div>

          {/* Messages d'erreur */}
          {erreurs.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {erreurs.map((erreur, index) => (
                  <li key={index}>{erreur}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={gererSoumission}>
            {/* Informations personnelles */}
            <div className="row mb-4">
              <div className="col-12">
                <h5><i className="fas fa-user text-primary"></i> Informations personnelles</h5>
                <hr />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Nom *</label>
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  value={fournisseur.nom}
                  onChange={gererChangement}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="mail"
                  value={fournisseur.mail}
                  onChange={gererChangement}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="numTel"
                  value={fournisseur.numTel}
                  onChange={gererChangement}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  name="adresse.adresse1"
                  value={fournisseur.adresse.adresse1}
                  onChange={gererChangement}
                  placeholder="Adresse complète"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={annuler}
                disabled={chargement}
              >
                <i className="fas fa-times"></i> Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={chargement}
              >
                {chargement ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> Enregistrer
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

export default FormulaireFournisseur;
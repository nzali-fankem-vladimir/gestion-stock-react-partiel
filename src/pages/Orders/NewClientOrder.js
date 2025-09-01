import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceCommandeClient, serviceClient, serviceArticle } from '../../services/api';
import './NewClientOrder.css';

/**
 * Page de création d'une nouvelle commande client
 */
const NouvelleCommandeClient = () => {
  const naviguer = useNavigate();

  const [commande, setCommande] = useState({
    code: '',
    dateCommande: new Date().toISOString().split('T')[0],
    etatCommande: 'EN_PREPARATION',
    clientId: '',
    lignes: []
  });
  const [clients, setClients] = useState([]);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    chargerDonnees();
    genererCodeCommande();
  }, []);

  const chargerDonnees = async () => {
    try {
      const [clientsReponse, articlesReponse] = await Promise.all([
        serviceClient.obtenirTous(),
        serviceArticle.obtenirTous()
      ]);
      setClients(clientsReponse.data || []);
      setArticles(articlesReponse.data || []);
    } catch (erreur) {
      console.error('Erreur:', erreur);
    }
  };

  const genererCodeCommande = () => {
    const code = 'CMD-' + Date.now();
    setCommande(prev => ({ ...prev, code }));
  };

  const ajouterLigne = () => {
    const nouvelleLigne = {
      id: Date.now(),
      articleId: '',
      quantite: 1,
      prixUnitaire: 0
    };
    setCommande(prev => ({
      ...prev,
      lignes: [...prev.lignes, nouvelleLigne]
    }));
  };

  const supprimerLigne = (id) => {
    setCommande(prev => ({
      ...prev,
      lignes: prev.lignes.filter(ligne => ligne.id !== id)
    }));
  };

  const modifierLigne = (id, champ, valeur) => {
    setCommande(prev => ({
      ...prev,
      lignes: prev.lignes.map(ligne => {
        if (ligne.id === id) {
          const ligneMaj = { ...ligne, [champ]: valeur };
          
          // Mettre à jour le prix automatiquement si l'article change
          if (champ === 'articleId') {
            const article = articles.find(a => a.id === parseInt(valeur));
            if (article) {
              ligneMaj.prixUnitaire = article.prixUnitaireHt;
            }
          }
          
          return ligneMaj;
        }
        return ligne;
      })
    }));
  };

  const calculerTotal = () => {
    return commande.lignes.reduce((total, ligne) => {
      return total + (ligne.quantite * ligne.prixUnitaire);
    }, 0);
  };

  const gererSoumission = async (e) => {
    e.preventDefault();
    
    if (!commande.clientId || commande.lignes.length === 0) {
      setErreurs({ general: 'Veuillez sélectionner un client et ajouter au moins un article' });
      return;
    }

    try {
      setChargement(true);
      
      const donneesCommande = {
        code: commande.code,
        dateCommande: commande.dateCommande,
        etatCommande: commande.etatCommande,
        client: { id: commande.clientId },
        ligneCommandeClients: commande.lignes.map(ligne => ({
          article: { id: ligne.articleId },
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire
        }))
      };

      await serviceCommandeClient.creer(donneesCommande);
      naviguer('/commandes-clients');
    } catch (erreur) {
      setErreurs({ general: 'Erreur lors de la création de la commande' });
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="page-nouvelle-commande-client">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-shopping-cart"></i>
            Nouvelle commande client
          </h2>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => naviguer('/commandes-clients')}
        >
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          {erreurs.general && (
            <div className="alert alert-danger" role="alert">
              {erreurs.general}
            </div>
          )}

          <form onSubmit={gererSoumission}>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <label className="form-label">Code commande</label>
                <input
                  type="text"
                  className="form-control"
                  value={commande.code}
                  readOnly
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Date commande</label>
                <input
                  type="date"
                  className="form-control"
                  value={commande.dateCommande}
                  onChange={(e) => setCommande(prev => ({ ...prev, dateCommande: e.target.value }))}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Client *</label>
                <select
                  className="form-select"
                  value={commande.clientId}
                  onChange={(e) => setCommande(prev => ({ ...prev, clientId: e.target.value }))}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.nom} {client.prenom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="section-lignes">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Articles commandés</h5>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={ajouterLigne}
                >
                  <i className="fas fa-plus"></i> Ajouter un article
                </button>
              </div>

              {commande.lignes.length === 0 ? (
                <div className="text-center py-4 border rounded">
                  <p className="text-muted">Aucun article ajouté</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ajouterLigne}
                  >
                    Ajouter le premier article
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Article</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commande.lignes.map((ligne) => (
                        <tr key={ligne.id}>
                          <td>
                            <select
                              className="form-select"
                              value={ligne.articleId}
                              onChange={(e) => modifierLigne(ligne.id, 'articleId', e.target.value)}
                            >
                              <option value="">Sélectionner un article</option>
                              {articles.map(article => (
                                <option key={article.id} value={article.id}>
                                  {article.designation}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={ligne.quantite}
                              onChange={(e) => modifierLigne(ligne.id, 'quantite', parseInt(e.target.value))}
                              min="1"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.01"
                              className="form-control"
                              value={ligne.prixUnitaire}
                              onChange={(e) => modifierLigne(ligne.id, 'prixUnitaire', parseFloat(e.target.value))}
                            />
                          </td>
                          <td>
                            <span className="fw-bold">
                              {(ligne.quantite * ligne.prixUnitaire).toFixed(2)} €
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => supprimerLigne(ligne.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="3" className="text-end">Total commande :</th>
                        <th className="text-success">{calculerTotal().toFixed(2)} €</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => naviguer('/commandes-clients')}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={chargement || commande.lignes.length === 0}
              >
                {chargement ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Création...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> Créer la commande
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

export default NouvelleCommandeClient;
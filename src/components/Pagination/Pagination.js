import React from 'react';
import './Pagination.css';

/**
 * Composant de pagination réutilisable
 * Gère la navigation entre les pages de données
 */
const Pagination = ({ pageActuelle, nombrePages, onChangerPage }) => {
  /**
   * Génère les numéros de pages à afficher
   */
  const genererNumeroPages = () => {
    const pages = [];
    const maxPagesVisibles = 5;
    
    let debut = Math.max(1, pageActuelle - Math.floor(maxPagesVisibles / 2));
    let fin = Math.min(nombrePages, debut + maxPagesVisibles - 1);
    
    // Ajuster le début si on est près de la fin
    if (fin - debut < maxPagesVisibles - 1) {
      debut = Math.max(1, fin - maxPagesVisibles + 1);
    }
    
    for (let i = debut; i <= fin; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (nombrePages <= 1) return null;

  const pages = genererNumeroPages();

  return (
    <nav className="pagination-container">
      <ul className="pagination justify-content-center">
        {/* Bouton Précédent */}
        <li className={`page-item ${pageActuelle === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onChangerPage(pageActuelle - 1)}
            disabled={pageActuelle === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>

        {/* Première page si nécessaire */}
        {pages[0] > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => onChangerPage(1)}>
                1
              </button>
            </li>
            {pages[0] > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {/* Pages visibles */}
        {pages.map(page => (
          <li key={page} className={`page-item ${page === pageActuelle ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onChangerPage(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Dernière page si nécessaire */}
        {pages[pages.length - 1] < nombrePages && (
          <>
            {pages[pages.length - 1] < nombrePages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button className="page-link" onClick={() => onChangerPage(nombrePages)}>
                {nombrePages}
              </button>
            </li>
          </>
        )}

        {/* Bouton Suivant */}
        <li className={`page-item ${pageActuelle === nombrePages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onChangerPage(pageActuelle + 1)}
            disabled={pageActuelle === nombrePages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>

      {/* Informations sur la pagination */}
      <div className="pagination-info text-center mt-2">
        <small className="text-muted">
          Page {pageActuelle} sur {nombrePages}
        </small>
      </div>
    </nav>
  );
};

export default Pagination;
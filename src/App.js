import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Connexion from './pages/Login/Login';
import Inscription from './pages/Register/Register';
import TableauDeBord from './pages/Dashboard/Dashboard';
import Articles from './pages/Articles/Articles';
import NouvelArticle from './pages/Articles/NewArticle';
import Categories from './pages/Categories/Categories';
import NouvelleCategorie from './pages/Categories/NewCategory';
import Clients from './pages/Clients/Clients';
import NouveauClient from './pages/Clients/NewClient';
import Fournisseurs from './pages/Suppliers/Suppliers';
import NouveauFournisseur from './pages/Suppliers/NewSupplier';
import Utilisateurs from './pages/Users/Users';
import NouvelUtilisateur from './pages/Users/NewUser';
import Profil from './pages/Profile/Profile';
import ChangerMotDePasse from './pages/Profile/ChangePassword';
import Statistiques from './pages/Statistics/Statistics';
import VueEnsemble from './pages/Dashboard/Overview';
import MouvementsStock from './pages/StockMovements/StockMovements';
import CommandesClients from './pages/Orders/ClientOrders';
import CommandesFournisseurs from './pages/Orders/SupplierOrders';
import NouvelleCommandeClient from './pages/Orders/NewClientOrder';
import NouvelleCommandeFournisseur from './pages/Orders/NewSupplierOrder';
import { FournisseurAuth } from './context/AuthContext';
import RouteProtegee from './components/ProtectedRoute/ProtectedRoute';
import RouteProtegeeParRole from './components/RoleProtectedRoute/RoleProtectedRoute';
import './App.css';

function App() {
  return (
    <FournisseurAuth>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Connexion />} />
            <Route path="/inscrire" element={<Inscription />} />
            <Route path="/" element={
              <RouteProtegee>
                <TableauDeBord />
              </RouteProtegee>
            }>
              <Route index element={<VueEnsemble />} />
              <Route path="statistiques" element={<Statistiques />} />
              <Route path="articles" element={<Articles />} />
              <Route path="nouvelarticle" element={<NouvelArticle />} />
              <Route path="nouvelarticle/:idArticle" element={<NouvelArticle />} />
              <Route path="mvtstk" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <MouvementsStock />
                </RouteProtegeeParRole>
              } />
              <Route path="clients" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <Clients />
                </RouteProtegeeParRole>
              } />
              <Route path="nouveauclient" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouveauClient />
                </RouteProtegeeParRole>
              } />
              <Route path="nouveauclient/:id" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouveauClient />
                </RouteProtegeeParRole>
              } />
              <Route path="commandesclient" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <CommandesClients />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvellecommandeclt" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouvelleCommandeClient />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvellecommandeclt/:id" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouvelleCommandeClient />
                </RouteProtegeeParRole>
              } />
              <Route path="fournisseurs" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <Fournisseurs />
                </RouteProtegeeParRole>
              } />
              <Route path="nouveaufournisseur" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouveauFournisseur />
                </RouteProtegeeParRole>
              } />
              <Route path="nouveaufournisseur/:id" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouveauFournisseur />
                </RouteProtegeeParRole>
              } />
              <Route path="commandesfournisseur" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <CommandesFournisseurs />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvellecommandefrs" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouvelleCommandeFournisseur />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvellecommandefrs/:id" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouvelleCommandeFournisseur />
                </RouteProtegeeParRole>
              } />
              <Route path="categories" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <Categories />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvellecategorie" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouvelleCategorie />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvellecategorie/:idCategory" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN', 'MANAGER']}>
                  <NouvelleCategorie />
                </RouteProtegeeParRole>
              } />
              <Route path="utilisateurs" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN']}>
                  <Utilisateurs />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvelutilisateur" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN']}>
                  <NouvelUtilisateur />
                </RouteProtegeeParRole>
              } />
              <Route path="nouvelutilisateur/:id" element={
                <RouteProtegeeParRole rolesAutorises={['ADMIN']}>
                  <NouvelUtilisateur />
                </RouteProtegeeParRole>
              } />
              <Route path="profil" element={<Profil />} />
              <Route path="changermotdepasse" element={<ChangerMotDePasse />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </FournisseurAuth>
  );
}

export default App;
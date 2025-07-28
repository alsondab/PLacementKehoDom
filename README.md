# 🏠 Service Domicile - Plateforme de Services à Domicile

Une application web moderne développée avec React et Vite pour la gestion et la réservation de services à domicile. Cette plateforme permet aux utilisateurs de découvrir, réserver et gérer des services professionnels directement depuis leur domicile.

## 🚀 Technologies Utilisées

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS 4.1
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Maps**: Leaflet + React Leaflet
- **UI Components**: Relume UI

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Git

## 🛠️ Installation et Configuration

### 1. Cloner le projet

```bash
git clone [URL_DE_VOTRE_REPO]
cd service-domicile
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application en mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

### 4. Build pour la production

```bash
npm run build
```

### 5. Prévisualiser le build

```bash
npm run preview
```

## 🔐 Authentification

### Compte de démonstration

Pour tester l'application, utilisez ces identifiants :

**Email**: `keho@gmail.com`  
**Mot de passe**: `12345678`

### Création d'un nouveau compte

Vous pouvez également créer un nouveau compte via la page d'inscription. Les données sont stockées localement dans le localStorage.

## 📱 Pages et Fonctionnalités

### 🏠 **Page d'Accueil** (`/`)
- Présentation de la plateforme
- Services populaires en vedette
- Statistiques de l'entreprise
- Call-to-action pour la réservation

### 🛠️ **Catalogue des Services** (`/services`)
- Vue d'ensemble de tous les services disponibles
- Catégorisation par type de service
- Filtres par zone géographique

### 📋 **Liste des Services** (`/service-list`)
- **Fonctionnalités principales** :
  - Recherche textuelle avancée
  - Filtres multiples (catégorie, prix, zone, disponibilité, note)
  - Tri par popularité, prix, note
  - Vue liste et grille
  - Pagination
  - Recherche par géolocalisation
  - Ajout au panier avec animation
  - Système de favoris

### 🔍 **Détail d'un Service** (`/service/:id`)
- Informations complètes du service
- Profil du professionnel
- Avis et notes clients
- Galerie d'images
- Bouton de réservation

### 📅 **Réservation** (`/reservation`)
- Formulaire de réservation
- Sélection de date et heure
- Choix des services
- Calcul automatique du prix

### 💳 **Paiement** (`/payment`)
- Interface de paiement sécurisée
- Récapitulatif de la commande
- Validation des informations

### 👤 **Profil Utilisateur** (`/profil`)
- Gestion des informations personnelles
- Historique des réservations
- Préférences utilisateur

### 🔐 **Connexion** (`/login`)
- Authentification sécurisée
- Gestion des erreurs
- Redirection automatique

### 📝 **Inscription** (`/register`)
- Création de compte
- Validation des données
- Confirmation par email (simulée)

### 👨‍💼 **Devenir Professionnel** (`/devenir-pro`)
- Formulaire d'inscription pour les professionnels
- Upload de documents
- Validation des compétences

### 📰 **Blog** (`/blog`)
- Articles et actualités
- Conseils et astuces
- Témoignages clients

### 💰 **Tarifs** (`/tarifs`)
- Grille tarifaire détaillée
- Comparaison des forfaits
- Services inclus

### ⚖️ **Pages Légales**
- **Mentions Légales** (`/mentions-legales`)
- **Conditions Générales d'Utilisation** (`/cgu`)
- **Politique de Confidentialité** (`/politique-confidentialite`)

## 🛒 Système de Panier

### Fonctionnalités
- Ajout/suppression de services
- Gestion des quantités
- Calcul automatique du total
- Persistance des données (localStorage)
- Animation d'ajout au panier

### Utilisation
```javascript
import { useCart } from './contexts/CartContext';

const { addToCart, removeFromCart, cartItems } = useCart();
```

## 🗺️ Géolocalisation

### Recherche par rayon
L'application supporte la recherche de services par géolocalisation :
- URL avec paramètres : `?lat=48.8566&lng=2.3522&radius=10`
- Calcul automatique des distances
- Filtrage des services dans le rayon spécifié

## 🎨 Design et UX

### Caractéristiques
- Design responsive (mobile-first)
- Animations fluides avec Framer Motion
- Interface moderne et intuitive
- Thème sombre/clair (préparé)
- Composants réutilisables

### Composants principaux
- `Layout.jsx` : Structure générale
- `Navbar.jsx` : Navigation principale
- `Footer.jsx` : Pied de page
- `UltraSearchBar.jsx` : Barre de recherche avancée

## 📊 Données de Démonstration

### Services disponibles
- Ménage Complet Premium
- Coiffure à Domicile
- Garde d'enfants
- Bricolage & Petits Travaux
- Jardinage & Entretien
- Plomberie Express

### Zones couvertes
- Abidjan (Côte d'Ivoire)
- Autres zones configurables


## 📝 Structure du Projet

```
service-domicile/
├── public/                 # Assets statiques
├── src/
│   ├── components/         # Composants réutilisables
│   ├── contexts/          # Contextes React (Auth, Cart)
│   ├── pages/             # Pages de l'application
│   ├── assets/            # Images et ressources
│   ├── App.jsx           # Composant principal
│   └── main.jsx          # Point d'entrée
├── package.json
├── vite.config.js
└── tailwind.config.js
```


## 📄 Licence

Ce projet est développé dans le cadre d'un stage de développement web.

---

**Développé avec ❤️ par Dabo Ali**

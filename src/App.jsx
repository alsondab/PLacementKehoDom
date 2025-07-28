// App.jsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Import du CartProvider
import { AuthProvider } from './contexts/AuthContext'; // Import du AuthProvider
import Accueil from "./pages/Accueil";
import Services from './pages/Services';
import ServiceList from './pages/ServiceList';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import DevenirPro from './pages/DevenirPro';
import Blog from './pages/Blog';
import Tarifs from './pages/Tarifs';
import MentionsLegales from './pages/MentionsLegales';
import CGU from './pages/CGU';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import ServiceDetail from './pages/ServiceDetail';
import Reservation from './pages/Reservation';

function App() {
  return (
    <AuthProvider> {/* Entourer toute l'app avec AuthProvider */}
      <CartProvider> {/* Entourer toute l'app avec CartProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-list" element={<ServiceList />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/devenir-pro" element={<DevenirPro />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
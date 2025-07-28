import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Star, Users, Wrench, Heart, Search, Filter, X, MapPin, Award, ChevronRight } from "lucide-react";
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { useLocation } from 'react-router-dom';

const localImage = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop";

const useNavigate = () => (path) => window.location.assign(path);

// Données de services (à remplacer par un fetch si besoin)
const services = [
  {
    id: 1,
    name: "Ménage Complet Premium",
    category: "Ménage",
    price: 75,
    originalPrice: 90,
    duration: "3h",
    rating: 4.8,
    reviews: 247,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    description: "Service de ménage complet incluant toutes les pièces, nettoyage approfondi des surfaces, aspirateur, serpillière et désinfection.",
    features: ["Produits inclus", "Équipe certifiée", "Garantie satisfaction"],
    zone: "Paris et banlieue",
    availability: "Disponible 7j/7",
    verified: true,
    popular: true,
    lat: 48.8566, // Paris
    lng: 2.3522,
    professional: {
      name: "Sophie Martin",
      rating: 4.9,
      experience: "5 ans d'expérience",
      completedJobs: 1247,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 2,
    name: "Coiffure à Domicile",
    category: "Coiffure",
    price: 40,
    originalPrice: 50,
    duration: "1h30",
    rating: 4.7,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    description: "Coupe, brushing, coloration ou coiffure événementielle à domicile par un professionnel.",
    features: ["Produits inclus", "Coiffeur diplômé", "Déplacement offert"],
    zone: "Abidjan",
    availability: "Lun-Sam",
    verified: true,
    popular: true,
    lat: 5.348, // Abidjan
    lng: -4.027,
    professional: {
      name: "Fatou Koné",
      rating: 4.8,
      experience: "8 ans d'expérience",
      completedJobs: 980,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  },
  {
    id: 3,
    name: "Garde d'enfants",
    category: "Garde d'enfants",
    price: 60,
    originalPrice: 70,
    duration: "4h",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=400&fit=crop",
    description: "Garde d'enfants à domicile, activités ludiques, aide aux devoirs, repas inclus.",
    features: ["Personnel vérifié", "Activités éducatives", "Repas inclus"],
    zone: "Cocody, Marcory",
    availability: "Tous les jours",
    verified: true,
    popular: false,
    lat: 5.373, // Cocody
    lng: -3.978,
    professional: {
      name: "Awa Diabaté",
      rating: 5,
      experience: "10 ans d'expérience",
      completedJobs: 1500,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    id: 4,
    name: "Bricolage & Petits Travaux",
    category: "Bricolage",
    price: 55,
    originalPrice: 65,
    duration: "2h",
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
    description: "Montage de meubles, pose d'étagères, petits travaux de réparation à domicile.",
    features: ["Outils fournis", "Garantie travaux", "Pro expérimenté"],
    zone: "Yopougon, Plateau",
    availability: "Sur rendez-vous",
    verified: true,
    popular: false,
    lat: 5.353, // Yopougon
    lng: -4.070,
    professional: {
      name: "Jean Kouadio",
      rating: 4.7,
      experience: "7 ans d'expérience",
      completedJobs: 700,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 5,
    name: "Jardinage & Entretien",
    category: "Jardinage",
    price: 65,
    originalPrice: 80,
    duration: "3h",
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=600&h=400&fit=crop",
    description: "Tonte de pelouse, taille de haies, entretien de jardin et espaces verts.",
    features: ["Matériel inclus", "Équipe pro", "Déchets évacués"],
    zone: "Riviera, Bingerville",
    availability: "Sam-Dim",
    verified: true,
    popular: true,
    lat: 5.400, // Riviera
    lng: -3.950,
    professional: {
      name: "Moussa Traoré",
      rating: 4.9,
      experience: "6 ans d'expérience",
      completedJobs: 850,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  {
    id: 6,
    name: "Plomberie Express",
    category: "Plomberie",
    price: 80,
    originalPrice: 100,
    duration: "1h30",
    rating: 4.5,
    reviews: 60,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=400&fit=crop",
    description: "Réparation de fuites, débouchage, installation de sanitaires à domicile.",
    features: ["Intervention rapide", "Pièces garanties", "Plombier certifié"],
    zone: "Treichville, Koumassi",
    availability: "24h/24",
    verified: true,
    popular: false,
    lat: 5.309, // Treichville
    lng: -4.012,
    professional: {
      name: "Koffi N'Guessan",
      rating: 4.6,
      experience: "12 ans d'expérience",
      completedJobs: 1200,
      avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    }
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
  localImage
];

const categories = ['Tous', 'Ménage', 'Coiffure', "Garde d'enfants", 'Bricolage', 'Jardinage', 'Plomberie', 'Électricité'];

const SearchAndFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, priceRange, setPriceRange, selectedZone, setSelectedZone, selectedDays, setSelectedDays, minRating, setMinRating, onlyVerified, setOnlyVerified }) => {
  const zones = ['Tous', 'Abidjan', 'Cocody', 'Marcory', 'Yopougon', 'Plateau', 'Riviera', 'Bingerville', 'Treichville', 'Koumassi'];
  const days = ['Tous', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input type="text" placeholder="Rechercher un service..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filtres</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Zone</label>
          <select value={selectedZone} onChange={e => setSelectedZone(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
            {zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilité</label>
          <div className="flex flex-wrap gap-2">
            {days.map(day => (
              <button key={day} type="button" onClick={() => setSelectedDays(day)} className={`px-3 py-1 rounded-lg border text-xs font-medium ${selectedDays === day ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 border-gray-200'} transition-colors`}>
                {day}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Prix maximum: {priceRange}€</label>
          <input type="range" min="20" max="200" value={priceRange} onChange={e => setPriceRange(e.target.value)} className="w-full h-2 bg-black/80 rounded-lg appearance-none cursor-pointer slider" style={{ background: `linear-gradient(to right, #000 0%, #000 ${((priceRange - 20) / (200 - 20)) * 100}%, #E5E7EB ${((priceRange - 20) / (200 - 20)) * 100}%, #E5E7EB 100%)` }} />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>20€</span><span>200€</span></div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Note minimale</label>
          <select value={minRating} onChange={e => setMinRating(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
            <option value="0">Toutes</option>
            <option value="3">3 étoiles et +</option>
            <option value="4">4 étoiles et +</option>
            <option value="4.5">4.5 étoiles et +</option>
            <option value="5">5 étoiles</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="onlyVerified" checked={onlyVerified} onChange={e => setOnlyVerified(e.target.checked)} className="accent-black w-4 h-4" />
          <label htmlFor="onlyVerified" className="text-sm text-gray-700 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" />Professionnels vérifiés</label>
        </div>
      </div>
    </div>
  );
};

const ServiceListCard = ({ service, viewMode }) => {
  const { addToCart, toggleFavorite, favoriteItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const isFavorite = favoriteItems.find(item => item.id === service.id);
  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    addToCart(service);
    setIsAdding(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  const handleToggleFavorite = () => { toggleFavorite(service); };
  const getRatingStars = (rating) => [...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group relative ${viewMode === 'grid' ? 'flex flex-col items-center text-center p-3 max-w-sm mx-auto' : 'md:flex'}`}>
      <div className={viewMode === 'grid' ? 'w-full mb-2' : 'md:w-1/3 relative'}>
        <div className={viewMode === 'grid' ? 'aspect-[4/3] w-full relative overflow-hidden rounded-xl h-32' : 'aspect-[4/3] md:aspect-square relative overflow-hidden'}>
          <AnimatePresence mode="wait">
            <img src={service.image} alt={service.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${viewMode === 'grid' ? 'rounded-xl mx-auto' : ''}`} />
          </AnimatePresence>
          {service.popular && <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">Populaire</div>}
          {service.originalPrice && <div className="absolute top-3 right-12 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">-{Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%</div>}
          <button onClick={handleToggleFavorite} className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10 ${isFavorite ? 'bg-red-500 text-white shadow-lg' : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'}`}>
            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">{service.category}</div>
        </div>
      </div>
      <div className={viewMode === 'grid' ? 'w-full mt-2 flex flex-col items-center gap-2' : 'md:w-2/3 p-4 flex flex-col justify-between'}>
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-black transition-colors">{service.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{getRatingStars(service.rating)}</div>
                  <span className="text-sm text-gray-500">({service.reviews} avis)</span>
                  {service.verified && <div className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /><span className="text-xs font-medium">Vérifié</span></div>}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">{service.originalPrice && <span className="text-lg text-gray-500 line-through">{service.originalPrice}€</span>}<div className="text-2xl font-bold text-gray-900">{service.price}€</div></div>
                <div className="text-sm text-gray-500">{service.duration ? `${service.duration}` : 'par session'}</div>
              </div>
            </div>
            <p className="text-gray-600 mb-2 text-sm leading-relaxed">{service.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2 justify-center md:justify-start">
              {service.duration && <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{service.duration}</span></div>}
              {service.zone && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{service.zone}</span></div>}
              {service.availability && <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-600">{service.availability}</span></div>}
            </div>
            <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">{service.features?.map((feature, i) => <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{feature}</span>)}</div>
            {service.professional && (
              <div className={`flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg ${viewMode === 'grid' ? 'justify-center' : ''}`}>
                <img src={service.professional.avatar} alt={service.professional.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{service.professional.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < service.professional.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}</div>
                    <span>{service.professional.experience}</span>
                  </div>
                </div>
                {service.professional.completedJobs && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{service.professional.completedJobs}</div>
                    <div className="text-xs text-gray-500">interventions</div>
                  </div>
                )}
              </div>
            )}
            </div>
          <div className="flex gap-2 w-full justify-center md:justify-start mt-2">
            <button onClick={handleAddToCart} disabled={isAdding || showSuccess} className={`flex-1 py-3 px-4 font-semibold rounded-xl transition-all duration-300 ${isAdding ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : showSuccess ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'}`}>{isAdding ? (<div className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>Ajout...</div>) : showSuccess ? 'Ajouté ✓' : 'Ajouter au panier'}</button>
            <button onClick={() => navigate(`/service/${service.id}`)} className="px-6 py-3 border-2 border-gray-200 hover:border-black text-gray-700 hover:text-black font-semibold rounded-xl transition-all duration-300">Détails</button>
          </div>
        </div>
      <AnimatePresence>{showSuccess && (<div className="absolute inset-0 bg-green-500/95 flex items-center justify-center backdrop-blur-sm z-10"><div className="text-white text-center"><svg className="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span className="text-lg font-semibold">Service ajouté au panier !</span></div></div>)}</AnimatePresence>
      </div>
  );
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat)/2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon))/2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

export default function ServiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [priceRange, setPriceRange] = useState("200");
  const [viewMode, setViewMode] = useState("list");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedZone, setSelectedZone] = useState("Tous");
  const [selectedDays, setSelectedDays] = useState("Tous");
  const [minRating, setMinRating] = useState("0");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortOption, setSortOption] = useState('popularity');
  const navigate = useNavigate();
  // Ajoute l'état pour la page courante
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlSearch = params.get('search') || '';
  const urlLat = params.get('lat');
  const urlLng = params.get('lng');
  const urlRadius = params.get('radius');
  const urlCategory = params.get('category') || 'Tous';
  const urlPriceMax = params.get('priceMax') ? parseInt(params.get('priceMax')) : 200;
  const urlMinRating = params.get('minRating') ? parseFloat(params.get('minRating')) : 0;
  const urlAvailability = params.get('availability') || 'Tous';
  const urlOnlyVerified = params.get('onlyVerified') === '1';


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSelectedDays("Tous");
    setMinRating("0");
    setOnlyVerified(false);
    setPriceRange("200");
  }, [selectedCategory, selectedZone]);

  useEffect(() => {
    setCurrentPage(1);
    // Si search dans l'URL, l'appliquer
    if (urlSearch) setSearchTerm(urlSearch);
  }, [urlSearch, selectedCategory, selectedZone, selectedDays, minRating, onlyVerified, priceRange, sortOption]);

  let filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
    // Filtres avancés depuis l'URL ou UI
    const matchesCategory = (urlCategory === "Tous" ? (selectedCategory === "Tous" || service.category === selectedCategory) : service.category === urlCategory);
    const matchesPrice = service.price <= (params.get('priceMax') ? urlPriceMax : parseInt(priceRange));
    const matchesZone = selectedZone === "Tous" || (service.zone && service.zone.toLowerCase().includes(selectedZone.toLowerCase()));
    const matchesDays = selectedDays === "Tous" || (service.availability && service.availability.toLowerCase().includes(selectedDays.toLowerCase()));
    const matchesRating = (params.get('minRating') ? urlMinRating : parseFloat(minRating)) === 0 || service.rating >= (params.get('minRating') ? urlMinRating : parseFloat(minRating));
    const matchesVerified = (params.get('onlyVerified') ? urlOnlyVerified : onlyVerified) ? service.verified : true;
    const matchesAvailability = urlAvailability === 'Tous' || (service.availability && service.availability.toLowerCase().includes(urlAvailability.toLowerCase()));
    return matchesSearch && matchesCategory && matchesPrice && matchesZone && matchesDays && matchesRating && matchesVerified && matchesAvailability;
  });

  // Filtrage par distance si lat/lng/radius présents
  let isDistanceSearch = false;
  if (urlLat && urlLng && urlRadius) {
    isDistanceSearch = true;
    const lat = parseFloat(urlLat);
    const lng = parseFloat(urlLng);
    const radius = parseFloat(urlRadius);
    filteredServices = filteredServices.filter(service => {
      // Utiliser les coordonnées réelles si présentes
      if (service.lat && service.lng) {
        const dist = getDistanceFromLatLonInKm(lat, lng, service.lat, service.lng);
        return dist <= radius;
      }
      // Fallback sur la zone (ancienne logique)
      const zoneCoords = {
        'Abidjan': { lat: 5.348, lng: -4.027 },
        'Cocody': { lat: 5.373, lng: -3.978 },
        'Marcory': { lat: 5.309, lng: -4.012 },
        'Yopougon': { lat: 5.353, lng: -4.070 },
        'Plateau': { lat: 5.320, lng: -4.013 },
        'Riviera': { lat: 5.400, lng: -3.950 },
        'Bingerville': { lat: 5.355, lng: -3.874 },
        'Treichville': { lat: 5.309, lng: -4.012 },
        'Koumassi': { lat: 5.294, lng: -3.998 },
        'Paris et banlieue': { lat: 48.8566, lng: 2.3522 },
      };
      let found = false;
      for (const zone in zoneCoords) {
        if (service.zone && service.zone.toLowerCase().includes(zone.toLowerCase())) {
          const dist = getDistanceFromLatLonInKm(lat, lng, zoneCoords[zone].lat, zoneCoords[zone].lng);
          if (dist <= radius) found = true;
        }
      }
      return found;
    });
  }

  // Tri moderne
  if (sortOption === 'price-low') filteredServices = filteredServices.sort((a, b) => a.price - b.price);
  else if (sortOption === 'price-high') filteredServices = filteredServices.sort((a, b) => b.price - a.price);
  else if (sortOption === 'rating') filteredServices = filteredServices.sort((a, b) => b.rating - a.rating);
  else if (sortOption === 'newest') filteredServices = filteredServices.sort((a, b) => b.id - a.id);
  else if (sortOption === 'popularity') filteredServices = filteredServices.sort((a, b) => b.reviews - a.reviews);

  // Calcule le nombre total de pages
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  // Découpe les services à afficher selon la page
  const paginatedServices = filteredServices.slice((currentPage - 1) * servicesPerPage, currentPage * servicesPerPage);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto py-16 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              DÉCOUVREZ NOS SERVICES À DOMICILE DE QUALITÉ
            </h1>
            <p className="mb-8 text-lg text-gray-700 md:text-xl lg:max-w-xl leading-relaxed">
              Nos services à domicile sont conçus pour répondre à vos besoins quotidiens avec fiabilité et professionnalisme. Réservez dès aujourd'hui et simplifiez votre vie grâce à notre expertise.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl shadow-xl transition-all duration-300" onClick={() => navigate('/reservation')}>
                Réserver maintenant
              </button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { number: "1000+", label: "Clients satisfaits", icon: <Users className="w-6 h-6 text-black" /> },
                { number: "50+", label: "Services disponibles", icon: <Wrench className="w-6 h-6 text-black" /> },
                { number: "24/7", label: "Support client", icon: <Clock className="w-6 h-6 text-black" /> }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-black mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Carrousel d'images */}
          <div className="flex-1">
            <div className="relative aspect-[4/3] max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <img key={currentSlide} src={heroImages[currentSlide]} alt={`Service ${currentSlide + 1}`} className="w-full h-full object-cover" />
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {heroImages.map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Badge distance si recherche par rayon */}
      {isDistanceSearch && (
        <div className="flex justify-center mt-8 mb-2">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold shadow border border-blue-200 animate-fade-in-up">
            {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''} dans un rayon de {urlRadius} km autour de votre position
          </span>
        </div>
      )}
      {/* Section principale */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-gray-600">
                  <span className="font-semibold text-gray-900 text-lg">{filteredServices.length}</span> services trouvés
                  {searchTerm && (<span className="text-sm text-gray-500 ml-2">pour "<span className="font-medium text-black">{searchTerm}</span>"</span>)}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Liste</button>
                    <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Grille</button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mb-4">
                <label className="mr-2 text-sm font-medium text-gray-700">Trier par</label>
                <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300">
                  <option value="popularity">Popularité</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Note client</option>
                  <option value="newest">Nouveauté</option>
                </select>
              </div>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-3' : 'space-y-6'}`}>
                {filteredServices.length > 0 ? (
                  paginatedServices.map((service) => <ServiceListCard key={service.id} service={service} viewMode={viewMode} />)
                ) : (
                  <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex justify-center mb-4"><Search className="w-16 h-16 text-gray-400" /></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun service trouvé</h3>
                    <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche ou de filtrage.</p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("Tous");
                        setPriceRange("200");
                        setSelectedZone("Tous");
                        setSelectedDays("Tous");
                        setMinRating("0");
                        setOnlyVerified(false);
                        setSortOption('popularity');
                        navigate('/service-list'); // Supprime tous les query params
                      }}
                      className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-200 ${currentPage === i + 1 ? 'bg-black text-white border-black scale-105' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-black hover:text-white hover:border-black'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
              {/* Cache le bouton 'Afficher plus de services' si la pagination est affichée */}
            </div>
            <div className="lg:col-span-1">
              <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                minRating={minRating}
                setMinRating={setMinRating}
                onlyVerified={onlyVerified}
                setOnlyVerified={setOnlyVerified}
              />
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" />Services populaires</h3>
                <div className="space-y-3">{services.filter(s => s.popular).slice(0, 3).map((service) => (<div key={service.id} onClick={() => navigate(`/service/${service.id}`)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"><img src={service.image} alt={service.name} className="w-12 h-12 rounded-lg object-cover" /><div className="flex-1"><div className="font-medium text-gray-900 text-sm">{service.name}</div><div className="text-xs text-gray-500">{service.price}€ • {service.rating} ⭐</div></div></div>))}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Besoin d'aide ?</h3>
                <p className="text-blue-100 text-sm mb-4">Notre équipe est là pour vous conseiller dans le choix de votre service.</p>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">Nous contacter</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA finale */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Clients heureux", icon: <Users className="w-8 h-8 text-white" /> },
              { number: "500+", label: "Professionnels", icon: <CheckCircle className="w-8 h-8 text-white" /> },
              { number: "50+", label: "Services disponibles", icon: <Wrench className="w-8 h-8 text-white" /> },
              { number: "99%", label: "Satisfaction client", icon: <Star className="w-8 h-8 text-white" /> }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
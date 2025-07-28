import 'leaflet/dist/leaflet.css';
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, SlidersHorizontal, Loader2, Star, Wrench, Users, Heart, Clock, X } from "lucide-react";

// Données mockées (à remplacer par un fetch ou props plus tard)
const categories = [
  { name: 'Tous', icon: <Wrench className="w-5 h-5 text-gray-400" /> },
  { name: 'Ménage', icon: <Wrench className="w-5 h-5 text-blue-500 animate-spin-slow" /> },
  { name: 'Coiffure', icon: <Users className="w-5 h-5 text-pink-500 animate-bounce" /> },
  { name: "Garde d'enfants", icon: <Heart className="w-5 h-5 text-red-500 animate-pulse" /> },
  { name: 'Bricolage', icon: <Wrench className="w-5 h-5 text-yellow-500 animate-wiggle" /> },
  { name: 'Jardinage', icon: <Users className="w-5 h-5 text-green-500 animate-bounce" /> },
  { name: 'Plomberie', icon: <Wrench className="w-5 h-5 text-blue-400 animate-spin-slow" /> },
  { name: 'Électricité', icon: <Wrench className="w-5 h-5 text-purple-500 animate-spin-slow" /> },
];
const services = [
  {
    id: 1,
    name: "Ménage Complet Premium",
    category: "Ménage",
    price: 75,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=80&fit=crop",
  },
  {
    id: 2,
    name: "Coiffure à Domicile",
    category: "Coiffure",
    price: 40,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=80&fit=crop",
  },
  {
    id: 3,
    name: "Garde d'enfants",
    category: "Garde d'enfants",
    price: 60,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=80&fit=crop",
  },
  {
    id: 4,
    name: "Bricolage & Petits Travaux",
    category: "Bricolage",
    price: 55,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=100&h=80&fit=crop",
  },
  {
    id: 5,
    name: "Jardinage & Entretien",
    category: "Jardinage",
    price: 65,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=100&h=80&fit=crop",
  },
  {
    id: 6,
    name: "Plomberie Express",
    category: "Plomberie",
    price: 80,
    image: "https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a63?w=100&h=80&fit=crop",
  },
];

// Custom icon for marker
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function MapFlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.2 });
    }
  }, [position]);
  return null;
}

export default function UltraSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [position, setPosition] = useState(null); // {lat, lng}
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [radius, setRadius] = useState(5); // km
  const inputRef = useRef();
  const suggestionsRef = useRef();
  const [isUpdatingPosition, setIsUpdatingPosition] = useState(false);

  // Filtres avancés
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [priceMax, setPriceMax] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [selectedAvailability, setSelectedAvailability] = useState('Tous');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Suggestions dynamiques
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    const timeout = setTimeout(() => {
      const serviceMatches = services.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      );
      const categoryMatches = categories.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions([
        ...categoryMatches.map(c => ({ type: 'category', ...c })),
        ...serviceMatches.map(s => ({ type: 'service', ...s })),
      ]);
      setIsLoadingSuggestions(false);
    }, 350);
    return () => clearTimeout(timeout);
  }, [query]);

  // Navigation clavier
  useEffect(() => {
    if (!showSuggestions || suggestions.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setActiveIndex(i => (i < suggestions.length - 1 ? i + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex(i => (i > 0 ? i - 1 : suggestions.length - 1));
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          handleSuggestionClick(suggestions[activeIndex]);
        } else {
          handleSearch(e);
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions, suggestions, activeIndex]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuggestions(false);
      setActiveIndex(-1);
      if (onSearch) {
        const filters = {
          category: selectedCategory,
          priceMax,
          minRating,
          availability: selectedAvailability,
          onlyVerified,
        };
        if (position) {
          onSearch(query, { position, radius, filters });
        } else {
          onSearch(query, { filters });
        }
      }
    }, 800);
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setActiveIndex(-1);
    if (suggestion.type === 'service') {
      setQuery(suggestion.name);
      if (onSearch) {
        const filters = {
          category: selectedCategory,
          priceMax,
          minRating,
          availability: selectedAvailability,
          onlyVerified,
        };
        if (position) {
          onSearch(suggestion.name, { position, radius, filters });
        } else {
          onSearch(suggestion.name, { filters });
        }
      }
    } else if (suggestion.type === 'category') {
      setQuery(suggestion.name);
      if (onSearch) {
        const filters = {
          category: selectedCategory,
          priceMax,
          minRating,
          availability: selectedAvailability,
          onlyVerified,
        };
        if (position) {
          onSearch(suggestion.name, { position, radius, filters });
        } else {
          onSearch(suggestion.name, { filters });
        }
      }
    }
  };

  // Fermer suggestions si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  // Géolocalisation
  const handleGeolocate = async () => {
    setGeoError("");
    setGeoLoading(true);
    setShowMap(true);
    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n'est pas supportée par votre navigateur.");
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        setGeoLoading(false);
        // Reverse geocoding (Nominatim)
        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`);
          const data = await resp.json();
          setAddress(data.display_name || "Position détectée");
        } catch {
          setAddress("Position détectée");
        }
      },
      (err) => {
        setGeoError("Impossible de détecter la position : " + err.message);
        setGeoLoading(false);
        setShowMap(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handler pour déplacement du marqueur
  const handleMarkerDragEnd = async (e) => {
    setIsUpdatingPosition(true);
    const marker = e.target;
    const newPos = marker.getLatLng();
    setPosition({ lat: newPos.lat, lng: newPos.lng });
    // Reverse geocoding (Nominatim)
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${newPos.lat}&lon=${newPos.lng}&format=json`);
      const data = await resp.json();
      setAddress(data.display_name || "Position détectée");
    } catch {
      setAddress("Position détectée");
    }
    setIsUpdatingPosition(false);
  };

  // Fermer la carte
  const handleCloseMap = () => {
    setShowMap(false);
    setGeoError("");
    setGeoLoading(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8 z-20">
      {/* Card flottante avec effet verre et ombre */}
      <form
        onSubmit={handleSearch}
        className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-2xl rounded-2xl flex items-center px-4 py-3 md:py-5 gap-2 md:gap-4 transition-all duration-300 focus-within:shadow-2xl hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.18)] group"
        style={{ boxShadow: "0 8px 32px 0 rgba(59,130,246,0.12)" }}
        autoComplete="off"
      >
        {/* Icône recherche animée */}
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 shadow-md group-hover:scale-110 transition-transform duration-300">
          <Search className="w-6 h-6 text-blue-600 animate-pulse group-focus-within:animate-spin" />
        </span>
        {/* Champ de recherche */}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none text-lg md:text-xl placeholder-gray-400 text-gray-900 font-medium px-2 md:px-4 py-2 focus:placeholder-blue-400 focus:ring-2 focus:ring-blue-400 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          placeholder="Rechercher un service, une catégorie..."
          value={query}
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); setActiveIndex(-1); }}
          onFocus={() => setShowSuggestions(true)}
          aria-label="Recherche de service"
          aria-autocomplete="list"
          aria-controls="ultra-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `ultra-suggestion-${activeIndex}` : undefined}
        />
        {/* Bouton géolocalisation */}
        <button
          type="button"
          className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${geoLoading ? 'bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse' : 'bg-white/80 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 active:scale-95'}`}
          aria-label="Utiliser ma position"
          onClick={handleGeolocate}
        >
          {geoLoading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <MapPin className="w-6 h-6 text-blue-500 animate-bounce" />}
        </button>
        {/* Bouton filtres avancés */}
        <button
          type="button"
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ml-1"
          aria-label="Filtres avancés"
          onClick={() => setShowFilters(v => !v)}
        >
          <SlidersHorizontal className="w-6 h-6 text-purple-500 group-hover:rotate-12 transition-transform duration-300" />
        </button>
        {/* Bouton recherche */}
        <button
          type="submit"
          className="relative flex items-center justify-center px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-black via-gray-900 to-blue-600 text-white font-bold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-600 ml-2"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <span className="relative z-10">Rechercher</span>
          )}
          {/* Effet ripple/magnetic */}
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-300" />
        </button>
      </form>
      {/* Suggestions visuelles */}
      {showSuggestions && (query || suggestions.length > 0) && (
        <div
          ref={suggestionsRef}
          id="ultra-suggestions"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-30 animate-fade-in-up p-2 md:p-4 max-h-96 overflow-y-auto"
        >
          {isLoadingSuggestions ? (
            <div className="flex items-center justify-center py-6 text-blue-500 gap-2 animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Recherche intelligente...</span>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-gray-400 italic text-center py-4">Aucun résultat</div>
          ) : (
            <ul>
              {suggestions.map((sugg, i) => (
                <li
                  key={sugg.type + '-' + (sugg.id || sugg.name)}
                  id={`ultra-suggestion-${i}`}
                  role="option"
                  aria-selected={activeIndex === i}
                  tabIndex={-1}
                  className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-all duration-200 group ${activeIndex === i ? 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-lg scale-105' : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50'} ${sugg.type === 'category' ? 'border-l-4 border-blue-400' : ''}`}
                  onMouseDown={() => handleSuggestionClick(sugg)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {sugg.type === 'service' ? (
                    <img src={sugg.image} alt={sugg.name} className="w-12 h-10 rounded-lg object-cover shadow" />
                  ) : (
                    <span className="flex items-center justify-center w-10 h-10">{sugg.icon}</span>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-base">{sugg.name}</div>
                    {sugg.type === 'service' && (
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{sugg.category}</span>
                        <span>•</span>
                        <span className="font-bold text-blue-600">{sugg.price}€</span>
                      </div>
                    )}
                    {sugg.type === 'category' && (
                      <div className="text-xs text-blue-500 font-medium">Catégorie</div>
                    )}
                  </div>
                  {sugg.type === 'service' && (
                    <Star className="w-4 h-4 text-yellow-400 ml-2" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Carte interactive et géolocalisation */}
      {showMap && (
        <div className="absolute left-0 right-0 mt-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-40 animate-fade-in-up p-4 md:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <MapPin className="w-5 h-5" />
              <span>Votre position</span>
            </div>
            <button onClick={handleCloseMap} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Fermer la carte"><X className="w-5 h-5 text-gray-500" /></button>
          </div>
          {(geoLoading || isUpdatingPosition) && (
            <div className="flex items-center justify-center gap-2 text-blue-500 animate-pulse py-6">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{geoLoading ? 'Détection de la position...' : 'Mise à jour de la position...'}</span>
            </div>
          )}
          {geoError && (
            <div className="text-red-500 text-sm font-medium mb-2">{geoError}</div>
          )}
          {position && !geoLoading && !isUpdatingPosition && (
            <>
              <div className="text-gray-700 text-sm mb-2">{address}</div>
              <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden border border-blue-100 shadow">
                <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }} className="rounded-xl">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={markerIcon} draggable={true} eventHandlers={{ dragend: handleMarkerDragEnd }} />
                  <Circle center={position} radius={radius * 1000} pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.15 }} />
                  <MapFlyTo position={position} />
                </MapContainer>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <label className="font-medium text-gray-700 flex-1">Rayon de recherche : <span className="text-blue-600 font-bold">{radius} km</span></label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={radius}
                  onChange={e => setRadius(Number(e.target.value))}
                  className="w-full md:w-1/2 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{ background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(radius/50)*100}%, #E5E7EB ${(radius/50)*100}%, #E5E7EB 100%)` }}
                  aria-label="Rayon de recherche en kilomètres"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow hover:scale-105 transition-all duration-200"
                  onClick={() => onSearch(query, { position, radius })}
                  type="button"
                >
                  Relancer la recherche sur cette position
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {/* Filtres avancés (interactifs) */}
      {showFilters && (
        <div className="absolute left-0 right-0 mt-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-40 animate-fade-in-up p-6">
          <div className="text-gray-700 font-semibold mb-4 text-lg flex items-center gap-2"><SlidersHorizontal className="w-5 h-5 text-purple-500" />Filtres avancés</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 rounded-full bg-gray-50 focus:bg-white/90 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 text-gray-800 shadow-sm">
                {categories.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
              </select>
            </div>
            {/* Prix max */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prix maximum : {priceMax}€</label>
              <input type="range" min="20" max="200" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer slider focus:ring-2 focus:ring-blue-400" style={{ background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((priceMax - 20) / (200 - 20)) * 100}%, #E5E7EB ${((priceMax - 20) / (200 - 20)) * 100}%, #E5E7EB 100%)` }} />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>20€</span><span>200€</span></div>
            </div>
            {/* Note min */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Note minimale</label>
              <select value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="w-full px-4 py-2 rounded-full bg-gray-50 focus:bg-white/90 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 text-gray-800 shadow-sm">
                <option value={0}>Toutes</option>
                <option value={3}>3 étoiles et +</option>
                <option value={4}>4 étoiles et +</option>
                <option value={4.5}>4.5 étoiles et +</option>
                <option value={5}>5 étoiles</option>
              </select>
            </div>
            {/* Disponibilité */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilité</label>
              <select value={selectedAvailability} onChange={e => setSelectedAvailability(e.target.value)} className="w-full px-4 py-2 rounded-full bg-gray-50 focus:bg-white/90 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 text-gray-800 shadow-sm">
                <option value="Tous">Tous</option>
                <option value="Lun">Lundi</option>
                <option value="Mar">Mardi</option>
                <option value="Mer">Mercredi</option>
                <option value="Jeu">Jeudi</option>
                <option value="Ven">Vendredi</option>
                <option value="Sam">Samedi</option>
                <option value="Dim">Dimanche</option>
              </select>
            </div>
            {/* Vérifiés */}
            <div className="flex items-center gap-3 mt-2">
              <input type="checkbox" id="onlyVerified" checked={onlyVerified} onChange={e => setOnlyVerified(e.target.checked)} className="accent-blue-600 w-5 h-5 rounded-full focus:ring-2 focus:ring-blue-400 transition-all duration-200" />
              <label htmlFor="onlyVerified" className="text-sm text-gray-700 font-medium flex items-center gap-1"><span className="inline-block w-4 h-4"><Wrench className="w-4 h-4 text-green-500" /></span>Professionnels vérifiés</label>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button type="button" className="px-6 py-2 rounded-full bg-black text-white font-bold shadow hover:bg-gray-800 hover:scale-105 transition-all duration-200" onClick={handleSearch}>Appliquer les filtres</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Animations custom Tailwind (à ajouter dans tailwind.config.js)
// 'spin-slow': 'spin 2.5s linear infinite',
// 'wiggle': 'wiggle 1s ease-in-out infinite',
// 'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both', 
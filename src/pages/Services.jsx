"use client";

import React, { useState } from "react";
import { RxCross2, RxChevronRight } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { CheckCircle, AlarmClock, Gem } from "lucide-react";
import localImage from '../assets/evgeni-adutskevich-7AA4WyvW_Q4-unsplash.jpg';
import { useNavigate } from 'react-router-dom';

// Hook personnalisé pour la visibilité (Banner)
const useVisible = () => {
  const [isVisible, setIsVisible] = useState(true);
  const hide = () => {
    setIsVisible(false);
  };
  return {
    isVisible,
    hide,
  };
};

// Composant pour le rendu conditionnel
const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

// Composant ServiceCard amélioré avec animations
const ServiceCard = ({ service, index }) => {
  const { addToCart, toggleFavorite, favoriteItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isFavorite = favoriteItems.find(item => item.id === service.id);
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    addToCart(service);
    setIsAdding(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleToggleFavorite = () => {
    console.log('Toggle favorite clicked for service:', service.id, service.name);
    toggleFavorite(service);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Standard': 'bg-blue-100 text-blue-700 border-blue-200',
      'Classique': 'bg-black/10 text-black border-black/20',
      'Premium': 'bg-purple-100 text-purple-700 border-purple-200',
      'Urgent': 'bg-red-100 text-red-700 border-red-200',
      'Saisonnier': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getHoverEffect = (category) => {
    const effects = {
      'Standard': 'group-hover:border-blue-300 group-hover:shadow-blue-100',
      'Classique': 'group-hover:border-black/30 group-hover:shadow-black/10',
      'Premium': 'group-hover:border-purple-300 group-hover:shadow-purple-100',
      'Urgent': 'group-hover:border-red-300 group-hover:shadow-red-100',
      'Saisonnier': 'group-hover:border-orange-300 group-hover:shadow-orange-100'
    };
    return effects[category] || 'group-hover:border-gray-300 group-hover:shadow-gray-100';
  };

  return (
    <motion.div 
      className={`group relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl ${getHoverEffect(service.category)}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          initial={{ scale: 1.1 }}
          animate={{ scale: imageLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(service.category)}`}>
          {service.category}
        </div>
        
        {/* Favorite Button */}
        <motion.button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm z-10 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 hover:scale-110'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg 
            className="w-4 h-4" 
            fill={isFavorite ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            initial={false}
            animate={{ 
              fill: isFavorite ? "currentColor" : "none",
              scale: isFavorite ? [1, 1.3, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </motion.svg>
        </motion.button>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              className="absolute inset-0 bg-green-500/95 flex items-center justify-center backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white text-center">
                <motion.svg 
                  className="w-12 h-12 mx-auto mb-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </motion.svg>
                <motion.span 
                  className="text-sm font-semibold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Ajouté au panier !
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Service Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-gray-500">
              Service {service.category.toLowerCase()}
            </p>
          </div>
          <div className="text-right ml-3">
            <span className="font-bold text-gray-900 text-lg md:text-xl">
              ${service.price}
            </span>
            <p className="text-xs text-gray-500">par session</p>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <motion.button 
          onClick={handleAddToCart}
          disabled={isAdding || showSuccess}
          className={`w-full py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
            isAdding
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : showSuccess
              ? 'bg-green-500 text-white'
              : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
          }`}
          whileHover={!isAdding && !showSuccess ? { scale: 1.02 } : {}}
          whileTap={!isAdding && !showSuccess ? { scale: 0.98 } : {}}
        >
          {isAdding ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              Ajout en cours...
            </div>
          ) : showSuccess ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Ajouté avec succès !
            </div>
          ) : (
            'Ajouter au panier'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Composant Features amélioré
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div 
      className="text-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 5 }}
      >
        <div className="text-3xl text-white">{feature.icon}</div>
      </motion.div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">{feature.title}</h3>
      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

export default function Services() {
  const visibleState = useVisible();
  const [filter, setFilter] = useState('Tous');
  const navigate = useNavigate();

  // Liste des services avec plus de détails
  const services = [
    {
      id: 1,
      name: "Service Ménage Complet",
      category: "Standard",
      price: 55,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop",
      description: "Nettoyage complet de votre domicile"
    },
    {
      id: 2,
      name: "Coiffure à Domicile",
      category: "Classique",
      price: 65,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=800&fit=crop",
      description: "Services de coiffure professionnels"
    },
    {
      id: 3,
      name: "Garde d'Enfants VIP",
      category: "Premium",
      price: 75,
      image: localImage, // Utilisation de l'image locale
      description: "Garde d'enfants avec activités éducatives"
    },
    {
      id: 4,
      name: "Réparation Express",
      category: "Urgent",
      price: 85,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=800&fit=crop",
      description: "Interventions urgentes 24h/24"
    },
    {
      id: 5,
      name: "Jardinage Saisonnier",
      category: "Saisonnier",
      price: 45,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=800&fit=crop",
      description: "Entretien de jardin selon les saisons"
    },
    {
      id: 6,
      name: "Plomberie Standard",
      category: "Standard",
      price: 60,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop",
      description: "Services de plomberie généraux"
    },
    {
      id: 7,
      name: "Électricité d'Urgence",
      category: "Urgent",
      price: 90,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=800&fit=crop",
      description: "Interventions électriques urgentes"
    },
    {
      id: 8,
      name: "Déménagement Complet",
      category: "Standard",
      price: 120,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop",
      description: "Service de déménagement complet"
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-10 h-10" stroke="white" fill="none" />, // Moderne, blanc, sans fond
      title: "Service Garanti",
      description: "Tous nos services sont garantis et nos professionnels sont certifiés pour votre tranquillité d'esprit."
    },
    {
      icon: <AlarmClock className="w-10 h-10" stroke="white" fill="none" />, // Moderne, blanc, sans fond
      title: "Disponibilité 24/7",
      description: "Réservez vos services à tout moment, nous sommes disponibles 7j/7 pour répondre à vos besoins."
    },
    {
      icon: <Gem className="w-10 h-10" stroke="white" fill="none" />, // Moderne, blanc, sans fond
      title: "Prix Transparents",
      description: "Pas de frais cachés, tous nos tarifs sont clairement affichés avec des devis détaillés."
    }
  ];

  const categories = ['Tous', 'Standard', 'Classique', 'Premium', 'Urgent', 'Saisonnier'];

  const filteredServices = filter === 'Tous' 
    ? services 
    : services.filter(service => service.category === filter);

  return (
    <Layout>
      {/* Header avec animation */}
      <motion.section 
        className="px-[5%] py-20 md:py-28 lg:py-32 mt-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-6 text-5xl font-bold md:mb-8 md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Nos Services
          </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Découvrez notre gamme complète de services à domicile, conçus pour
              simplifier votre quotidien et répondre à tous vos besoins avec excellence.
          </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Banner avec animation */}
      <ConditionalRender condition={visibleState.isVisible}>
        <motion.section 
          className="bg-gradient-to-r from-gray-900 via-black to-blue-900 text-white px-[5%] py-4 relative overflow-hidden"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="container mx-auto flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.34.21 3.5 0 5.16-1 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </motion.div>
              
              <div>
                <h2 className="font-bold text-white text-sm md:text-base">
                  🎉 Offre Spéciale - 20% de réduction sur votre premier service !
                </h2>
                <p className="text-gray-300 text-xs md:text-sm">
                  Accédez à des services fiables et de qualité avec nos professionnels certifiés
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button 
                className="px-6 py-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Profiter maintenant
              </motion.button>
              
              <motion.button 
                className="text-white hover:text-gray-300 transition-colors p-1"
              onClick={visibleState.hide}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
            >
                <RxCross2 className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </ConditionalRender>

      {/* Services Grid Section */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-white">
        <div className="container mx-auto">
          {/* Header avec filtres */}
          <div className="mb-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 md:mb-20">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-sm font-bold text-blue-600 uppercase tracking-wide">
                SERVICES DISPONIBLES
              </p>
              <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                NOTRE CATALOGUE
              </h2>
              <p className="text-lg text-gray-600 md:text-xl leading-relaxed">
                Découvrez notre sélection de services à domicile, tous réalisés par des professionnels qualifiés.
              </p>
            </motion.div>

            {/* Filtres */}
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Grid des services */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            layout
          >
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/service-list')}
            >
              Voir tous nos services
              <RxChevronRight className="inline-block w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Section informative améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nous nous engageons à vous offrir une expérience exceptionnelle avec des standards de qualité élevés.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
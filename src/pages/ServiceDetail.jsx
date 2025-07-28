import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, MapPin, Shield, CheckCircle, Heart, Share2, 
  Calendar, Users, Award, MessageSquare, Phone, Mail,
  ArrowRight, ChevronLeft, ChevronRight, Play, X
} from 'lucide-react';
import Layout from '../components/Layout';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  // Données simulées du service
  const service = {
    id: parseInt(id),
    name: "Ménage Complet Premium",
    category: "Ménage",
    price: 75,
    originalPrice: 90,
    duration: "3 heures",
    rating: 4.8,
    reviewCount: 247,
    description: "Notre service de ménage complet premium transforme votre domicile en un espace impeccable. Nos professionnels expérimentés utilisent des produits écologiques et des techniques avancées pour un nettoyage en profondeur de toutes vos pièces.",
    longDescription: "Ce service inclut le nettoyage approfondi de toutes les surfaces, l'aspiration et le lavage des sols, le dépoussiérage des meubles, le nettoyage des vitres intérieures, la désinfection des sanitaires et de la cuisine. Nos équipes utilisent exclusivement des produits respectueux de l'environnement et de votre santé.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop"
    ],
    features: [
      "Produits écologiques inclus",
      "Équipe certifiée et assurée", 
      "Matériel professionnel fourni",
      "Satisfaction garantie",
      "Nettoyage en profondeur",
      "Désinfection complète"
    ],
    includes: [
      "Nettoyage de toutes les pièces",
      "Aspiration et lavage des sols",
      "Dépoussiérage des meubles",
      "Nettoyage des vitres intérieures",
      "Désinfection sanitaires et cuisine",
      "Évacuation des déchets"
    ],
    professional: {
      name: "Sophie Martin",
      rating: 4.9,
      experience: "5 ans",
      completedJobs: 1247,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    availability: "Disponible 7j/7",
    zone: "Paris et banlieue",
    responseTime: "Réponse sous 2h"
  };

  const reviews = [
    {
      id: 1,
      name: "Marie L.",
      rating: 5,
      date: "Il y a 2 jours",
      comment: "Service exceptionnel ! Sophie est très professionnelle et minutieuse. Ma maison n'a jamais été aussi propre. Je recommande vivement !",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Thomas B.",
      rating: 5,
      date: "Il y a 1 semaine",
      comment: "Parfait du début à la fin. Ponctuelle, efficace et très sympathique. Le rapport qualité-prix est excellent.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Claire D.",
      rating: 4,
      date: "Il y a 2 semaines",
      comment: "Très satisfaite du service. Quelques petits détails à améliorer mais dans l'ensemble c'est du très bon travail.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "Que dois-je préparer avant l'intervention ?",
      answer: "Il suffit de ranger les objets personnels et de nous indiquer vos préférences particulières. Nous apportons tout le matériel et les produits nécessaires."
    },
    {
      question: "Les produits utilisés sont-ils sans danger ?",
      answer: "Oui, nous utilisons exclusivement des produits écologiques, sans danger pour votre famille et vos animaux de compagnie."
    },
    {
      question: "Puis-je modifier ou annuler ma réservation ?",
      answer: "Vous pouvez modifier ou annuler gratuitement votre réservation jusqu'à 24h avant l'intervention prévue."
    },
    {
      question: "Le service est-il assuré ?",
      answer: "Oui, tous nos professionnels sont assurés en responsabilité civile professionnelle pour votre tranquillité d'esprit."
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'includes', label: 'Inclus' },
    { id: 'reviews', label: 'Avis (247)' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <Layout>
      {/* Hero Section with Image Gallery */}
      <section className="relative pt-24">
        <div className="container mx-auto px-[5%] py-8">
          {/* Breadcrumb */}
          <motion.nav 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
                Accueil
              </button>
              <span>/</span>
              <button onClick={() => navigate('/services')} className="hover:text-blue-600 transition-colors">
                Services
              </button>
              <span>/</span>
              <span className="text-gray-900 font-medium">{service.name}</span>
            </div>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={service.images[currentImageIndex]}
                  alt={service.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsGalleryOpen(true)}
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {service.images.length}
                </div>

                {/* View Gallery Button */}
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute bottom-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-2 hover:bg-white transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Voir toutes les photos</span>
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${service.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Service Information */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{service.rating}</span>
                    <span className="text-gray-500 text-sm">({service.reviewCount} avis)</span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {service.name}
                </h1>
                
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{service.zone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Assuré</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-gray-900">{service.price}€</span>
                      {service.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">{service.originalPrice}€</span>
                      )}
                      {service.originalPrice && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                          -{Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">par intervention</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        isFavorite 
                          ? 'border-red-500 bg-red-50 text-red-500' 
                          : 'border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                    </motion.button>
                    
                    <motion.button
                      className="p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 text-gray-400 hover:text-blue-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{service.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{service.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Satisfaction garantie ou remboursé</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => navigate('/reservation')}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-5 h-5" />
                  Réserver maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <p className="text-center text-xs text-gray-500 mt-3">
                  Annulation gratuite jusqu'à 24h avant
                </p>
              </div>

              {/* Professional Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Votre professionnel</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={service.professional.avatar}
                    alt={service.professional.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{service.professional.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{service.professional.rating}</span>
                      <span className="text-gray-500 text-sm">• {service.professional.completedJobs} interventions</span>
                    </div>
                    <p className="text-gray-600 text-sm">{service.professional.experience} d'expérience</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      className="p-2 border border-gray-200 rounded-lg hover:border-blue-300 text-gray-600 hover:text-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 border border-gray-200 rounded-lg hover:border-green-300 text-gray-600 hover:text-green-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="px-[5%] py-16">
        <div className="container mx-auto max-w-6xl">
          {/* Tabs */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Description du service</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.longDescription}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Nos professionnels sont rigoureusement sélectionnés et formés selon nos standards de qualité. 
                      Ils arrivent équipés de tout le matériel nécessaire et respectent scrupuleusement vos horaires 
                      et vos consignes particulières.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6">Caractéristiques</h3>
                  <div className="space-y-4">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
        </motion.div>
                    ))}
                  </div>
      </div>
              </motion.div>
            )}

            {activeTab === 'includes' && (
              <motion.div
                key="includes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Ce qui est inclus dans le service</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.includes.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item}</h4>
                        <p className="text-gray-600 text-sm">
                          Service professionnel réalisé avec soin et attention aux détails.
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Review Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{service.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">Basé sur {service.reviewCount} avis</p>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-2 text-sm">
                            <span className="w-3">{stars}</span>
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ 
                                  width: `${stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : stars === 2 ? 1 : 0}%` 
                                }}
                              ></div>
                            </div>
                            <span className="w-8 text-xs text-gray-500">
                              {stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '2%' : stars === 2 ? '1%' : '0%'}
                            </span>
            </div>
                        ))}
          </div>
        </div>
      </div>

                  {/* Reviews List */}
                  <div className="lg:col-span-2 space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold">{review.name}</h4>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <span className="text-gray-500 text-sm">{review.date}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    <motion.button
                      className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Voir tous les avis
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Questions fréquentes</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="font-bold text-lg mb-3 text-gray-900">{faq.question}</h4>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </section>

      {/* Similar Services */}
      <section className="px-[5%] py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services similaires</h2>
            <p className="text-gray-600">Découvrez d'autres services qui pourraient vous intéresser</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 2,
                name: "Coiffure à Domicile",
                price: 85,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
                category: "Coiffure"
              },
              {
                id: 3,
                name: "Garde d'Enfants",
                price: 65,
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
                category: "Garde"
              },
              {
                id: 4,
                name: "Jardinage Premium",
                price: 70,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
                category: "Jardinage"
              }
            ].map((similarService, index) => (
              <motion.div
                key={similarService.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/service/${similarService.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={similarService.image}
                    alt={similarService.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                    {similarService.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{similarService.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(similarService.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({similarService.rating})</span>
            </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{similarService.price}€</span>
                    <motion.button
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Voir détails
                    </motion.button>
            </div>
            </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Prêt à réserver ?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits et découvrez la différence 
              de nos services professionnels à domicile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/reservation')}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Réserver maintenant
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Poser une question
              </motion.button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Satisfaction garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Professionnels vérifiés</span>
          </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Intervention rapide</span>
        </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img
                src={service.images[currentImageIndex]}
                alt={service.name}
                className="w-full h-full object-contain rounded-2xl"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {currentImageIndex + 1} / {service.images.length}
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
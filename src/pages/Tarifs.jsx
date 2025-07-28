"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Scissors, Baby, Wrench, Leaf, Car, Zap, 
  CheckCircle, Clock, MapPin, Shield, Star, 
  Calculator, Info, ArrowRight 
} from 'lucide-react';
import Layout from '../components/Layout';

export default function Tarifs() {
  const [selectedService, setSelectedService] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [estimateData, setEstimateData] = useState({
    surface: '',
    rooms: '',
    frequency: 'unique',
    extras: []
  });

  const services = [
    {
      id: 'menage',
      name: 'Ménage à domicile',
      icon: <Home className="w-8 h-8" />,
      startingPrice: 25,
      unit: '/heure',
      color: 'from-blue-500 to-blue-600',
      description: 'Nettoyage complet de votre domicile par des professionnels',
      features: ['Produits inclus', 'Équipe certifiée', 'Assurance responsabilité'],
      popular: true
    },
    {
      id: 'coiffure',
      name: 'Coiffure à domicile',
      icon: <Scissors className="w-8 h-8" />,
      startingPrice: 45,
      unit: '/prestation',
      color: 'from-purple-500 to-purple-600',
      description: 'Services de coiffure professionnels dans le confort de votre maison',
      features: ['Matériel professionnel', 'Conseils personnalisés', 'Produits haut de gamme'],
      popular: false
    },
    {
      id: 'garde',
      name: 'Garde d\'enfants',
      icon: <Baby className="w-8 h-8" />,
      startingPrice: 15,
      unit: '/heure',
      color: 'from-green-500 to-green-600',
      description: 'Garde qualifiée avec activités éducatives adaptées',
      features: ['Personnel diplômé', 'Activités ludiques', 'Suivi parental'],
      popular: false
    },
    {
      id: 'bricolage',
      name: 'Bricolage & Réparations',
      icon: <Wrench className="w-8 h-8" />,
      startingPrice: 35,
      unit: '/heure',
      color: 'from-orange-500 to-orange-600',
      description: 'Petits travaux et réparations par des artisans qualifiés',
      features: ['Devis gratuit', 'Matériel inclus', 'Garantie travaux'],
      popular: false
    },
    {
      id: 'jardinage',
      name: 'Jardinage',
      icon: <Leaf className="w-8 h-8" />,
      startingPrice: 30,
      unit: '/heure',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Entretien de votre jardin par des experts paysagistes',
      features: ['Outils fournis', 'Conseil expert', 'Évacuation déchets'],
      popular: false
    },
    {
      id: 'auto',
      name: 'Lavage auto',
      icon: <Car className="w-8 h-8" />,
      startingPrice: 20,
      unit: '/lavage',
      color: 'from-cyan-500 to-cyan-600',
      description: 'Nettoyage complet de votre véhicule à domicile',
      features: ['Intérieur/Extérieur', 'Produits pro', 'Résultat garanti'],
      popular: false
    },
    {
      id: 'electricite',
      name: 'Électricité',
      icon: <Zap className="w-8 h-8" />,
      startingPrice: 50,
      unit: '/intervention',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Interventions électriques par des professionnels certifiés',
      features: ['Électricien certifié', 'Devis gratuit', 'Urgences 24h/24'],
      popular: false
    }
  ];

  const frequencies = [
    { id: 'unique', label: 'Prestation unique', multiplier: 1 },
    { id: 'weekly', label: 'Hebdomadaire', multiplier: 0.85 },
    { id: 'biweekly', label: 'Toutes les 2 semaines', multiplier: 0.9 },
    { id: 'monthly', label: 'Mensuel', multiplier: 0.95 }
  ];

  const extras = [
    { id: 'ironing', label: 'Repassage', price: 15 },
    { id: 'windows', label: 'Nettoyage vitres', price: 10 },
    { id: 'oven', label: 'Nettoyage four', price: 20 },
    { id: 'fridge', label: 'Nettoyage réfrigérateur', price: 15 }
  ];

  const calculatePrice = () => {
    if (!selectedService || !estimateData.surface) return;
    
    const service = services.find(s => s.id === selectedService);
    let basePrice = service.startingPrice;
    
    // Calcul basé sur la surface
    const surface = parseInt(estimateData.surface);
    if (surface > 50) basePrice += 10;
    if (surface > 100) basePrice += 15;
    if (surface > 150) basePrice += 20;
    
    // Calcul basé sur le nombre de pièces
    const rooms = parseInt(estimateData.rooms) || 1;
    basePrice += (rooms - 1) * 5;
    
    // Applique le multiplicateur de fréquence
    const frequency = frequencies.find(f => f.id === estimateData.frequency);
    basePrice *= frequency.multiplier;
    
    // Ajoute les extras
    const extrasPrice = estimateData.extras.reduce((total, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return total + (extra ? extra.price : 0);
    }, 0);
    
    setCalculatedPrice(Math.round(basePrice + extrasPrice));
  };

  const handleExtraToggle = (extraId) => {
    setEstimateData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Nos Tarifs Transparents
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Des prix justes et transparents pour tous nos services. 
              Aucun frais caché, aucune surprise. Calculez votre devis en temps réel.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Prix fixes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Sans frais cachés</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Calculator className="w-5 h-5 text-purple-400" />
                <span>Devis en ligne</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-[5%] py-20 max-w-7xl">
        {/* Services Grid */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold md:text-5xl mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Tous Nos Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services à domicile avec des tarifs adaptés à tous les budgets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    Populaire
                  </div>
                )}
                
                <div className={`h-32 bg-gradient-to-r ${service.color} flex items-center justify-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
                  </div>
                  {service.icon}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {service.startingPrice}€
                      <span className="text-lg font-normal text-gray-500">{service.unit}</span>
                    </div>
                    <div className="text-sm text-gray-500">à partir de</div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={() => setSelectedService(service.id)}
                    className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Calculer mon devis
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Price Calculator */}
        <AnimatePresence>
          {selectedService && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Calculateur de prix</h3>
                      <p className="text-blue-100">
                        {services.find(s => s.id === selectedService)?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Surface (m²) *
                        </label>
                        <input
                          type="number"
                          value={estimateData.surface}
                          onChange={(e) => setEstimateData({...estimateData, surface: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="Ex: 80"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nombre de pièces
                        </label>
                        <select
                          value={estimateData.rooms}
                          onChange={(e) => setEstimateData({...estimateData, rooms: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="1">1 pièce</option>
                          <option value="2">2 pièces</option>
                          <option value="3">3 pièces</option>
                          <option value="4">4 pièces</option>
                          <option value="5">5+ pièces</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Fréquence
                        </label>
                        <div className="space-y-2">
                          {frequencies.map((freq) => (
                            <label key={freq.id} className="flex items-center">
                              <input
                                type="radio"
                                name="frequency"
                                value={freq.id}
                                checked={estimateData.frequency === freq.id}
                                onChange={(e) => setEstimateData({...estimateData, frequency: e.target.value})}
                                className="mr-3 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-gray-700">{freq.label}</span>
                              {freq.multiplier < 1 && (
                                <span className="ml-2 text-green-600 text-sm font-medium">
                                  -{Math.round((1 - freq.multiplier) * 100)}%
                                </span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Services supplémentaires
                        </label>
                        <div className="space-y-2">
                          {extras.map((extra) => (
                            <label key={extra.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={estimateData.extras.includes(extra.id)}
                                  onChange={() => handleExtraToggle(extra.id)}
                                  className="mr-3 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{extra.label}</span>
                              </div>
                              <span className="text-gray-900 font-semibold">+{extra.price}€</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={calculatePrice}
                        disabled={!estimateData.surface}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                          estimateData.surface
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        whileHover={estimateData.surface ? { scale: 1.02 } : {}}
                        whileTap={estimateData.surface ? { scale: 0.98 } : {}}
                      >
                        <Calculator className="w-5 h-5 inline mr-2" />
                        Calculer le prix
                      </motion.button>
                      
                      {calculatedPrice && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                        >
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            {calculatedPrice}€
                          </div>
                          <div className="text-green-700 mb-4">Prix estimé pour votre prestation</div>
                          <motion.button
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center gap-2 mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Réserver maintenant
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Pricing Info */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi nos tarifs ?</h3>
              <p className="text-gray-600">Transparence, qualité et équité au cœur de notre politique tarifaire</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">Tarifs fixes</h4>
                <p className="text-gray-600">Aucune surprise, aucun frais caché. Le prix annoncé est le prix payé.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">Qualité garantie</h4>
                <p className="text-gray-600">Nos professionnels sont formés et certifiés pour vous offrir le meilleur service.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">Rapidité</h4>
                <p className="text-gray-600">Intervention rapide et efficace pour répondre à tous vos besoins.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h3>
            <p className="text-gray-600">Tout ce que vous devez savoir sur nos tarifs</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Les produits sont-ils inclus dans le prix ?",
                answer: "Oui, pour la plupart de nos services, les produits et matériels nécessaires sont inclus dans le prix affiché."
              },
              {
                question: "Y a-t-il des frais de déplacement ?",
                answer: "Non, aucun frais de déplacement n'est appliqué dans un rayon de 20km. Au-delà, des frais peuvent s'appliquer."
              },
              {
                question: "Comment sont calculés les tarifs ?",
                answer: "Nos tarifs sont basés sur la durée d'intervention, la superficie, et la complexité de la prestation demandée."
              },
              {
                question: "Peut-on négocier les prix ?",
                answer: "Nos tarifs sont fixes pour garantir l'équité. Cependant, des réductions s'appliquent pour les prestations régulières."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Prêt à réserver votre service ?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Choisissez votre service, calculez votre devis et réservez en quelques clics. 
            Satisfaction garantie ou remboursé !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver un service
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Demander un devis personnalisé
            </motion.button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Intervention sous 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Satisfaction garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Support 7j/7</span>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
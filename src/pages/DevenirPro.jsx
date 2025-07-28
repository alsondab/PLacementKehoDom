"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Clock, Star, Users, Calendar, MapPin, 
  CreditCard, Headphones, TrendingUp, Award, Shield,
  Upload, User, Phone, Mail, FileText, Send
} from 'lucide-react';
import Layout from '../components/Layout';

export default function DevenirPro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ville: '',
    services: [],
    experience: '',
    motivation: '',
    disponibilite: ''
  });

  const services = [
    { id: 'menage', name: 'Ménage', color: 'bg-blue-100 text-blue-700' },
    { id: 'coiffure', name: 'Coiffure', color: 'bg-purple-100 text-purple-700' },
    { id: 'beaute', name: 'Beauté', color: 'bg-pink-100 text-pink-700' },
    { id: 'garde', name: 'Garde d\'enfants', color: 'bg-green-100 text-green-700' },
    { id: 'jardinage', name: 'Jardinage', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'bricolage', name: 'Bricolage', color: 'bg-orange-100 text-orange-700' },
    { id: 'plomberie', name: 'Plomberie', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'electricite', name: 'Électricité', color: 'bg-indigo-100 text-indigo-700' }
  ];

  const advantages = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Gérez votre emploi du temps",
      description: "Choisissez vos horaires et jours de travail selon votre disponibilité"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Clients près de chez vous",
      description: "Recevez des missions dans votre zone géographique préférée"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Paiement rapide et sécurisé",
      description: "Recevez vos paiements sous 24h après chaque prestation"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Accompagnement personnalisé",
      description: "Une équipe dédiée vous accompagne tout au long de votre parcours"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Augmentez vos revenus",
      description: "Complétez vos revenus ou créez votre activité principale"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Assurance incluse",
      description: "Bénéficiez d'une couverture complète pour toutes vos interventions"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      service: "Ménage",
      text: "Grâce à cette plateforme, j'ai pu créer mon activité de ménage. Je gagne 2000€/mois en travaillant à mon rythme !",
      rating: 5,
      revenue: "2000€/mois"
    },
    {
      name: "Pierre D.",
      service: "Jardinage",
      text: "Parfait pour compléter mes revenus de retraite. Les clients sont géniaux et le support très réactif.",
      rating: 5,
      revenue: "800€/mois"
    },
    {
      name: "Sophie M.",
      service: "Coiffure",
      text: "J'ai quitté mon salon pour me lancer à domicile. Meilleure décision de ma carrière !",
      rating: 5,
      revenue: "3500€/mois"
    }
  ];

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Devenez Professionnel Partenaire
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Rejoignez notre réseau de professionnels qualifiés et développez votre activité 
                grâce à notre plateforme innovante de services à domicile.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>5000+ professionnels</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-5 h-5" />
                  <span>4.8/5 satisfaction</span>
                </div>
              </div>

              <motion.button 
                onClick={() => document.getElementById('candidature').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Commencer ma candidature
              </motion.button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=400&fit=crop"
                  alt="Professionnel au travail"
                  className="w-full h-full object-cover"
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">1000+</div>
                      <div className="text-xs text-gray-600">Missions/mois</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">2500€</div>
                      <div className="text-xs text-gray-600">Revenus moyens</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="px-[5%] py-20 md:py-28">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold md:text-5xl mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Pourquoi nous rejoindre ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez tous les avantages de faire partie de notre réseau de professionnels partenaires.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-blue-600 mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-[5%] py-20 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold md:text-5xl mb-6 text-gray-900">
              Services Recherchés
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les domaines dans lesquels nous recrutons activement des professionnels qualifiés.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`${service.color} rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="font-semibold">{service.name}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Services disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">5000+</div>
                <div className="text-gray-600">Professionnels actifs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">15000+</div>
                <div className="text-gray-600">Clients satisfaits</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-[5%] py-20">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold md:text-5xl mb-6 text-gray-900">
              Témoignages de nos Pros
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les retours de nos professionnels partenaires qui ont transformé leur carrière.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{testimonial.rating}/5</span>
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.service}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{testimonial.revenue}</div>
                    <div className="text-xs text-gray-500">revenus</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="candidature" className="px-[5%] py-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold md:text-5xl mb-6 text-gray-900">
              Postuler Maintenant
            </h2>
            <p className="text-lg text-gray-600">
              Rejoignez notre réseau en quelques clics. Le processus est simple et rapide !
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Progress Bar */}
            <div className="bg-gray-50 px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                        step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Étape {currentStep} sur 3 - {
                    currentStep === 1 ? 'Informations personnelles' :
                    currentStep === 2 ? 'Services et expérience' :
                    'Finalisation'
                  }
                </span>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Informations personnelles</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Prénom *
                        </label>
                        <input 
                          type="text"
                          value={formData.prenom}
                          onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Nom *
                        </label>
                        <input 
                          type="text"
                          value={formData.nom}
                          onChange={(e) => setFormData({...formData, nom: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email *
                        </label>
                        <input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Téléphone *
                        </label>
                        <input 
                          type="tel"
                          value={formData.telephone}
                          onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Ville *
                        </label>
                        <input 
                          type="text"
                          value={formData.ville}
                          onChange={(e) => setFormData({...formData, ville: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          placeholder="Votre ville"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Services et expérience</h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Services proposés * (sélectionnez un ou plusieurs)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {services.map((service) => (
                          <motion.button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                              formData.services.includes(service.id)
                                ? service.color + ' ring-2 ring-blue-500'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {service.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Expérience professionnelle *
                      </label>
                      <textarea 
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        rows="4"
                        placeholder="Décrivez votre expérience dans le(s) domaine(s) sélectionné(s)..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Disponibilité
                      </label>
                      <select 
                        value={formData.disponibilite}
                        onChange={(e) => setFormData({...formData, disponibilite: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <option value="">Sélectionnez votre disponibilité</option>
                        <option value="temps-plein">Temps plein</option>
                        <option value="temps-partiel">Temps partiel</option>
                        <option value="weekend">Week-ends uniquement</option>
                        <option value="soiree">Soirées uniquement</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Finalisation</h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Motivation
                      </label>
                      <textarea 
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        rows="4"
                        placeholder="Expliquez-nous pourquoi vous souhaitez rejoindre notre réseau..."
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Documents (optionnel)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors duration-300">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Glissez vos documents ici ou cliquez pour sélectionner</p>
                        <p className="text-sm text-gray-500">CV, certifications, portfolio... (PDF, JPG, PNG - Max 10MB)</p>
                        <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Récapitulatif de votre candidature :</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Nom :</span> {formData.prenom} {formData.nom}</p>
                        <p><span className="font-medium">Email :</span> {formData.email}</p>
                        <p><span className="font-medium">Ville :</span> {formData.ville}</p>
                        <p><span className="font-medium">Services :</span> {
                          formData.services.map(id => services.find(s => s.id === id)?.name).join(', ')
                        }</p>
                        <p><span className="font-medium">Disponibilité :</span> {formData.disponibilite}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                  whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
                >
                  Précédent
                </motion.button>

                {currentStep < 3 ? (
                  <motion.button
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Suivant
                  </motion.button>
                ) : (
                  <motion.button
                    className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                    Envoyer ma candidature
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-[5%] py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Prêt à commencer votre nouvelle aventure ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Rejoignez dès aujourd'hui notre communauté de professionnels et développez votre activité 
              avec le soutien d'une plateforme innovante.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Postuler maintenant
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                En savoir plus
              </motion.button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <div className="text-2xl font-bold mb-2">Certification</div>
                <div className="text-blue-100">Formation et certification incluses</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-300" />
                <div className="text-2xl font-bold mb-2">Croissance</div>
                <div className="text-blue-100">Développez votre activité rapidement</div>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <div className="text-2xl font-bold mb-2">Sécurité</div>
                <div className="text-blue-100">Assurance et support garantis</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
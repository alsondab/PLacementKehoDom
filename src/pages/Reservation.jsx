import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, User, Phone, Mail, CreditCard, 
  CheckCircle, ArrowRight, ArrowLeft, Star, Shield, Info,
  Home, Users, MessageSquare, ChevronLeft, ChevronRight
} from 'lucide-react';
import Layout from '../components/Layout';

export default function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    instructions: '',
    frequency: 'unique'
  });

  const services = [
    {
      id: 1,
      name: 'Ménage Complet Premium',
      price: 75,
      duration: '3h',
      description: 'Service de ménage complet incluant toutes les pièces',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      features: ['Produits inclus', 'Équipe certifiée', 'Garantie satisfaction']
    },
    {
      id: 2,
      name: 'Coiffure à Domicile',
      price: 85,
      duration: '2h',
      description: 'Services de coiffure professionnels à domicile',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      features: ['Matériel professionnel', 'Conseils personnalisés', 'Produits haut de gamme']
    },
    {
      id: 3,
      name: 'Garde d\'Enfants',
      price: 65,
      duration: '4h',
      description: 'Garde d\'enfants qualifiée avec activités éducatives',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      features: ['Personnel diplômé', 'Activités ludiques', 'Suivi parental']
    }
  ];

  const availableSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const frequencies = [
    { id: 'unique', label: 'Prestation unique', price: 0 },
    { id: 'weekly', label: 'Hebdomadaire', price: -10 },
    { id: 'biweekly', label: 'Toutes les 2 semaines', price: -5 },
    { id: 'monthly', label: 'Mensuel', price: -3 }
  ];

  // Generate calendar days (simplified)
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const basePrice = selectedService.price;
    const frequency = frequencies.find(f => f.id === formData.frequency);
    return basePrice + (frequency ? frequency.price : 0);
  };

  const steps = [
    { number: 1, title: 'Service', description: 'Choisissez votre service' },
    { number: 2, title: 'Créneau', description: 'Date et heure' },
    { number: 3, title: 'Informations', description: 'Vos coordonnées' },
    { number: 4, title: 'Confirmation', description: 'Récapitulatif' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-[5%] py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="py-20 container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl  font-bold md:text-5xl mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Réservation
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Réservez votre service en quelques clics. Simple, rapide et sécurisé.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-[5%] py-20 max-w-6xl">
        {/* Progress Bar */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step.number <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`font-medium ${step.number <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                    step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Choisissez votre service</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedService?.id === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">{service.price}€</span>
                        <span className="text-gray-500 text-sm">{service.duration}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Frequency Selection */}
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 p-6 bg-gray-50 rounded-xl"
                  >
                    <h3 className="text-lg font-bold mb-4">Fréquence de service</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {frequencies.map((freq) => (
                        <label key={freq.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="frequency"
                            value={freq.id}
                            checked={formData.frequency === freq.id}
                            onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.frequency === freq.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="font-medium">{freq.label}</div>
                            {freq.price < 0 && (
                              <div className="text-green-600 text-sm font-medium">
                                {freq.price}€
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Choisissez votre créneau</h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Sélectionnez une date
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((date, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          disabled={index === 0} // Disable today for demo
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? 'bg-blue-600 text-white'
                              : index === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                          whileHover={index !== 0 ? { scale: 1.05 } : {}}
                          whileTap={index !== 0 ? { scale: 0.95 } : {}}
                        >
                          <div>{date.getDate()}</div>
                          <div className="text-xs">
                            {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Sélectionnez un horaire
                    </h3>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {availableSlots.map((time) => (
                          <motion.button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                              selectedTime === time
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-center py-8">
                        Sélectionnez d'abord une date
                      </div>
                    )}
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        Créneau sélectionné : {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Personal Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Vos informations</h2>
                
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adresse complète *
                    </label>
                    <input
                      type="text"
                      value={formData.adresse}
                      onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="123 Rue de la Paix"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      value={formData.ville}
                      onChange={(e) => setFormData({...formData, ville: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Paris"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Code Postal *
                    </label>
                    <input
                      type="text"
                      value={formData.codePostal}
                      onChange={(e) => setFormData({...formData, codePostal: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="75001"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Instructions spéciales (optionnel)
                    </label>
                    <textarea
                      value={formData.instructions}
                      onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      rows="3"
                      placeholder="Informations complémentaires pour le professionnel..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Récapitulatif de votre réservation</h2>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Booking Summary */}
                  <div className="lg:col-span-2">
                    {/* Service Details */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4">Service sélectionné</h3>
                      <div className="flex items-start gap-4">
                        <img
                          src={selectedService?.image}
                          alt={selectedService?.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{selectedService?.name}</h4>
                          <p className="text-gray-600 mb-2">{selectedService?.description}</p>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>Durée: {selectedService?.duration}</span>
                            <span>Prix: {selectedService?.price}€</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4">Créneau</h3>
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>{selectedDate?.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>{selectedTime}</span>
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Informations client</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Nom:</strong> {formData.prenom} {formData.nom}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Téléphone:</strong> {formData.telephone}</div>
                        <div><strong>Adresse:</strong> {formData.adresse}, {formData.ville} {formData.codePostal}</div>
                      </div>
                      {formData.instructions && (
                        <div className="mt-4 text-sm">
                          <strong>Instructions:</strong> {formData.instructions}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-4">
                      <h3 className="text-xl font-bold mb-4">Récapitulatif des prix</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span>Service de base</span>
                          <span>{selectedService?.price}€</span>
                        </div>
                        {formData.frequency !== 'unique' && (
                          <div className="flex justify-between text-green-600">
                            <span>Réduction fréquence</span>
                            <span>{frequencies.find(f => f.id === formData.frequency)?.price}€</span>
                          </div>
                        )}
                        <hr />
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span className="text-blue-600">{calculateTotal()}€</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span>Paiement sécurisé</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Satisfaction garantie</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span>Annulation gratuite 24h avant</span>
                        </div>
                      </div>

                      <motion.button
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CreditCard className="w-5 h-5" />
                        Procéder au paiement
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </motion.button>

            {currentStep < 4 ? (
              <motion.button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 3 && (!formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.adresse))
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 3 && (!formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.adresse))
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                whileHover={
                  !((currentStep === 1 && !selectedService) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                    (currentStep === 3 && (!formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.adresse)))
                    ? { scale: 1.05 }
                    : {}
                }
                whileTap={
                  !((currentStep === 1 && !selectedService) ||
                    (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                    (currentStep === 3 && (!formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.adresse)))
                    ? { scale: 0.95 }
                    : {}
                }
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <div className="text-sm text-gray-500">
                Cliquez sur "Procéder au paiement" pour finaliser
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pourquoi choisir nos services ?</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">Sécurité garantie</h4>
                <p className="text-gray-600">Tous nos professionnels sont vérifiés et assurés pour votre tranquillité d'esprit.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">Qualité premium</h4>
                <p className="text-gray-600">Une note moyenne de 4.8/5 grâce à nos professionnels expérimentés et qualifiés.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">Flexibilité totale</h4>
                <p className="text-gray-600">Annulation gratuite jusqu'à 24h avant, reprogrammation facile selon vos besoins.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Questions fréquentes</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  question: "Comment se déroule la réservation ?",
                  answer: "En 4 étapes simples : choix du service, sélection du créneau, saisie des informations et confirmation."
                },
                {
                  question: "Puis-je modifier ma réservation ?",
                  answer: "Oui, vous pouvez modifier ou annuler gratuitement jusqu'à 24h avant l'intervention."
                },
                {
                  question: "Les professionnels sont-ils assurés ?",
                  answer: "Tous nos professionnels sont vérifiés, certifiés et couverts par une assurance responsabilité civile."
                },
                {
                  question: "Comment se fait le paiement ?",
                  answer: "Le paiement est sécurisé et peut se faire par carte bancaire. Vous ne payez qu'après validation de votre réservation."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl"
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
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Support */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour votre réservation ?</h3>
            <p className="text-blue-100 mb-6">
              Notre équipe est là pour vous accompagner dans votre réservation et répondre à toutes vos questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
                01 23 45 67 89
              </motion.button>
              
              <motion.button 
                className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                Chat en direct
              </motion.button>
            </div>

            <div className="mt-6 text-sm text-blue-100">
              Disponible 7j/7 de 8h à 20h
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
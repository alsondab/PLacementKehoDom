"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle, 
  ArrowLeft, 
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  X
} from "lucide-react";

// Composant pour les étapes du processus
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            index < currentStep 
              ? 'bg-black text-white' 
              : index === currentStep 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {index < currentStep ? <CheckCircle className="w-5 h-5" stroke="white" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
              index < currentStep ? 'bg-black' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// Composant pour les méthodes de paiement
const PaymentMethod = ({ method, selected, onSelect }) => {
  const methods = {
    card: {
      icon: <CreditCard className="w-6 h-6" stroke="black" />,
      title: "Carte bancaire",
      description: "Visa, Mastercard, American Express"
    },
    paypal: {
      icon: <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>,
      title: "PayPal",
      description: "Paiement sécurisé via PayPal"
    },
    mobile: {
      icon: <Phone className="w-6 h-6" stroke="black" />,
      title: "Mobile Money",
      description: "Orange Money, MTN Mobile Money"
    }
  };

  const currentMethod = methods[method];

  return (
    <motion.div
      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
        selected 
          ? 'border-black bg-black/5' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(method)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{currentMethod.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{currentMethod.title}</h3>
          <p className="text-sm text-gray-600">{currentMethod.description}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected 
            ? 'border-black bg-black' 
            : 'border-gray-300'
        }`}>
          {selected && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>
    </motion.div>
  );
};

// Composant pour le résumé de la commande
const OrderSummary = ({ cartItems, total }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Résumé de la commande</h3>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item, index) => (
          <motion.div 
            key={index}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">${item.price}</div>
              <div className="text-sm text-gray-500">Qté: {item.quantity || 1}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Frais de service</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-700">
          <Shield className="w-5 h-5" stroke="currentColor" />
          <span className="text-sm font-medium">Paiement 100% sécurisé</span>
        </div>
      </div>
    </div>
  );
};

// Composant principal de la page de paiement
export default function Payment() {
  const { cartItems, total } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation du processus de paiement
    setCurrentStep(3);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    return (
      <Layout hideNavbar hideFooter>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-blue-600" stroke="currentColor" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connexion requise</h2>
            <p className="text-gray-600 mb-8">
              Vous devez être connecté pour procéder au paiement. Créez un compte ou connectez-vous pour continuer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register', { state: { returnTo: '/payment' } })}
              >
                S'inscrire
              </motion.button>
              <motion.button 
                className="px-8 py-4 border-2 border-black text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login', { state: { returnTo: '/payment' } })}
              >
                Se connecter
              </motion.button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout hideNavbar hideFooter>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-12 h-12 text-gray-400" stroke="black" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h2>
            <p className="text-gray-600 mb-8">Votre panier est vide. Ajoutez des services pour continuer.</p>
            <motion.button 
              className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
            >
              Retourner aux services
            </motion.button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNavbar hideFooter>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <motion.button 
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
              onClick={() => window.history.back()}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" stroke="black" />
              Retour au panier
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-900">Finaliser votre commande</h1>
          </div>

          {/* Indicateur d'étapes */}
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse *</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ville *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Code postal *</label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <motion.button
                        onClick={() => setCurrentStep(2)}
                        className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                      >
                        Continuer
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Méthode de paiement</h2>
                    
                    <div className="space-y-4 mb-8">
                      <PaymentMethod 
                        method="card" 
                        selected={selectedPaymentMethod === 'card'} 
                        onSelect={setSelectedPaymentMethod} 
                      />
                      <PaymentMethod 
                        method="paypal" 
                        selected={selectedPaymentMethod === 'paypal'} 
                        onSelect={setSelectedPaymentMethod} 
                      />
                      <PaymentMethod 
                        method="mobile" 
                        selected={selectedPaymentMethod === 'mobile'} 
                        onSelect={setSelectedPaymentMethod} 
                      />
                    </div>

                    {selectedPaymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro de carte *</label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            maxLength="19"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date d'expiration *</label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              maxLength="5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              maxLength="4"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Nom sur la carte *</label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      <motion.button
                        onClick={() => setCurrentStep(1)}
                        className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-black hover:text-black transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Retour
                      </motion.button>
                      <motion.button
                        onClick={handleSubmit}
                        className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={selectedPaymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName)}
                      >
                        Procéder au paiement
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" stroke="currentColor" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Paiement réussi !</h2>
                    <p className="text-gray-600 mb-8">Votre commande a été confirmée. Vous recevrez un email de confirmation dans quelques minutes.</p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <h3 className="font-semibold text-gray-900 mb-4">Détails de la commande</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Numéro de commande :</span>
                          <span className="font-mono">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total payé :</span>
                          <span className="font-semibold">${total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date :</span>
                          <span>{new Date().toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => window.location.href = '/'}
                      className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retour à l'accueil
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar - Résumé de la commande */}
            <div className="lg:col-span-1">
              <OrderSummary cartItems={cartItems} total={total} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  MapPin,
  CheckCircle,
  ArrowLeft,
  Shield,
  Users
} from "lucide-react";

// Définir InputField ici, AVANT le composant Register
const InputField = ({ 
  icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  name,
  showToggle = false,
  onToggle = null
}) => (
  <div className="relative">
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
          error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {type === 'password' ? <EyeOff className="w-5 h-5" stroke="black" /> : <Eye className="w-5 h-5" stroke="black" />}
        </button>
      )}
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-sm mt-2"
      >
        {error}
      </motion.p>
    )}
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    zipCode: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Le code postal est requis';

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulation d'une inscription réussie
    setTimeout(() => {
      // Créer le compte utilisateur
      register(formData);
      setIsSubmitting(false);
      
      // Rediriger vers la page de connexion avec un message de succès
      navigate('/login', { state: { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' } });
    }, 2000);
  };

  return (
    <Layout hideNavbar hideFooter>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <motion.button 
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
              onClick={() => navigate(-1)}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" stroke="black" />
              Retour
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-900">Créer votre compte</h1>
            <p className="text-gray-600 mt-2">Rejoignez notre communauté et accédez à nos services</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Formulaire d'inscription */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom et Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<User className="w-5 h-5" stroke="black" />}
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    name="firstName"
                  />
                  <InputField
                    icon={<User className="w-5 h-5" stroke="black" />}
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    name="lastName"
                  />
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<Mail className="w-5 h-5" stroke="black" />}
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    name="email"
                  />
                  <InputField
                    icon={<Phone className="w-5 h-5" stroke="black" />}
                    type="tel"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    name="phone"
                  />
                </div>

                {/* Mot de passe et confirmation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<Lock className="w-5 h-5" stroke="black" />}
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    name="password"
                    showToggle={true}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                  <InputField
                    icon={<Lock className="w-5 h-5" stroke="black" />}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    name="confirmPassword"
                    showToggle={true}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                {/* Adresse */}
                <InputField
                  icon={<MapPin className="w-5 h-5" stroke="black" />}
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  name="address"
                />

                {/* Ville et Code postal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<MapPin className="w-5 h-5" stroke="black" />}
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    name="city"
                  />
                  <InputField
                    icon={<MapPin className="w-5 h-5" stroke="black" />}
                    placeholder="Code postal"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    error={errors.zipCode}
                    name="zipCode"
                  />
                </div>

                {/* Conditions d'utilisation */}
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      J'accepte les{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                        conditions d'utilisation
                      </Link>{' '}
                      et la{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        politique de confidentialité
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.acceptTerms}
                    </motion.p>
                  )}
                </div>

                {/* Bouton d'inscription */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Création du compte...
                    </div>
                  ) : (
                    'Créer mon compte'
                  )}
                </motion.button>

                {/* Lien vers la connexion */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Se connecter
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Section d'informations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Avantages */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi s'inscrire ?</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Shield className="w-6 h-6" stroke="black" />,
                      title: "Sécurité garantie",
                      description: "Vos données sont protégées et sécurisées"
                    },
                    {
                      icon: <CheckCircle className="w-6 h-6" stroke="black" />,
                      title: "Réservation simplifiée",
                      description: "Réservez vos services en quelques clics"
                    },
                    {
                      icon: <Users className="w-6 h-6" stroke="black" />,
                      title: "Support prioritaire",
                      description: "Accédez à notre équipe support 24/7"
                    }
                  ].map((advantage, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {advantage.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{advantage.title}</h4>
                        <p className="text-gray-600 text-sm">{advantage.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Statistiques */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Rejoignez notre communauté</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "10K+", label: "Clients satisfaits" },
                    { number: "500+", label: "Professionnels" },
                    { number: "50+", label: "Services disponibles" },
                    { number: "99%", label: "Satisfaction" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-2xl font-bold mb-1">{stat.number}</div>
                      <div className="text-blue-100 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
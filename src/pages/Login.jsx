"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  CheckCircle,
  Shield,
  Users
} from "lucide-react";

// Définir InputField ici, AVANT le composant Login
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

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Afficher le message de succès si présent dans l'état de navigation
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Nettoyer l'état de navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Utiliser la nouvelle fonction login avec credentials fixes
    const result = login(formData.email, formData.password);
    if (result.success) {
      setIsSubmitting(false);
      // Rediriger vers la page précédente ou l'accueil
      const returnTo = location.state?.returnTo || '/';
      navigate(returnTo);
    } else {
      setErrors({ general: result.error });
      setIsSubmitting(false);
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-600 mt-2">Accédez à votre compte pour continuer</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Formulaire de connexion */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              {/* Message de succès */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" stroke="currentColor" />
                      <span className="text-sm font-medium">{successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message d'erreur général */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-700">
                    <Lock className="w-5 h-5" stroke="currentColor" />
                    <span className="text-sm font-medium">{errors.general}</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <InputField
                  icon={<Mail className="w-5 h-5" stroke="black" />}
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  name="email"
                />

                {/* Mot de passe */}
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

                {/* Options */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Se souvenir de moi</span>
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Bouton de connexion */}
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
                      Connexion en cours...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </motion.button>

                {/* Séparateur */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                {/* Connexion avec Google */}
                <motion.button
                  type="button"
                  className="w-full py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuer avec Google
                  </div>
                </motion.button>

                {/* Lien vers l'inscription */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                      S'inscrire
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Bienvenue !</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Shield className="w-6 h-6" stroke="black" />,
                      title: "Accès sécurisé",
                      description: "Votre compte est protégé par des mesures de sécurité avancées"
                    },
                    {
                      icon: <CheckCircle className="w-6 h-6" stroke="black" />,
                      title: "Historique complet",
                      description: "Retrouvez tous vos services et réservations"
                    },
                    {
                      icon: <Users className="w-6 h-6" stroke="black" />,
                      title: "Support personnalisé",
                      description: "Bénéficiez d'un support dédié à votre compte"
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
                <h3 className="text-2xl font-bold mb-6">Notre communauté</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "10K+", label: "Membres actifs" },
                    { number: "500+", label: "Professionnels" },
                    { number: "50+", label: "Services" },
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
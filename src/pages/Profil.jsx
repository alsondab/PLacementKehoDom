import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, CreditCard, Calendar, MapPin, Phone, Mail, 
  Bell, Shield, Heart, Clock, Star, ChevronRight, Edit, 
  Eye, EyeOff, Save, X, Plus, Trash2, CheckCircle
} from 'lucide-react';
import Layout from '../components/Layout';

export default function MonCompte() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const [userProfile, setUserProfile] = useState({
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'marie.dubois@email.com',
    telephone: '06 12 34 56 78',
    adresse: '123 Rue de la Paix',
    ville: 'Paris',
    codePostal: '75001',
    dateNaissance: '1985-03-15'
  });

  const [editedProfile, setEditedProfile] = useState(userProfile);

  const reservations = [
    {
      id: 1,
      service: 'Ménage complet',
      date: '2024-07-20',
      heure: '14:00',
      status: 'confirmé',
      prix: 75,
      professionnel: 'Sophie Martin',
      rating: 5
    },
    {
      id: 2,
      service: 'Coiffure à domicile',
      date: '2024-07-25',
      heure: '10:30',
      status: 'en attente',
      prix: 85,
      professionnel: 'Alex Durand',
      rating: null
    },
    {
      id: 3,
      service: 'Jardinage',
      date: '2024-07-15',
      heure: '09:00',
      status: 'terminé',
      prix: 60,
      professionnel: 'Pierre Leroy',
      rating: 4
    }
  ];

  const favoriteServices = [
    { id: 1, name: 'Ménage complet', lastUsed: '2024-07-15', price: 75 },
    { id: 2, name: 'Coiffure à domicile', lastUsed: '2024-06-20', price: 85 },
    { id: 3, name: 'Garde d\'enfants', lastUsed: '2024-07-10', price: 65 }
  ];

  const paymentMethods = [
    { id: 1, type: 'card', last4: '1234', brand: 'Visa', expiry: '12/26', isDefault: true },
    { id: 2, type: 'card', last4: '5678', brand: 'Mastercard', expiry: '08/25', isDefault: false }
  ];

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: <User className="w-5 h-5" /> },
    { id: 'reservations', label: 'Mes Réservations', icon: <Calendar className="w-5 h-5" /> },
    { id: 'favorites', label: 'Mes Favoris', icon: <Heart className="w-5 h-5" /> },
    { id: 'payment', label: 'Paiement', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> }
  ];

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmé': return 'bg-green-100 text-green-700';
      case 'en attente': return 'bg-yellow-100 text-yellow-700';
      case 'terminé': return 'bg-blue-100 text-blue-700';
      case 'annulé': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmé': return 'Confirmé';
      case 'en attente': return 'En attente';
      case 'terminé': return 'Terminé';
      case 'annulé': return 'Annulé';
      default: return status;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-10 py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden pt-64">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className=" py-20 container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl  font-bold md:text-5xl mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Mon Compte
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Gérez votre profil, vos réservations et vos préférences en toute simplicité
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-[5%] py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* User Info */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{userProfile.prenom} {userProfile.nom}</h3>
                    <p className="text-blue-100 text-sm">Client depuis Mars 2024</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 mb-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">Mon Profil</h2>
                      {!isEditing ? (
                        <motion.button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit className="w-4 h-4" />
                          Modifier
                        </motion.button>
                      ) : (
                        <div className="flex gap-2">
                          <motion.button
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Save className="w-4 h-4" />
                            Sauvegarder
                          </motion.button>
                          <motion.button
                            onClick={handleCancelEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="w-4 h-4" />
                            Annuler
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.prenom : userProfile.prenom}
                          onChange={(e) => setEditedProfile({...editedProfile, prenom: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Nom
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.nom : userProfile.nom}
                          onChange={(e) => setEditedProfile({...editedProfile, nom: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={isEditing ? editedProfile.email : userProfile.email}
                          onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={isEditing ? editedProfile.telephone : userProfile.telephone}
                          onChange={(e) => setEditedProfile({...editedProfile, telephone: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Adresse
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.adresse : userProfile.adresse}
                          onChange={(e) => setEditedProfile({...editedProfile, adresse: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.ville : userProfile.ville}
                          onChange={(e) => setEditedProfile({...editedProfile, ville: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Code Postal
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.codePostal : userProfile.codePostal}
                          onChange={(e) => setEditedProfile({...editedProfile, codePostal: e.target.value})}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 ${
                            isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Reservations Tab */}
              {activeTab === 'reservations' && (
                <motion.div
                  key="reservations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">Mes Réservations</h2>
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4" />
                        Nouvelle réservation
                      </motion.button>
                    </div>

                    <div className="space-y-6">
                      {reservations.map((reservation, index) => (
                        <motion.div
                          key={reservation.id}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{reservation.service}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(reservation.status)}`}>
                                  {getStatusText(reservation.status)}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-gray-600 mb-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(reservation.date).toLocaleDateString('fr-FR')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {reservation.heure}
                                </span>
                              </div>
                              <p className="text-gray-600">Avec {reservation.professionnel}</p>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900 mb-2">{reservation.prix}€</div>
                              {reservation.rating && (
                                <div className="flex items-center justify-end gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < reservation.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                              )}
                              {reservation.status === 'terminé' && !reservation.rating && (
                                <motion.button
                                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  Noter le service
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Mes Services Favoris</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {favoriteServices.map((service, index) => (
                        <motion.div
                          key={service.id}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                            <Heart className="w-6 h-6 text-red-500 fill-current" />
                          </div>
                          <div className="text-gray-600 mb-4">
                            <p>Dernière utilisation : {new Date(service.lastUsed).toLocaleDateString('fr-FR')}</p>
                            <p className="text-lg font-semibold text-gray-900 mt-2">{service.price}€</p>
                          </div>
                          <motion.button
                            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Réserver à nouveau
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">Moyens de Paiement</h2>
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter une carte
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      {paymentMethods.map((method, index) => (
                        <motion.div
                          key={method.id}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">{method.brand}</span>
                                  <span className="text-gray-600">•••• {method.last4}</span>
                                  {method.isDefault && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                      Par défaut
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm">Expire le {method.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Paramètres</h2>
                    
                    {/* Notifications */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">
                                {key === 'email' && 'Notifications par email'}
                                {key === 'sms' && 'Notifications par SMS'}
                                {key === 'push' && 'Notifications push'}
                                {key === 'marketing' && 'Offres promotionnelles'}
                              </div>
                              <div className="text-sm text-gray-600">
                                {key === 'email' && 'Recevez les confirmations et rappels par email'}
                                {key === 'sms' && 'Recevez les alertes importantes par SMS'}
                                {key === 'push' && 'Notifications dans votre navigateur'}
                                {key === 'marketing' && 'Recevez nos offres spéciales et promotions'}
                              </div>
                            </div>
                            <motion.button
                              onClick={() => setNotifications({...notifications, [key]: !value})}
                              className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                value ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{ x: value ? 24 : 2 }}
                                transition={{ duration: 0.2 }}
                              />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Sécurité
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Changer le mot de passe</div>
                              <div className="text-sm text-gray-600">Dernière modification il y a 3 mois</div>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Modifier
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Authentification à deux facteurs</div>
                              <div className="text-sm text-gray-600">Sécurisez votre compte avec la 2FA</div>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Activer
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Sessions actives</div>
                              <div className="text-sm text-gray-600">Gérez vos connexions actives</div>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Voir tout
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Privacy */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Confidentialité</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Télécharger mes données</div>
                              <div className="text-sm text-gray-600">Obtenez une copie de toutes vos données</div>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Télécharger
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-4 border border-red-200 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-red-600">Supprimer mon compte</div>
                              <div className="text-sm text-gray-600">Cette action est irréversible</div>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Supprimer
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Votre Activité</h3>
              <p className="text-blue-100">Récapitulatif de votre utilisation de nos services</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-blue-100 text-sm">Réservations</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-1">3</div>
                <div className="text-blue-100 text-sm">Services favoris</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-1">4.8</div>
                <div className="text-blue-100 text-sm">Note moyenne</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-1">€890</div>
                <div className="text-blue-100 text-sm">Total économisé</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Activité Récente</h3>
            
            <div className="space-y-4">
              {[
                { action: 'Réservation confirmée', service: 'Ménage complet', date: '2024-07-18', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
                { action: 'Service noté', service: 'Jardinage', date: '2024-07-16', icon: <Star className="w-5 h-5 text-yellow-500" /> },
                { action: 'Paiement effectué', service: 'Coiffure à domicile', date: '2024-07-15', icon: <CreditCard className="w-5 h-5 text-blue-500" /> },
                { action: 'Profil mis à jour', service: 'Informations personnelles', date: '2024-07-14', icon: <User className="w-5 h-5 text-purple-500" /> },
                { action: 'Service ajouté aux favoris', service: 'Garde d\'enfants', date: '2024-07-12', icon: <Heart className="w-5 h-5 text-red-500" /> }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-2 bg-gray-100 rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.service}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString('fr-FR')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Help & Support */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600">Notre équipe support est là pour vous accompagner</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600 text-sm mb-4">Contactez-nous par email</p>
                <motion.button 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  support@wecasa.fr
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Téléphone</h4>
                <p className="text-gray-600 text-sm mb-4">Appelez-nous directement</p>
                <motion.button 
                  className="text-green-600 hover:text-green-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  01 23 45 67 89
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Chat en direct</h4>
                <p className="text-gray-600 text-sm mb-4">Assistance immédiate</p>
                <motion.button 
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Démarrer le chat
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
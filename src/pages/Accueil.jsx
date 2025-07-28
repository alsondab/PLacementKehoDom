"use client";

import React, { useState, useEffect } from "react";
import { RxChevronDown, RxChevronRight } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Home, Scissors, Baby, Lock, Star, Handshake, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import UltraSearchBar from '../components/UltraSearchBar';

// Import des composants - Ajustez ces chemins selon votre structure de dossiers
// Si vos composants sont dans src/components/, utilisez :
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// Si vos composants sont ailleurs, ajustez le chemin en conséquence

// Composants UI optimisés
const Button = ({ children, variant = "primary", size = "md", className = "", iconRight, onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full transform hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-black border border-black hover:bg-gray-50 focus:ring-gray-500 shadow-md hover:shadow-lg",
    "secondary-alt": "bg-transparent text-white border border-white hover:bg-white hover:text-black focus:ring-white",
    link: "text-black hover:text-gray-600 focus:ring-gray-500 bg-transparent border-none shadow-none",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
    link: "p-0 text-base"
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {iconRight && iconRight}
      </span>
    </motion.button>
  );
};

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${className}`}
      {...props}
    />
  );
};

// Composant Accordion amélioré
const Accordion = ({ children }) => {
  return <div className="space-y-3">{children}</div>;
};

const AccordionItem = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="border border-gray-700 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </motion.div>
  );
};

const AccordionTrigger = ({ children, isOpen, setIsOpen, className = "" }) => {
  return (
    <button
      className={`w-full px-6 py-5 text-left font-medium hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition-all duration-300 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        {children}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
    </button>
  );
};

const AccordionContent = ({ children, isOpen, className = "" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className={`px-6 pb-5 text-gray-300 ${className}`}>
        {children}
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook form amélioré
const useForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ email: "", name: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };
  
  return {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  };
};

// Données pour les services
const servicesData = [
  {
    id: 1,
    title: "SERVICES DE MÉNAGE ET ENTRETIEN DE MAISON",
    description: "Des experts pour garder votre maison propre et accueillante.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    icon: <Home className="w-8 h-8" stroke="black" />
  },
  {
    id: 2,
    title: "COIFFURE ET SOINS PERSONNELS À DOMICILE",
    description: "Transformez votre look avec nos coiffeurs professionnels.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop",
    icon: <Scissors className="w-8 h-8" stroke="black" />
  },
  {
    id: 3,
    title: "GARDE D'ENFANTS ET SERVICES DE BABYSITTING",
    description: "Des garderies fiables pour veiller sur vos enfants.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=400&fit=crop",
    icon: <Baby className="w-8 h-8" stroke="black" />
  }
];

// Données pour les étapes
const stepsData = [
  {
    id: 1,
    title: "UN PROCESSUS SIMPLE ET SÉCURISÉ",
    description: "Nous garantissons un paiement sécurisé et une confirmation instantanée.",
    color: "blue",
    icon: <Lock className="w-10 h-10" stroke="black" />
  },
  {
    id: 2,
    title: "ÉVALUEZ ET PARTAGEZ VOTRE EXPÉRIENCE",
    description: "Après votre service, laissez un avis pour aider les autres.",
    color: "green",
    icon: <Star className="w-10 h-10" stroke="black" />
  },
  {
    id: 3,
    title: "ASSISTANCE À CHAQUE ÉTAPE",
    description: "Notre équipe est disponible pour répondre à vos questions.",
    color: "yellow",
    icon: <Handshake className="w-10 h-10" stroke="black" />
  }
];

// Données FAQ
const faqData = [
  {
    id: 1,
    question: "Comment réserver un service ?",
    answer: "Pour réserver un service, créez un compte ou connectez-vous. Ensuite, parcourez notre catalogue, choisissez le service souhaité et suivez les étapes pour finaliser votre réservation."
  },
  {
    id: 2,
    question: "Quels modes de paiement ?",
    answer: "Nous acceptons plusieurs modes de paiement, y compris les cartes de crédit, Mobile Money et les virements bancaires."
  },
  {
    id: 3,
    question: "Comment annuler une réservation ?",
    answer: "Pour annuler une réservation, connectez-vous à votre compte et accédez à votre tableau de bord."
  },
  {
    id: 4,
    question: "Y a-t-il des frais ?",
    answer: "Des frais peuvent s'appliquer en fonction du service choisi. Tous les frais seront clairement indiqués."
  },
  {
    id: 5,
    question: "Comment laisser un avis ?",
    answer: "Après avoir utilisé un service, vous pouvez laisser un avis dans votre tableau de bord."
  }
];

// Classes utilitaires pour les boutons principaux
const mainBlackBtn = "bg-black hover:bg-gray-900 text-white rounded-full shadow-lg font-semibold";

export default function Accueil() {
  const navigate = useNavigate();
  const formState = useForm();
  const { user } = useAuth();

  // Rotation automatique des images hero
  const heroImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Pour le modal de détails service
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const contacts = [
    {
      icon: <Mail className="w-8 h-8" stroke="black" />, title: "EMAIL", subtitle: "Contactez-nous par email", content: "info@example.com", color: "blue"
    },
    {
      icon: <Phone className="w-8 h-8" stroke="black" />, title: "TÉLÉPHONE", subtitle: "Appelez-nous au", content: "+33 1 23 45 67 89", color: "green"
    },
    {
      icon: <MapPin className="w-8 h-8" stroke="black" />, title: "BUREAU", subtitle: "456 Rue Exemple, Paris 75000, France", content: "Obtenir Directions →", color: "yellow"
    }
  ];

  // Callback pour la recherche
  const handleUltraSearch = (query, options = {}) => {
    let url = '/service-list?search=' + encodeURIComponent(query);
    if (options.position && options.position.lat && options.position.lng) {
      url += `&lat=${options.position.lat}&lng=${options.position.lng}`;
      if (options.radius) url += `&radius=${options.radius}`;
    }
    if (options.filters) {
      if (options.filters.category && options.filters.category !== 'Tous') url += `&category=${encodeURIComponent(options.filters.category)}`;
      if (options.filters.priceMax) url += `&priceMax=${options.filters.priceMax}`;
      if (options.filters.minRating) url += `&minRating=${options.filters.minRating}`;
      if (options.filters.availability && options.filters.availability !== 'Tous') url += `&availability=${encodeURIComponent(options.filters.availability)}`;
      if (options.filters.onlyVerified) url += `&onlyVerified=1`;
    }
    navigate(url);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      {/* Header Hero Section - Amélioré */}
      <section className="relative px-[5%] py-20 md:py-28 lg:py-32 mt-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto flex flex-col items-center relative z-10">
          <motion.div 
            className="mb-12 max-w-5xl text-center md:mb-18 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="mb-6 text-5xl font-bold md:mb-8 md:text-7xl lg:text-8xl tracking-tight bg-gradient-to-r from-gray-900 via-black to-blue-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ACCÉDEZ À DES SERVICES À DOMICILE FIABLES
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Découvrez notre plateforme dédiée à la simplification de votre
              quotidien. Profitez d'un accès facile à une variété de services de
              qualité, adaptés à vos besoins.
            </motion.p>
            {/* UltraSearchBar moderne */}
            <UltraSearchBar onSearch={handleUltraSearch} />
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {!user && (
                <Button 
                  className={`${mainBlackBtn} px-10 py-5 ml-4`}
                  size="xl"
                  onClick={() => navigate('/register')}
                >
                  Inscription gratuite
                  </Button>
              )}
            </motion.div>
          </motion.div>
          
          {/* Grid d'images améliorée */}
          <motion.div 
            className="w-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Ligne du haut : gauche vers droite */}
            <div className="overflow-hidden mb-4" style={{height: '180px'}}>
              <div className="flex gap-6 animate-marquee whitespace-nowrap h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="relative h-full w-[40vw] sm:w-[10rem] md:w-[13rem] flex-shrink-0">
                    <img
                      className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      src={heroImages[(i + currentImageIndex) % heroImages.length]}
                      alt={`Service image ${i+1}`}
                    />
            </div>
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={8+i} className="relative h-full w-[40vw] sm:w-[10rem] md:w-[13rem] flex-shrink-0">
                    <img
                      className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      src={heroImages[(i + currentImageIndex) % heroImages.length]}
                      alt={`Service image ${i+1}`}
                      />
                    </div>
                  ))}
                </div>
            </div>
            {/* Ligne du bas : droite vers gauche */}
            <div className="overflow-hidden" style={{height: '180px'}}>
              <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="relative h-full w-[40vw] sm:w-[10rem] md:w-[13rem] flex-shrink-0">
                    <img
                      className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      src={heroImages[(i + currentImageIndex) % heroImages.length]}
                      alt={`Service image ${i+1}`}
                      />
                    </div>
                  ))}
                {[...Array(8)].map((_, i) => (
                  <div key={8+i} className="relative h-full w-[40vw] sm:w-[10rem] md:w-[13rem] flex-shrink-0">
                    <img
                      className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      src={heroImages[(i + currentImageIndex) % heroImages.length]}
                      alt={`Service image ${i+1}`}
                    />
                </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Statistiques - Améliorée */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white px-[5%] py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl leading-[1.1] font-bold md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                LONG HEADING IS WHAT YOU SEE HERE IN THIS FEATURE SECTION
            </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="mb-8 md:mb-10 text-lg md:text-xl text-gray-300 leading-relaxed">
                Nous avons fourni des milliers de services à domicile,
                transformant la vie de nos clients. Notre engagement envers la
                qualité se reflète dans le taux de satisfaction élevé de nos
                utilisateurs.
              </p>
              <div className="grid grid-cols-1 gap-8 py-2 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <h3 className="mb-3 text-6xl font-bold md:text-7xl lg:text-8xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    80%
                  </h3>
                  <p className="text-gray-300 text-lg">Clients satisfaits de nos services de qualité.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <h3 className="mb-3 text-6xl font-bold md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    1000+
                  </h3>
                  <p className="text-gray-300 text-lg">Services rendus avec succès à travers la plateforme.</p>
                </motion.div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section À propos - Améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl leading-[1.1] font-bold md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                DÉCOUVREZ NOTRE HISTOIRE, NOS OBJECTIFS ET NOS VALEURS FONDAMENTALES.
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Nous avons pour mission de transformer l'accès aux services à
                domicile en Afrique. En mettant l'accent sur la fiabilité et
                l'autonomisation, nous aspirons à créer un impact social positif.
                Nos valeurs fondamentales, telles que le respect et le
                développement durable, guident chacune de nos actions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Services - Améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="mb-16 md:mb-20 lg:mb-24 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 font-semibold text-blue-600 md:mb-6 text-sm tracking-wide uppercase">SERVICES</p>
            <h2 className="mb-6 text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              DÉCOUVREZ NOS SERVICES À DOMICILE DE QUALITÉ
              </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Notre plateforme propose une variété de services adaptés à vos
                besoins quotidiens. Profitez d'une expérience simple et sécurisée
                pour réserver des professionnels qualifiés.
              </p>
          </motion.div>
          
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
            {servicesData.map((service, index) => (
              <motion.div 
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {service.icon}
              </div>
            </div>
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-bold md:text-2xl leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
              </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <Button 
                    className="text-blue-600 hover:text-blue-700 p-0 font-semibold"
                    variant="link"
                    onClick={() => navigate(`/service/${service.id}`)}
                  >
                    En savoir plus →
                  </Button>
            </div>
              </motion.div>
            ))}
              </div>
          
          <motion.div 
            className="mt-12 flex justify-center md:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button className={`${mainBlackBtn} rounded-full`} size="lg" onClick={() => navigate('/service-list')}>Voir tous nos services</Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section avec animations */}
      <section className="relative px-[5%] py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src="/Recording 2025-03-14 045206.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 container mx-auto">
          <motion.div 
            className="w-full max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:mb-8 md:text-5xl lg:text-6xl leading-tight">
              RÉSERVEZ VOTRE SERVICE MAINTENANT
            </h2>
            <p className="text-white text-lg md:text-xl mb-10 leading-relaxed opacity-90">
              Ne manquez pas l'occasion de bénéficier de services de qualité à
              domicile, réservez dès aujourd'hui !
            </p>
            <div className="flex flex-wrap gap-6">
              <Button 
                className={`${mainBlackBtn} px-10 py-5 border-2 border-white`}
                size="xl"
                onClick={() => navigate('/reservation')}
              >
                Réserver maintenant
              </Button>
              <Button 
                className={`${mainBlackBtn} px-10 py-5 border-2 border-white ml-4`}
                size="xl"
                onClick={() => navigate('/services')}
              >
                Découvrir plus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Comment ça marche - Améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <motion.div 
              className="mb-16 w-full max-w-5xl text-center md:mb-20 lg:mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 font-semibold text-blue-600 md:mb-6 text-sm tracking-wide uppercase">COMMENT ÇA MARCHE</p>
              <h2 className="mb-6 text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                DÉCOUVREZ COMMENT NOS SERVICES FONCTIONNENT
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Notre plateforme vous permet de réserver facilement des services à
                domicile. Il vous suffit de vous inscrire, de choisir le service
                souhaité et de finaliser votre réservation en quelques clics.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 items-start justify-center gap-8 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 mb-12">
              {stepsData.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className="flex w-full flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`mb-6 md:mb-8 p-8 rounded-full relative overflow-hidden group-hover:scale-110 transition-transform duration-300 ${
                    step.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                    step.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                    'bg-gradient-to-br from-yellow-100 to-yellow-200'
                  }`}>
                    <div className="text-4xl mb-2">{step.icon}</div>
            </div>
                  <h3 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
              </div>
            
            <motion.div 
              className="flex items-center gap-6 md:mt-8 lg:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button className={`${mainBlackBtn} rounded-full`} size="lg" onClick={() => navigate('/service-list')}>Commencer maintenant</Button>
              <Button variant="link" iconRight={<RxChevronRight />} className="text-blue-600 hover:text-blue-700 font-semibold">
                Nous contacter
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Avantages - Améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-x-16 lg:gap-x-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 font-semibold text-blue-600 md:mb-6 text-sm tracking-wide uppercase">FIABILITÉ</p>
              <h1 className="mb-6 text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                DÉCOUVREZ LES AVANTAGES DE NOTRE PLATEFORME
              </h1>
              <p className="mb-6 text-lg md:mb-8 md:text-xl text-gray-600 leading-relaxed">
                Notre plateforme garantit des services de qualité, fiables et
                accessibles. En choisissant nos services, vous soutenez également
                l'autonomisation des professionnels locaux.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Accès à des services de qualité supérieure.",
                  "Soutien à l'économie locale et aux travailleurs.",
                  "Impact social positif grâce à votre choix."
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                  </div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">{item}</span>
                  </motion.div>
                ))}
                  </div>
              
              <motion.div 
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button className={`${mainBlackBtn} rounded-full`} size="lg" onClick={() => navigate('/services')}>En savoir plus</Button>
                <Button variant="link" iconRight={<RxChevronRight />} className="text-blue-600 hover:text-blue-700 font-semibold">
                  S'inscrire gratuitement
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=500&fit=crop"
                className="relative w-full rounded-2xl object-cover aspect-[4/3] shadow-2xl hover:scale-105 transition-transform duration-500"
                alt="Avantages plateforme"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section FAQ - Améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 lg:grid-cols-[0.6fr,1fr] lg:gap-x-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              QUESTIONS FRÉQUENTES
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              Découvrez nos réponses aux questions les plus fréquentes sur nos
              services.
            </p>
            <Button variant="secondary-alt" size="lg" className="rounded-full shadow-lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Nous contacter
            </Button>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion>
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem>
                    <AccordionTrigger className="text-left text-lg font-medium text-white border-b border-gray-700 hover:bg-white/5">
                      {faq.question}
              </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {faq.answer}
              </AccordionContent>
            </AccordionItem>
                </motion.div>
              ))}
          </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Section Contact - Améliorée */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-50 to-white" id="contact">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                NOUS CONTACTER
              </h2>
              <p className="mb-10 text-lg md:text-xl text-gray-600 leading-relaxed">
                Nous sommes là pour vous aider à chaque étape de votre parcours.
              </p>
              
              <div className="space-y-8">
                {contacts.map((contact, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="mt-1 group-hover:scale-110 transition-transform duration-300">{contact.icon}</div>
                  <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">{contact.title}</h3>
                      <p className="text-gray-600 mb-1">{contact.subtitle}</p>
                      <p className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">{contact.content}</p>
                  </div>
                  </motion.div>
                ))}
                </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6" onSubmit={formState.handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold mb-3 text-gray-900">
                    Nom complet *
                  </label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Votre nom complet" 
                    value={formState.formData.name}
                    onChange={formState.handleChange('name')}
                    required
                    className="h-12 border-2 focus:border-blue-500"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-900">
                    Adresse email *
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={formState.formData.email}
                    onChange={formState.handleChange('email')}
                    required
                    className="h-12 border-2 focus:border-blue-500"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold mb-3 text-gray-900">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300"
                    placeholder="Décrivez votre demande..."
                    value={formState.formData.message}
                    onChange={formState.handleChange('message')}
                    required
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    type="submit" 
                    className={`${mainBlackBtn} w-full h-14 rounded-full font-semibold shadow-lg`} 
                    disabled={formState.isSubmitting}
                    size="lg"
                  >
                    {formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Envoi en cours...
                </div>
                    ) : (
                      "Envoyer le message"
                    )}
                </Button>
                </motion.div>
                
                {/* Status Messages */}
                <AnimatePresence>
                  {formState.submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="text-green-800 text-sm font-medium">
                        ✅ Message envoyé avec succès ! Nous vous répondrons bientôt.
                      </p>
                    </motion.div>
                  )}
                  {formState.submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-800 text-sm font-medium">
                        ❌ Erreur lors de l'envoi. Veuillez réessayer.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final - Amélioré */}
      <section className="px-[5%] py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid w-full grid-cols-1 items-center justify-between gap-8 md:grid-cols-[1fr_max-content] md:gap-x-16 lg:gap-x-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                RÉSERVEZ VOTRE SERVICE DÈS MAINTENANT
                </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Rejoignez des milliers de clients satisfaits et découvrez la différence.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-row items-center gap-4 flex-shrink-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button 
                className={`${mainBlackBtn} px-10 py-5 border-2 border-white rounded-full`}
                size="xl" 
                onClick={() => navigate('/service-list')}
              >
                Commencer
                  </Button>
            </motion.div>
              </div>
            </div>
      </section>
      <Footer />
    </div>
  );
}
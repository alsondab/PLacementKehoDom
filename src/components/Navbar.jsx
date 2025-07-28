// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { RxChevronDown } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext'; // Import du context
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Utilisation du context pour récupérer les données
  const {
    cartItems,
    favoriteItems,
    removeFromCart,
    updateQuantity,
    removeFromFavorites,
    addToCartFromFavorites,
    cartItemsCount,
    cartTotal,
    favoritesCount
  } = useCart();

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 991);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleFavorites = () => setIsFavoritesOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => setIsDropdownOpen((prev) => !prev);
  const openOnDesktopDropdownMenu = () => { if (!isMobile) setIsDropdownOpen(true); };
  const closeOnDesktopDropdownMenu = () => { if (!isMobile) setIsDropdownOpen(false); };

  // Gestion des clics à l'extérieur
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleClickOutside = (event) => {
      // Fermer le menu mobile
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      
      // Fermer le panier
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.closest('[data-cart-trigger]')
      ) {
        setIsCartOpen(false);
      }
      
      // Fermer les favoris
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target) &&
        !event.target.closest('[data-favorites-trigger]')
      ) {
        setIsFavoritesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const animateMobileMenu = isMobileMenuOpen ? 'open' : 'close';
  const animateDropdownMenu = isDropdownOpen ? 'open' : 'close';
  const animateDropdownMenuIcon = isDropdownOpen ? 'rotate' : 'initial';

  // Calculer le total des articles
  // Les valeurs viennent maintenant du context
  // const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  // const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // const favoritesCount = favoriteItems.length;

  // Supprimer un article du panier - utilise maintenant le context
  // const removeFromCart = (itemId) => {
  //   setCartItems(prev => prev.filter(item => item.id !== itemId));
  // };

  // Mettre à jour la quantité - utilise maintenant le context
  // const updateQuantity = (itemId, newQuantity) => {
  //   if (newQuantity <= 0) {
  //     removeFromCart(itemId);
  //     return;
  //   }
  //   setCartItems(prev => 
  //     prev.map(item => 
  //       item.id === itemId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  // Supprimer des favoris - utilise maintenant le context
  // const removeFromFavorites = (itemId) => {
  //   setFavoriteItems(prev => prev.filter(item => item.id !== itemId));
  // };

  // Ajouter au panier depuis les favoris - utilise maintenant le context
  // const addToCartFromFavorites = (favoriteItem) => {
  //   const existingItem = cartItems.find(item => item.id === favoriteItem.id);
  //   if (existingItem) {
  //     updateQuantity(favoriteItem.id, existingItem.quantity + 1);
  //   } else {
  //     setCartItems(prev => [...prev, { ...favoriteItem, quantity: 1 }]);
  //   }
  // };

  return (
    <>
      <section className="fixed inset-0 bottom-auto z-[999] mx-auto mt-5 flex w-full px-[5%] md:mt-6 lg:mx-[5%] lg:w-auto lg:px-0">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center overflow-visible px-8 md:min-h-18 md:px-12 bg-black/90 backdrop-blur-sm border border-gray-800 rounded-full">
          {/* Zone gauche : Logo */}
          <div className="flex items-center flex-shrink-0" style={{ minWidth: '120px' }}>
            <Link to="/" className="text-white font-bold text-xl italic">
              Logo
            </Link>
          </div>

          {/* Zone centre : Liens navigation */}
          <div className="flex-1 flex items-center justify-center gap-8">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              ACCUEIL
            </Link>
            <Link to="/services" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              SERVICES
            </Link>
            {/* Menu déroulant "Découvrir" */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors text-sm font-medium focus:outline-none"
                onMouseEnter={openOnDesktopDropdownMenu}
                onMouseLeave={closeOnDesktopDropdownMenu}
                onClick={openOnMobileDropdownMenu}
              >
                Découvrir
                <RxChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 bg-black/90 backdrop-blur-sm border border-gray-800 rounded-lg py-2 min-w-[200px] z-50"
                    onMouseEnter={openOnDesktopDropdownMenu}
                    onMouseLeave={closeOnDesktopDropdownMenu}
                  >
                    <Link to="/profil" className="block px-4 py-2 text-white hover:text-blue-400 transition-colors text-sm">Mon compte</Link>
                    <Link to="/blog" className="block px-4 py-2 text-white hover:text-blue-400 transition-colors text-sm">Blog & Conseils</Link>
                    <Link to="/devenir-pro" className="block px-4 py-2 text-white hover:text-blue-400 transition-colors text-sm">Devenir Pro</Link>
                    <Link to="/tarifs" className="block px-4 py-2 text-white hover:text-blue-400 transition-colors text-sm">Tarifs</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Zone droite : Boutons/icônes */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/service-list" className="px-4 py-2 text-white hover:text-gray-300 transition-colors text-sm font-medium border-2 border-white rounded-full" onClick={() => navigate('/service-list')}>
              Explorer
            </Link>
            {/* Favorites Icon */}
            <button 
              data-favorites-trigger
              onClick={toggleFavorites}
              className="relative p-2 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favoritesCount}
                </span>
              )}
            </button>
            {/* Cart Icon */}
            <button 
              data-cart-trigger
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
            {!user ? (
              <Link to="/register" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-sm font-medium">
                Inscription
              </Link>
            ) : (
              <button onClick={logout} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors text-sm font-medium">
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Favorites Sidebar */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
              onClick={() => setIsFavoritesOpen(false)}
            />
            
            {/* Favorites Panel */}
            <motion.div
              ref={favoritesRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-[1001] flex flex-col"
            >
              {/* Favorites Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Favoris ({favoritesCount})
                </h2>
                <button
                  onClick={() => setIsFavoritesOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Favorites Content */}
              <div className="flex-1 overflow-y-auto">
                {favoriteItems.length === 0 ? (
                  /* Empty Favorites */
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun favori pour le moment
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Ajoutez vos services préférés en cliquant sur le cœur.
                    </p>
                    <Link 
                      to="/services"
                      onClick={() => setIsFavoritesOpen(false)}
                      className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                    >
                      Découvrir nos services
                    </Link>
                  </div>
                ) : (
                  /* Favorites Items */
                  <div className="p-6 space-y-4">
                    {favoriteItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg group hover:bg-pink-100 transition-colors">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-sm font-medium text-gray-900">${item.price}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => addToCartFromFavorites(item)}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors font-medium"
                          >
                            Ajouter au panier
                          </button>
                          <button
                            onClick={() => removeFromFavorites(item.id)}
                            className="p-1.5 text-pink-400 hover:text-red-600 transition-colors self-center"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Favorites Footer */}
              {favoriteItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <button 
                    onClick={() => {
                      favoriteItems.forEach(item => addToCartFromFavorites(item));
                      setIsFavoritesOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                  >
                    Tout ajouter au panier
                  </button>
                  <button 
                    onClick={() => setIsFavoritesOpen(false)}
                    className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Continuer la navigation
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Panel */}
            <motion.div
              ref={cartRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-[1001] flex flex-col"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Panier ({cartItemsCount})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  /* Empty Cart */
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Votre panier est vide
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Parcourez nos services et ajoutez-les à votre panier.
                    </p>
                    <Link 
                      to="/services"
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Découvrir nos services
                    </Link>
                  </div>
                ) : (
                  /* Cart Items */
                  <div className="p-6 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-sm font-medium text-gray-900">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-gray-900">${cartTotal}</span>
                  </div>
                  <Link 
                    to="/payment"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                  >
                    Procéder au paiement
                  </Link>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Continuer les achats
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, Eye, Heart, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import Layout from '../components/Layout';

const articles = [
  { 
    id: 1, 
    title: "5 astuces pour un ménage efficace", 
    excerpt: "Découvrez nos conseils d'expert pour maintenir votre maison propre facilement et durablement. Des techniques professionnelles adaptées à votre quotidien.", 
    date: "Juil. 2024", 
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop", 
    tag: "Ménage",
    readTime: "5 min",
    views: 1240,
    author: "Marie Dubois",
    featured: true
  },
  { 
    id: 2, 
    title: "Comment choisir sa nounou ?", 
    excerpt: "Les critères essentiels pour une garde d'enfants en toute confiance. Guide complet pour parents soucieux de la sécurité et du bien-être de leurs enfants.", 
    date: "Juin 2024", 
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=400&fit=crop", 
    tag: "Garde d'enfants",
    readTime: "8 min",
    views: 890,
    author: "Sophie Martin",
    featured: false
  },
  { 
    id: 3, 
    title: "Coiffure à domicile : les tendances 2024", 
    excerpt: "Découvrez les styles les plus demandés cette année et comment les adapter à votre morphologie. Conseils de nos coiffeurs professionnels.", 
    date: "Mai 2024", 
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop", 
    tag: "Coiffure",
    readTime: "6 min",
    views: 2150,
    author: "Alex Durand",
    featured: true
  },
  { 
    id: 4, 
    title: "Jardinage d'automne : préparer son jardin", 
    excerpt: "Toutes les étapes pour bien préparer votre jardin avant l'hiver. Plantation, taille, protection : nos experts vous guident.", 
    date: "Avr. 2024", 
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop", 
    tag: "Jardinage",
    readTime: "10 min",
    views: 675,
    author: "Pierre Leroy",
    featured: false
  },
  { 
    id: 5, 
    title: "Bricolage sécurisé : les bonnes pratiques", 
    excerpt: "Évitez les accidents domestiques grâce à nos conseils de sécurité. Outils, équipements et techniques pour bricoler en toute sérénité.", 
    date: "Mar. 2024", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", 
    tag: "Bricolage",
    readTime: "7 min",
    views: 1450,
    author: "Thomas Bernard",
    featured: false
  },
  { 
    id: 6, 
    title: "Organisation optimale de votre garde-robe", 
    excerpt: "Méthodes professionnelles pour organiser et optimiser l'espace de vos vêtements. Astuces de nos experts en organisation.", 
    date: "Fév. 2024", 
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop", 
    tag: "Organisation",
    readTime: "5 min",
    views: 980,
    author: "Julie Moreau",
    featured: false
  }
];

const categories = ['Tous', 'Ménage', 'Garde d\'enfants', 'Coiffure', 'Jardinage', 'Bricolage', 'Organisation'];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [favorites, setFavorites] = useState([]);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || article.tag === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const toggleFavorite = (articleId) => {
    setFavorites(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
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
              Blog & Conseils
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos guides d'experts, astuces pratiques et conseils professionnels pour optimiser vos services à domicile.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-[5%] py-20 max-w-7xl">
        {/* Search and Filters */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && searchTerm === "" && selectedCategory === "Tous" && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Articles à la une</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article 
                  key={article.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      À la une
                    </div>
                    <motion.button
                      onClick={() => toggleFavorite(article.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
                        favorites.includes(article.id)
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-4 h-4" fill={favorites.includes(article.id) ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        article.tag === 'Ménage' ? 'bg-blue-100 text-blue-700' :
                        article.tag === 'Garde d\'enfants' ? 'bg-green-100 text-green-700' :
                        article.tag === 'Coiffure' ? 'bg-purple-100 text-purple-700' :
                        article.tag === 'Jardinage' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {article.tag}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.date}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {article.views}
                        </span>
                      </div>
                      
                      <motion.button 
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Articles */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {searchTerm || selectedCategory !== "Tous" ? "Résultats de recherche" : "Tous les articles"}
            </h2>
            <span className="text-gray-600">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm || selectedCategory !== "Tous" ? filteredArticles : regularArticles).map((article, index) => (
                <motion.article 
                  key={article.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <motion.button
                      onClick={() => toggleFavorite(article.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
                        favorites.includes(article.id)
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-4 h-4" fill={favorites.includes(article.id) ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        article.tag === 'Ménage' ? 'bg-blue-100 text-blue-700' :
                        article.tag === 'Garde d\'enfants' ? 'bg-green-100 text-green-700' :
                        article.tag === 'Coiffure' ? 'bg-purple-100 text-purple-700' :
                        article.tag === 'Jardinage' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {article.tag}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.date}
                      </span>
                    </div>
                    
                    <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {article.excerpt.length > 100 ? article.excerpt.substring(0, 100) + '...' : article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </span>
                      </div>
                      
                      <motion.button 
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center gap-1"
                        whileHover={{ x: 3 }}
                      >
                        Lire
                        <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
              <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche.</p>
              <motion.button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Tous");
                }}
                className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Réinitialiser les filtres
              </motion.button>
            </motion.div>
          )}
        </motion.section>

        {/* Newsletter Section */}
        <motion.section 
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Restez informé de nos derniers conseils</h3>
          <p className="text-blue-100 mb-6">Recevez nos meilleurs articles et astuces directement dans votre boîte mail.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button 
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              S'abonner
            </motion.button>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
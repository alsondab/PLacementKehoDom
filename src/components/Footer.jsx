import React, { useState } from 'react';
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoYoutube } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const [email, setEmail] = useState("");
  
  const handleSetEmail = (e) => setEmail(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* Logo */}
          <div>
            <div className="text-white font-bold text-xl italic mb-6">
              KehoDom
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Services à domicile de qualité pour simplifier votre vie quotidienne.
            </p>
          </div>

          {/* Informations Utiles */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">
              Informations Utiles
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/devenir-pro" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Devenir Pro
                </a>
              </li>
              <li>
                <a href="/tarifs" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Blog & Conseils
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">
              Newsletter
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Restez informé de nos nouveautés et offres spéciales.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={handleSetEmail}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors text-sm"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 mb-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright and Legal Links */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <p className="text-gray-400 text-sm">
              © 2024 KehoDom. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <a href="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors text-sm underline">
                Politique de confidentialité
              </a>
              <a href="/cgu" className="text-gray-400 hover:text-white transition-colors text-sm underline">
                CGU
              </a>
              <a href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors text-sm underline">
                Mentions légales
              </a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <BiLogoFacebookCircle className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <BiLogoInstagram className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <BiLogoLinkedinSquare className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <BiLogoYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
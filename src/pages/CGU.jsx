import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FileText, Clock, Shield, Scale, AlertCircle, 
  CheckCircle, Eye, Download, Search,
  ChevronRight, ChevronDown, Info, Mail, Phone
} from 'lucide-react';
import Layout from '../components/Layout';

export default function CGU() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('article1');

  const lastUpdate = "15 juillet 2024";
  const effectiveDate = "1er août 2024";

  const tableOfContents = [
    { id: 'article1', title: 'Article 1 - Objet et champ d\'application', icon: <FileText className="w-4 h-4" /> },
    { id: 'article2', title: 'Article 2 - Définitions', icon: <Info className="w-4 h-4" /> },
    { id: 'article3', title: 'Article 3 - Acceptation des conditions', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'article4', title: 'Article 4 - Inscription et compte utilisateur', icon: <Shield className="w-4 h-4" /> },
    { id: 'article5', title: 'Article 5 - Services proposés', icon: <FileText className="w-4 h-4" /> },
    { id: 'article6', title: 'Article 6 - Réservation et paiement', icon: <Scale className="w-4 h-4" /> },
    { id: 'article7', title: 'Article 7 - Responsabilités', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'article8', title: 'Article 8 - Protection des données', icon: <Shield className="w-4 h-4" /> },
    { id: 'article9', title: 'Article 9 - Propriété intellectuelle', icon: <Eye className="w-4 h-4" /> },
    { id: 'article10', title: 'Article 10 - Résiliation', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'article11', title: 'Article 11 - Droit applicable', icon: <Scale className="w-4 h-4" /> },
    { id: 'article12', title: 'Article 12 - Contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const cguSections = [
    {
      id: 'article1',
      title: "Article 1 - Objet et champ d'application",
      content: (
        <div>
          <p className="mb-4">
            Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir les modalités et conditions d'utilisation des services proposés sur le site internet accessible à l'adresse [URL du site] (ci-après le "Site") et de l'application mobile (ci-après l'"Application").
          </p>
          
          <p className="mb-4">Ces services permettent la mise en relation entre :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Des particuliers souhaitant bénéficier de services à domicile (ci-après les "Clients")</li>
            <li>Des professionnels proposant ces services (ci-après les "Prestataires")</li>
          </ul>

          <p className="mb-4">
            La société [Nom de la société], société par actions simplifiée au capital de [montant] euros, immatriculée au RCS de [ville] sous le numéro [numéro], dont le siège social est situé [adresse], exploite une plateforme numérique de mise en relation.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">1.1 Champ d'application</h3>
          <p className="mb-4">Les présentes CGU s'appliquent à tous les utilisateurs du Site et de l'Application, qu'ils soient Clients ou Prestataires.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">1.2 Services couverts</h3>
          <p className="mb-4">Les services concernés incluent notamment :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Services de ménage et nettoyage</li>
            <li>Services de coiffure et esthétique à domicile</li>
            <li>Services de garde d'enfants</li>
            <li>Services de jardinage</li>
            <li>Services de bricolage et réparations</li>
            <li>Autres services du quotidien</li>
          </ul>
        </div>
      )
    },
    {
      id: 'article2',
      title: "Article 2 - Définitions",
      content: (
        <div>
          <p className="mb-4">Pour l'application des présentes CGU, les termes ci-dessous ont les significations suivantes :</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <strong className="text-gray-900">"Plateforme" :</strong>
                <span className="text-gray-700 ml-2">désigne l'ensemble des services numériques proposés par la société, accessibles via le Site internet et l'Application mobile.</span>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <strong className="text-gray-900">"Utilisateur" :</strong>
                <span className="text-gray-700 ml-2">désigne toute personne physique ou morale qui accède et utilise la Plateforme.</span>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <strong className="text-gray-900">"Client" :</strong>
                <span className="text-gray-700 ml-2">désigne tout Utilisateur particulier qui recherche et/ou réserve un service via la Plateforme.</span>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <strong className="text-gray-900">"Prestataire" :</strong>
                <span className="text-gray-700 ml-2">désigne tout Utilisateur professionnel qui propose ses services via la Plateforme.</span>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <strong className="text-gray-900">"Service" :</strong>
                <span className="text-gray-700 ml-2">désigne toute prestation proposée par un Prestataire et réservée par un Client via la Plateforme.</span>
              </div>
              
              <div>
                <strong className="text-gray-900">"Compte" :</strong>
                <span className="text-gray-700 ml-2">désigne l'espace personnel créé par l'Utilisateur sur la Plateforme.</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">2.1 Terminologie légale</h3>
          <p className="mb-4">Toute référence au singulier inclut le pluriel et vice versa. Les titres et sous-titres sont utilisés à des fins de commodité uniquement et ne limitent pas la portée des articles.</p>
        </div>
      )
    },
    {
      id: 'article3',
      title: "Article 3 - Acceptation des conditions",
      content: (
        <div>
          <p className="mb-4">L'utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU par l'Utilisateur.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">3.1 Modalités d'acceptation</h3>
          <p className="mb-4">L'acceptation se matérialise par :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>La création d'un Compte sur la Plateforme</li>
            <li>La première utilisation des services</li>
            <li>Le clic sur "J'accepte les CGU" lors de l'inscription</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3.2 Capacité juridique</h3>
          <p className="mb-4">L'Utilisateur déclare et garantit :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Être âgé de plus de 18 ans ou être émancipé</li>
            <li>Avoir la capacité juridique pour contracter</li>
            <li>Ne pas être sous tutelle ou curatelle</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3.3 Modifications des CGU</h3>
          <p className="mb-4">La société se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur la Plateforme. L'Utilisateur sera informé de toute modification substantielle par email ou notification.</p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
            <p className="text-amber-800">
              <strong>Important :</strong> La poursuite de l'utilisation de la Plateforme après modification des CGU vaut acceptation des nouvelles conditions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'article4',
      title: "Article 4 - Inscription et compte utilisateur",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">4.1 Processus d'inscription</h3>
          <p className="mb-4">Pour accéder aux services de la Plateforme, l'Utilisateur doit créer un Compte en fournissant :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nom et prénom</li>
            <li>Adresse email valide</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale</li>
            <li>Mot de passe sécurisé</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">4.2 Vérification d'identité</h3>
          <p className="mb-4">La société se réserve le droit de demander des justificatifs d'identité pour :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Vérifier l'exactitude des informations</li>
            <li>Lutter contre la fraude</li>
            <li>Respecter les obligations légales</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">4.3 Obligations de l'Utilisateur</h3>
          <p className="mb-4">L'Utilisateur s'engage à :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fournir des informations exactes et à jour</li>
            <li>Maintenir la confidentialité de ses identifiants</li>
            <li>Signaler immédiatement tout usage non autorisé de son Compte</li>
            <li>Ne pas créer plusieurs Comptes</li>
            <li>Ne pas céder ou transférer son Compte</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">4.4 Responsabilité du Compte</h3>
          <p className="mb-4">L'Utilisateur est seul responsable de l'utilisation de son Compte et des conséquences de cette utilisation. Toute action effectuée depuis un Compte est présumée émaner de son titulaire.</p>
        </div>
      )
    },
    {
      id: 'article5',
      title: "Article 5 - Services proposés",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">5.1 Nature des services</h3>
          <p className="mb-4">La Plateforme propose un service de mise en relation entre Clients et Prestataires. Elle ne fournit pas directement les services mais facilite leur réservation et leur paiement.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">5.2 Catalogue de services</h3>
          <p className="mb-4">Les services disponibles incluent notamment :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Ménage :</strong> Nettoyage complet, repassage, rangement</li>
            <li><strong>Beauté :</strong> Coiffure, soins esthétiques, manucure</li>
            <li><strong>Garde d'enfants :</strong> Baby-sitting, soutien scolaire</li>
            <li><strong>Jardinage :</strong> Entretien espaces verts, plantation</li>
            <li><strong>Bricolage :</strong> Petites réparations, montage mobilier</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">5.3 Disponibilité des services</h3>
          <p className="mb-4">La disponibilité des services dépend :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>De la zone géographique</li>
            <li>De la disponibilité des Prestataires</li>
            <li>Des créneaux horaires</li>
            <li>De la nature du service demandé</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">5.4 Tarification</h3>
          <p className="mb-4">Les tarifs sont affichés TTC et incluent :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Le prix du service</li>
            <li>Les frais de plateforme</li>
            <li>Les taxes applicables</li>
          </ul>
          <p className="mb-4">Des réductions peuvent s'appliquer pour les services récurrents.</p>
        </div>
      )
    },
    {
      id: 'article6',
      title: "Article 6 - Réservation et paiement",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">6.1 Processus de réservation</h3>
          <p className="mb-4">La réservation s'effectue selon les étapes suivantes :</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Sélection du service et des options</li>
            <li>Choix de la date et de l'heure</li>
            <li>Confirmation des informations personnelles</li>
            <li>Validation du panier et paiement</li>
            <li>Confirmation de réservation par email</li>
          </ol>

          <h3 className="text-xl font-bold mt-6 mb-3">6.2 Confirmation de réservation</h3>
          <p className="mb-4">La réservation n'est définitive qu'après :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Validation du paiement</li>
            <li>Envoi de l'email de confirmation</li>
            <li>Attribution d'un Prestataire disponible</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">6.3 Modalités de paiement</h3>
          <p className="mb-4">Le paiement s'effectue exclusivement en ligne par :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Carte bancaire (Visa, Mastercard, CB)</li>
            <li>Portefeuilles électroniques (PayPal, Apple Pay)</li>
            <li>Virements bancaires (sous conditions)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">6.4 Politique d'annulation</h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <ul className="list-none space-y-2">
              <li><strong className="text-blue-800">Annulation gratuite :</strong> Jusqu'à 24h avant l'intervention</li>
              <li><strong className="text-orange-600">Annulation tardive :</strong> Entre 24h et 2h avant = 50% du montant</li>
              <li><strong className="text-red-600">Annulation de dernière minute :</strong> Moins de 2h avant = 100% du montant</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'article7',
      title: "Article 7 - Responsabilités",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">7.1 Responsabilité de la Plateforme</h3>
          <p className="mb-4">La société s'engage à :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fournir une plateforme fonctionnelle et sécurisée</li>
            <li>Vérifier les qualifications des Prestataires</li>
            <li>Traiter les réclamations dans les meilleurs délais</li>
            <li>Protéger les données personnelles</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">7.2 Limitations de responsabilité</h3>
          <p className="mb-4">La société ne peut être tenue responsable :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>De la qualité des services fournis par les Prestataires</li>
            <li>Des dommages causés par les Prestataires</li>
            <li>Des retards ou absences des Prestataires</li>
            <li>Des pannes techniques temporaires</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">7.3 Assurances</h3>
          <p className="mb-4">Tous les Prestataires disposent d'une assurance responsabilité civile professionnelle. En cas de dommage, le Client peut faire jouer cette assurance via la Plateforme.</p>
        </div>
      )
    },
    {
      id: 'article8',
      title: "Article 8 - Protection des données",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">8.1 Collecte des données</h3>
          <p className="mb-4">La société collecte les données suivantes :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Données d'identification :</strong> nom, prénom, email, téléphone</li>
            <li><strong>Données de localisation :</strong> adresse, code postal</li>
            <li><strong>Données de paiement :</strong> informations bancaires chiffrées</li>
            <li><strong>Données d'usage :</strong> historique des commandes, préférences</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">8.2 Droits des utilisateurs</h3>
          <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Droit d'accès :</strong> consultation de vos données</li>
            <li><strong>Droit de rectification :</strong> correction des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> récupération de vos données</li>
            <li><strong>Droit d'opposition :</strong> refus du traitement pour certaines finalités</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">8.3 Conservation des données</h3>
          <p className="mb-4">Les données sont conservées :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Comptes actifs :</strong> pendant toute la durée d'utilisation</li>
            <li><strong>Comptes inactifs :</strong> 3 ans après la dernière connexion</li>
            <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 my-4">
            <p className="text-green-800">
              <strong>Contact DPO :</strong> Pour exercer vos droits, contactez notre délégué à la protection des données : <strong>dpo@domaine.com</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'article9',
      title: "Article 9 - Propriété intellectuelle",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">9.1 Droits de la société</h3>
          <p className="mb-4">Tous les éléments de la Plateforme sont protégés par les droits de propriété intellectuelle :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Marques et logos</li>
            <li>Contenus textuels et visuels</li>
            <li>Architecture et design</li>
            <li>Codes sources et algorithmes</li>
            <li>Base de données</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">9.2 Restrictions d'usage</h3>
          <p className="mb-4">Il est strictement interdit de :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Reproduire ou copier les contenus</li>
            <li>Modifier ou adapter la Plateforme</li>
            <li>Créer des œuvres dérivées</li>
            <li>Utiliser les contenus à des fins commerciales</li>
            <li>Procéder à de l'ingénierie inverse</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">9.3 Contenus utilisateurs</h3>
          <p className="mb-4">En publiant des contenus (avis, photos, commentaires), l'Utilisateur :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Conserve ses droits de propriété</li>
            <li>Accorde une licence d'usage à la société</li>
            <li>Garantit la licéité de ses contenus</li>
            <li>Autorise leur modération</li>
          </ul>
        </div>
      )
    },
    {
      id: 'article10',
      title: "Article 10 - Résiliation",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">10.1 Résiliation par l'Utilisateur</h3>
          <p className="mb-4">L'Utilisateur peut résilier son Compte à tout moment :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Via les paramètres de son Compte</li>
            <li>En contactant le service client</li>
            <li>Par courrier recommandé</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">10.2 Résiliation par la société</h3>
          <p className="mb-4">La société peut résilier un Compte en cas de :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violation des présentes CGU</li>
            <li>Comportement frauduleux</li>
            <li>Impayés répétés</li>
            <li>Inactivité prolongée (plus de 2 ans)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">10.3 Effets de la résiliation</h3>
          <p className="mb-4">La résiliation entraîne :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Suppression de l'accès à la Plateforme</li>
            <li>Annulation des réservations futures</li>
            <li>Conservation des données de facturation</li>
            <li>Suppression des autres données personnelles</li>
          </ul>
        </div>
      )
    },
    {
      id: 'article11',
      title: "Article 11 - Droit applicable et juridictions",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">11.1 Droit applicable</h3>
          <p className="mb-4">Les présentes CGU sont soumises au droit français, à l'exclusion de toute autre législation.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">11.2 Résolution amiable des litiges</h3>
          <p className="mb-4">En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Médiation interne :</strong> service client (48h)</li>
            <li><strong>Médiation externe :</strong> médiateur de la consommation</li>
            <li><strong>Délai :</strong> 60 jours maximum</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">11.3 Médiation de la consommation</h3>
          <p className="mb-4">Conformément à l'article L. 612-1 du Code de la consommation, le Client a le droit de recourir gratuitement au service de médiation :</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <strong>Médiateur :</strong> Association des Médiateurs Européens<br/>
            <strong>Site web :</strong> www.mediateur-consommation-ame.com<br/>
            <strong>Adresse :</strong> 15 avenue de la République, 75011 Paris
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">11.4 Juridiction compétente</h3>
          <p className="mb-4">À défaut de résolution amiable, les tribunaux français sont seuls compétents :</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Pour les Clients particuliers :</strong> tribunal du domicile du Client ou du siège social</li>
            <li><strong>Pour les Prestataires professionnels :</strong> tribunal de commerce de Paris</li>
          </ul>
        </div>
      )
    },
    {
      id: 'article12',
      title: "Article 12 - Contact et informations",
      content: (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3">12.1 Informations légales</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-4 font-mono text-sm">
            <strong>Raison sociale :</strong> Services Domicile SAS<br/>
            <strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)<br/>
            <strong>Capital social :</strong> 100 000 euros<br/>
            <strong>RCS :</strong> Paris 123 456 789<br/>
            <strong>SIRET :</strong> 123 456 789 00012<br/>
            <strong>TVA :</strong> FR12345678901<br/>
            <strong>Siège social :</strong> 123 Avenue des Services, 75001 Paris
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">12.2 Contact service client</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-blue-800">Email :</strong> support@services-domicile.com<br/>
                <em className="text-blue-600 text-sm">Réponse sous 24h maximum</em>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-green-800">Téléphone :</strong> 01 23 45 67 89<br/>
                <em className="text-green-600 text-sm">Du lundi au vendredi : 9h-18h<br/>Samedi : 9h-13h</em>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <Info className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-purple-800">Chat en direct :</strong> Disponible sur la Plateforme<br/>
                <em className="text-purple-600 text-sm">7j/7 de 8h à 20h</em>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
              <Mail className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-gray-800">Courrier :</strong><br/>
                Service Client<br/>
                Services Domicile SAS<br/>
                123 Avenue des Services<br/>
                75001 Paris
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">12.3 Autres contacts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <strong className="text-red-800">Contact juridique :</strong><br/>
              <span className="text-red-700">legal@services-domicile.com</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <strong className="text-blue-800">DPO (Protection des données) :</strong><br/>
              <span className="text-blue-700">dpo@services-domicile.com</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">12.4 Hébergement</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
            <strong>Hébergeur :</strong> OVH SAS<br/>
            <strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix<br/>
            <strong>Téléphone :</strong> 09 72 10 10 07
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">12.5 Directeur de publication</h3>
          <p className="mb-4"><strong>Directeur de publication :</strong> Jean Dupont, en qualité de Président</p>
        </div>
      )
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSections = cguSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.props.children.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Observer pour mettre à jour la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    cguSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-[5%] py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold md:text-5xl mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Découvrez les conditions d'utilisation de notre plateforme de services à domicile. 
                Document mis à jour le {lastUpdate} et effectif à partir du {effectiveDate}.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Dernière mise à jour : {lastUpdate}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <Scale className="w-5 h-5 text-purple-400" />
                  <span>Droit français applicable</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-4 h-4" />
                  Imprimer
                </motion.button>
                
                <motion.button 
                  onClick={() => {
                    const element = document.createElement('a');
                    const content = document.documentElement.outerHTML;
                    const blob = new Blob([content], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    element.href = url;
                    element.download = 'CGU-Services-Domicile.html';
                    element.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className="container mx-auto px-[5%] py-20 max-w-7xl">
        {/* Search and Navigation */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AnimatePresence>
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="sticky top-8">
                {/* Search */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Rechercher
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher dans les CGU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Sommaire
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {item.icon}
                        <span className="text-sm">{item.title}</span>
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence>
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Important Notice */}
              <motion.div 
                className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-amber-800 mb-2">Information importante</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      En utilisant notre plateforme, vous acceptez automatiquement ces conditions générales d'utilisation. 
                      Nous vous recommandons de les lire attentivement et de les conserver. 
                      Ces conditions peuvent être modifiées ; vous serez notifié de tout changement important.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CGU Content */}
              <div className="space-y-8">
                {(searchTerm ? filteredSections : cguSections).map((section, index) => (
                  <motion.article
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        {section.title}
                      </h2>
                      
                      <div className="text-gray-700 leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* No Results */}
              {searchTerm && filteredSections.length === 0 && (
                <motion.div 
                  className="text-center py-20 bg-white rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                  <p className="text-gray-600 mb-6">
                    Aucune section ne correspond à votre recherche "{searchTerm}".
                  </p>
                  <motion.button 
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Effacer la recherche
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Help Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour comprendre nos CGU ?</h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Notre équipe juridique et notre service client sont à votre disposition pour répondre 
                à toutes vos questions concernant nos conditions d'utilisation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl"
                whileHover={{ y: -5 }}
              >
                <Mail className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-blue-100 text-sm mb-4">Questions générales</p>
                <button className="text-white hover:text-blue-200 font-medium">
                  support@services-domicile.com
                </button>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl"
                whileHover={{ y: -5 }}
              >
                <Scale className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Juridique</h3>
                <p className="text-blue-100 text-sm mb-4">Questions légales</p>
                <button className="text-white hover:text-blue-200 font-medium">
                  legal@services-domicile.com
                </button>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl"
                whileHover={{ y: -5 }}
              >
                <Phone className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Téléphone</h3>
                <p className="text-blue-100 text-sm mb-4">Support immédiat</p>
                <button className="text-white hover:text-blue-200 font-medium">
                  01 23 45 67 89
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
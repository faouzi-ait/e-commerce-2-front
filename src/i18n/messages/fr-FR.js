import { LOCALES } from '../constants';

export default {
  [LOCALES.FRENCH]: {
    greeting: 'bonjour',
    home: 'page principal',
    login: 'Quel est votre nom d\' utilisateur',
    username: 'Votre Nom',
    surname: 'Nom de Famille',
    age: 'Date de Naissance (optionel)',
    picture: 'Choisir votre image (Optionnel)',
    email: 'Email',
    password: 'Mot de Passe',
    loginToken: "Nouveau code d'activation",
    signIn: 'Connexion',
    signingIn: 'Accès en cour...',
    register: 'Crée un compte',
    registerTitle: 'Crée votre compte',
    registering: 'Création en cour...',
    registrationSucessful:
      'Veuillez consulter votre email pour activer votre compte',
    resendTokenMsg: 'Activer votre compte avec le lien envoyé par email',
    resendTokenLabel: 'Envoyer le Token',
    returnToLogin: 'Déjà membre? Accédé à votre compte ici.',

    step: 'Etapes',
    step1: 'Adresse de Facturation',
    step2: 'Adresse de Livraison',
    step3: 'Confirmation & Paiement',

    OrderPageTitle: 'Détail de votre commande',
    BillingLabel: 'Adresse de Facturation',
    DeliveryLabel: 'Adresse de Livraison',
    backToStep1: "Retour à l'adresse de facturation",
    backToStep2: "Retour à l'adresse de livraison",

    ProductName: 'Nom du Produit',
    Quantity: 'Quantité',
    Category: 'Catégorie',
    Price: 'Prix',
    Total: 'Total',

    confirmation:
      'Confirmer votre adresse de livraison et de facturation pour finalizer votre achat',

    address: 'Adresse *',
    city: 'Ville *',
    province: 'Etat ou Province *',
    country: 'Pays *',
    postcode: 'Code Postale *',
    useCurrentDetails: 'Utiliser vos information éxistante?',
    billingPhone: 'Numéro de Téléphone *',
    deliveryPhone: 'Numéro de Téléphone *',
    next: 'Suivant',
    previous: 'Précédent',
    order: 'Commande',
    backToCart: 'Retour au Panier',
    copyBillingAddress:
      "Votre adresse de livraison est-elle la même que l'adresse de facturation?",

    nameError: 'Votre nom est obligatoire',
    surnameError: 'Votre prénom est obligatoire',
    emailError: 'Votre adresse email est obligatoire',
    emailFormatError: 'Vérifier le format de votre email',
    passwordError: 'Votre mot de passe est obligatoire',
    dobError: 'Votre date de naissance est obligatoire',
    yourPics: 'Votre Photo',

    addressError: 'Votre adresse is required',
    cityError: 'Votre ville est obligatoire',
    stateError: 'Votre région est obligatoire',
    countryError: 'Votre pays est obligatoire',
    postcodeError: 'Votre code postal est obligatoire',
    phoneError: 'Votre numéro de téléphone est obligatoire',

    orderNumber: 'Votre numéro de commande: ',
    confirmationTitle: 'Votre commande à été bien reçu',
    confirmMessage: 'Merci pour votre achat',
    confirmEmailMessage: 'Un courriel de confirmation vous sera envoyé à ',
  },
};

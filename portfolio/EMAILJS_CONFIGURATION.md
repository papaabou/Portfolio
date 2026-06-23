CONFIGURATION EMAILJS - GUIDE D'INTÉGRATION
=============================================

Ce document explique comment configurer EmailJS pour que le formulaire de contact fonctionne correctement.

ÉTAPE 1 : CRÉATION D'UN COMPTE EMAILJS
========================================

1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up" en haut à droite
3. Créez un compte avec votre email
4. Vérifiez votre email et confirmez votre inscription
5. Connectez-vous à votre tableau de bord EmailJS

ÉTAPE 2 : CONFIGURATION DU SERVICE D'EMAIL
===========================================

1. Dans le dashboard EmailJS, cliquez sur "Email Services" (ou "Add Service")
2. Sélectionnez le service d'email que vous souhaitez utiliser:
   - Gmail
   - Outlook
   - Yahoo
   - Votre propre serveur SMTP
   - etc.

Pour Gmail (recommandé pour débuter):
- Cliquez sur "Gmail"
- Suivez les instructions pour autoriser EmailJS
- Cliquez sur "Connect Account"
- Acceptez les permissions demandées

3. Donnez un nom à ce service (ex: "Gmail Portfolio")
4. Notez le SERVICE_ID (ressemblera à "service_xxxxx...")

ÉTAPE 3 : CRÉATION D'UN TEMPLATE D'EMAIL
==========================================

1. Cliquez sur "Email Templates" dans le menu
2. Cliquez sur "Create New Template"
3. Remplissez les informations suivantes:

Template Name: "Contact Form Portfolio"
From Name: "Papa Abou MBAYE Portfolio"
From Email: {{email}} (variable du formulaire)
To Email: votre.email@gmail.com (remplacez par votre email)
Subject: "Nouveau message de {{firstName}} {{lastName}}"

4. Dans le champ du corps du message (Body), placez ce template:

---
Nouveau message de contact:

Nom: {{firstName}} {{lastName}}
Email: {{email}}
Sujet: {{subject}}

Message:
{{message}}

---

5. Cliquez sur "Save"
6. Notez le TEMPLATE_ID (ressemblera à "template_xxxxx...")

ÉTAPE 4 : RÉCUPÉRATION DE LA CLÉ PUBLIQUE
==========================================

1. Dans le dashboard EmailJS, cliquez sur "Account" en haut à gauche
2. Allez dans l'onglet "API Keys"
3. Copiez la clé "Public Key" (ressemblera à "YOUR_PUBLIC_KEY...")
4. Gardez cette clé confidentielle

ÉTAPE 5 : CONFIGURATION DANS LE FICHIER HTML
==============================================

Ouvrez le fichier index.html et trouvez cette section (près du début du <script>):

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Remplacez les valeurs par vos paramètres:

Exemple:
```javascript
const EMAILJS_PUBLIC_KEY = 'abcdef123456xyz789';
const EMAILJS_SERVICE_ID = 'service_1a2b3c4d5e6f7g8h';
const EMAILJS_TEMPLATE_ID = 'template_9i0j1k2l3m4n5o6p';
```

ÉTAPE 6 : TEST DU FORMULAIRE
=============================

1. Ouvrez votre portfolio en local: http://localhost:8000 (ou via un serveur local)
2. Accédez à la section "Contact"
3. Remplissez le formulaire:
   - Prénom: Test
   - Nom: User
   - Email: votre.email@test.com
   - Sujet: Test formulaire
   - Message: Ceci est un message de test du formulaire de contact

4. Cliquez sur "Envoyer"
5. Si tout fonctionne, vous verrez un message de succès vert
6. Vérifiez votre email pour recevoir le message

VARIABLES DISPONIBLES DANS LE TEMPLATE
======================================

Les variables suivantes sont disponibles dans votre template EmailJS:
- {{firstName}} : Prénom saisi dans le formulaire
- {{lastName}} : Nom saisi dans le formulaire
- {{email}} : Email saisi dans le formulaire
- {{subject}} : Sujet saisi dans le formulaire
- {{message}} : Message saisi dans le formulaire

DÉPANNAGE
=========

1. Message d'erreur "Invalid service ID":
   → Vérifiez que votre SERVICE_ID est correct
   → Assurez-vous que le service est activé dans EmailJS

2. Message d'erreur "Invalid template ID":
   → Vérifiez que votre TEMPLATE_ID est correct
   → Assurez-vous que le template est sauvegardé et activé

3. Les emails ne sont pas reçus:
   → Vérifiez que le service d'email (Gmail, etc.) est bien connecté
   → Vérifiez l'adresse email cible (To Email) dans le template
   → Consultez les logs d'EmailJS dans le dashboard

4. Le bouton reste désactivé après l'envoi:
   → Vérifiez la console du navigateur (F12) pour les erreurs
   → Vérifiez que les trois variables (PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID) sont correctes

SÉCURITÉ
========

Attention: La clé publique est visible dans le code frontend. C'est normal, car les clés publiques
sont destinées à être exposées. Cependant:

1. NE partagez JAMAIS votre SERVICE_ID ou TEMPLATE_ID en public
2. Limitez les appels API gratuits d'EmailJS (200/mois)
3. Pour la production, envisagez un service payant ou un backend sécurisé

DÉPLOIEMENT EN PRODUCTION
==========================

1. Assurez-vous que votre domaine est autorisé dans EmailJS:
   - Account → Access Control → ajouter votre domaine

2. Testez complètement avant de déployer

3. Surveillez les logs EmailJS pour détecter les problèmes

4. Envisagez de mettre en place des limites de débit (rate limiting)

RESSOURCES
==========

Documentation EmailJS: https://www.emailjs.com/docs/
Tutoriels: https://www.emailjs.com/docs/examples/
Support: https://www.emailjs.com/docs/faq/

Bonne configuration!

# 🛠️ Guide de Configuration - Gestion UE Frontend

## ✅ Étapes Complétées

Voici ce qui a été intégré dans le projet Angular :

### 1. **Services Angular** ✅
   - `module.service.ts` : Service CRUD pour les modules
   - `ue.service.ts` : Service CRUD pour les unités d'enseignement
   - Interfaces TypeScript correspondantes

### 2. **Composants** ✅
   - `ModuleListComponent` : Affichage de la liste des modules
   - `ModuleFormComponent` : Formulaire pour ajouter/éditer un module
   - `UeListComponent` : Affichage de la liste des UE
   - `UeFormComponent` : Formulaire pour ajouter/éditer une UE
   - Tous configurés comme **standalone components**

### 3. **Routage** ✅
   - Routes configurées dans `app.routes.ts`
   - Redirections automatiques vers `/modules` par défaut

### 4. **Configuration HTTP** ✅
   - `HttpClientModule` ajouté dans `app.config.ts`
   - XSRF déjà configuré

### 5. **Proxy API** ✅
   - `proxy.conf.json` créé pour rediriger `/api/*` vers le backend
   - `angular.json` mis à jour pour utiliser le proxy

### 6. **Navigation** ✅
   - Barre de navigation avec Bootstrap 5
   - Liens vers les pages Modules et Unités d'Enseignement

### 7. **Styles** ✅
   - Bootstrap 5 intégré
   - Styles personnalisés pour les composants

---

## 🚀 Pour Démarrer

### Étape 1 : Accéder au dossier du projet
```powershell
cd C:\Users\dalim\SOA-Training\Gestion_UE_Frontend
```

### Étape 2 : Installer les dépendances
```powershell
npm install
```

### Étape 3 : ⚠️ IMPORTANT - Démarrer le Backend REST

**Le backend REST doit être en cours d'exécution avant le frontend !**

Ouvrez une nouvelle fenêtre PowerShell et allez dans le dossier du backend :
```powershell
cd C:\Users\dalim\SOA-Training\Gestion_UE_Etudiant
mvn clean install
mvn tomcat7:run
```

Le backend sera disponible à : `http://localhost:8080/Gestion_UE_VF-1.0-SNAPSHOT`

### Étape 4 : Démarrer le serveur de développement Angular

Dans une autre fenêtre PowerShell :
```powershell
npm start
```

L'application sera accessible à : **http://localhost:4200**

---

## 🔗 Communication Frontend-Backend

Le frontend envoie les requêtes à `/api/*` qui sont redirigées par le proxy vers :
```
http://localhost:8080/Gestion_UE_VF-1.0-SNAPSHOT/api/*
```

### Endpoints disponibles :

**Modules :**
- `GET /api/module/list` - Récupérer tous les modules
- `POST /api/module/add` - Ajouter un module
- `PUT /api/module/list/update/{matricule}` - Mettre à jour
- `DELETE /api/module/list/{matricule}` - Supprimer

**Unités d'Enseignement :**
- `GET /api/ue/list` - Récupérer toutes les UE
- `POST /api/ue/add` - Ajouter une UE
- `PUT /api/ue/list/update/{code}` - Mettre à jour
- `DELETE /api/ue/list/{code}` - Supprimer

---

## 📁 Structure du Projet

```
Gestion_UE_Frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── module-list/
│   │   │   ├── module-form/
│   │   │   ├── ue-list/
│   │   │   └── ue-form/
│   │   ├── services/
│   │   │   ├── module.service.ts
│   │   │   └── ue.service.ts
│   │   ├── app.component.*
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   └── index.html
├── proxy.conf.json          ⚙️ Configuration du proxy
├── angular.json             ⚙️ Configuration Angular
├── tsconfig.json            ⚙️ Configuration TypeScript
└── package.json             ⚙️ Dépendances npm
```

---

## 🎯 Fonctionnalités Disponibles

### 📋 Page Modules
- ✅ Voir tous les modules dans une table
- ✅ Ajouter un nouveau module
- ✅ Éditer un module existant
- ✅ Supprimer un module
- ✅ Validation des formulaires

### 📚 Page Unités d'Enseignement
- ✅ Voir toutes les UE dans une table
- ✅ Ajouter une nouvelle UE
- ✅ Éditer une UE existante
- ✅ Supprimer une UE
- ✅ Validation des formulaires

---

## 🧪 Test de l'Application

### 1. Vérifier la connexion au backend

Ouvrez la console du navigateur (F12) et allez à l'onglet "Network", puis :
1. Allez à http://localhost:4200
2. Cliquez sur "Modules"
3. Vous devriez voir des requêtes GET `/api/module/list`

Si vous voyez des erreurs CORS ou 404, vérifiez que le backend est en cours d'exécution.

### 2. Tester la création

1. Cliquez sur "➕ Ajouter un Module"
2. Remplissez le formulaire
3. Cliquez sur "💾 Ajouter"
4. Vous devriez être redirigé vers la liste

---

## 🔧 Personnalisations Possibles

### Changer l'URL du Backend
Modifiez `proxy.conf.json` :
```json
{
  "/api": {
    "target": "http://nouvelle-url:port/chemin"
  }
}
```

### Ajouter Bootstrap Localement
Au lieu de l'import CDN, installez Bootstrap :
```bash
npm install bootstrap
```

Puis dans `app.component.css`, modifiez :
```css
@import 'bootstrap/dist/css/bootstrap.min.css';
```

### Ajouter plus de Validations
Modifiez les `Validators` dans les composants form

---

## ⚠️ Notes Importantes

1. **Backend actif** : Le backend REST DOIT être en cours d'exécution
2. **Proxy configuré** : Les requêtes API sont redirigées par le proxy
3. **Standalone Components** : Tous les composants sont standalone
4. **Angular 18** : Utilise `bootstrapApplication` au lieu de `NgModule`

---

## 📞 Commandes Utiles

```bash
# Démarrer en développement
npm start

# Construire pour la production
npm run build

# Exécuter les tests
npm test

# Vérifier les erreurs de lint
ng lint

# Réinstaller les dépendances
npm install

# Supprimer node_modules et réinstaller
rm -r node_modules
npm install
```

---

## 🎉 Vous êtes Prêt !

L'application Angular est maintenant complètement configurée et prête à être utilisée avec votre backend REST !

Lancez l'application et commencez à gérer vos modules et unités d'enseignement ! 📚✨


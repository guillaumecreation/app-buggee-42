# app-buggee-42 — Examen BC04 4.2 Maintenance corrective

API Node.js / Express / MySQL pour gestion de produits.

L'application **contient des bugs intentionnels**. Votre travail : les identifier, analyser leur cause racine et les corriger en suivant la méthode RCA.

---

## 1. Prérequis

| Outil   | Version minimale | Vérification         |
|---------|------------------|----------------------|
| Node.js | v18.x            | `node --version`     |
| npm     | v9.x             | `npm --version`      |
| MySQL   | v8.0             | `mysql --version`    |

---

## 2. Installation

### 2.1 Récupérer le code

```bash
git clone https://github.com/guillaumecreation/app-buggee-42.git
cd app-buggee-42
```

Vous pouvez aussi télécharger le ZIP depuis la page GitHub si vous préférez (bouton "Code" → "Download ZIP").

### 2.2 Installer les dépendances

```bash
cd app-buggee-42
npm install
```

### 2.3 Configurer l'environnement

```bash
cp .env.example .env
```

Ouvrez `.env` et renseignez vos identifiants MySQL locaux (`DB_USER`, `DB_PASSWORD`).

### 2.4 Créer la base et importer le seed

```bash
mysql -u root -p -e "CREATE DATABASE app_buggee;"
mysql -u root -p app_buggee < db/seed.sql
```

Le seed crée 2 utilisateurs et 5 produits. Comptes de test :

- `test@test.com` / `password123`
- `admin@test.com` / `admin123`

### 2.5 Lancer l'application

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`.

### 2.6 Vérifier que ça démarre

Dans un autre terminal :

```bash
curl http://localhost:3000
```

Doit retourner un JSON de bienvenue listant les endpoints.

---

## 3. Endpoints disponibles

| Méthode | Route                  | Auth requise    | Description                           |
|---------|------------------------|-----------------|---------------------------------------|
| POST    | `/api/auth/register`   | Non             | Créer un compte                       |
| POST    | `/api/auth/login`      | Non             | Se connecter — retourne un token JWT  |
| GET     | `/api/products`        | **Oui** (Bearer) | Lister tous les produits              |
| GET     | `/api/products/:id`    | Oui (Bearer)    | Récupérer un produit par ID           |
| POST    | `/api/products`        | Oui (Bearer)    | Créer un nouveau produit              |
| DELETE  | `/api/products/:id`    | Oui (Bearer)    | Supprimer un produit                  |

### Exemple : obtenir un token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Exemple : créer un produit (avec token)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_ICI" \
  -d '{"name":"Produit test","price":19.99,"stock":5}'
```

---

## 4. Méthode RCA — Root Cause Analysis

Pour **chaque bug**, vous devez produire un rapport en suivant ces 5 étapes dans l'ordre.

| Étape | Nom                 | Ce qu'on attend                                                |
|-------|---------------------|---------------------------------------------------------------|
| 1     | Symptôme            | Comportement actuel vs comportement attendu (factuel)          |
| 2     | Reproduction        | Étapes exactes pour déclencher le bug (100% reproductible)     |
| 3     | Localisation        | Fichier + ligne responsable                                    |
| 4     | **Cause racine**    | **POURQUOI** le code est faux (le plus important — 2 pts/6)    |
| 5     | Correction + vérif. | Code corrigé minimal + test de non-régression                  |

Le template officiel `template_rapport_RCA.html` est fourni par le formateur.

---

## 5. Livrables à rendre

- Dossier nommé `NOM_Prenom_BC04_42/` contenant :
  - **3 rapports RCA** (Markdown `.md` ou Word `.docx`, un fichier par bug)
  - Le **code corrigé** (toute l'application avec vos corrections)

Format des rapports : voir section 5 du sujet officiel (`sujet_BC04_42.pdf`).

---

## 6. Règles

- Travail **individuel**. Même appli mais analyse personnelle. Copie détectée = 0.
- Vous **modifiez le code source** pour corriger les bugs.
- Vous **ne modifiez pas** ce README ni les fichiers de configuration (`.env`, `package.json`, `seed.sql`).
- En cas de blocage technique sur l'installation : appeler l'enseignant. Ne perdez pas de temps à debugger l'install, ce n'est pas l'objet de l'épreuve.

---

## 7. Aide démarrage rapide

```bash
# Tout-en-un
cd app-buggee-42
npm install
cp .env.example .env       # editer DB_USER / DB_PASSWORD
mysql -u root -p -e "CREATE DATABASE app_buggee;"
mysql -u root -p app_buggee < db/seed.sql
npm start
```

Bon courage. L'enjeu n'est pas de coder vite, c'est de **comprendre et expliquer**.

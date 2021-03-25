
<img src="/frontend/src/assets/img/logo_groupomania.svg">

##### ⚡ MVP d'un réseau social d'entreprise interne, moderne et ludique
*****

## 🔨 installation du projet

#### 1 - prérequis de l'environnement technique
- cloner la branche master de ce repo
- installer Node.JS, Vue et MySQL

#### 2 - configurer la base de données

il existe 2 dossiers backend :

→ ```backend-MongoDB``` non-fonctionnel
il utilise une base de données non-relationnelle (noSQL) ;
il n'est plus maintenu à ce jour

→ ```backend-MySQL``` fonctionnel
il utilise une base de données relationnelle (SQL) ;
c'est ce dernier qu'il faut utiliser pour ce projet

pour ce dernier, vous avez la possibilité d'utiliser l'un des 2 fichiers suivants

→ avec des exemples : ```database/groupomaniaDB-examples.sql```

→ seulement la structure : ```database/groupomaniaDB-structure.sql```

#### 3 - configurer l'accès à la base de données

- créer un fichier ```backend-MySQL/.env``` en suivant l'exemple donné par ```backend-MySQL/.env-example```
```
DB_HOST=// indiquez l'adresse du serveur
DB_USER=// indiquez l'utilisateur disposant des droits de modification
DB_PASSWORD=// indiquez le mot de passe associer à l'utilisateur
DB_NAME=// indiquez la base de données ciblée

TOKEN=// indiquez le token secret
```

#### 4 - lancer le backend

```
cd backend-MySQL
nodemon
```

#### 5 - lancer le frontend

```
cd frontend
npm run serve
```

#### 6 - déclarer un administrateur/modérateur

###### sur le navigateur, à l'ouverture du site :
→ créer un compte utilisateur et se connecter

###### sur l'interface de gestion de la base de données :
→ dans la table ```users```, attribuer le role ```admin``` dans le champs ```role``` à l'utilisateur souhaité (le role ```collab``` est attribué par défaut à chaque nouvel utilisteur)

*****

## 🎈 let's play !
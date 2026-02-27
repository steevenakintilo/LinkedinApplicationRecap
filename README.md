# LinkedinApplicationRecap

LinkedinApplicationRecap est comme Spotify Recap, mais au lieu de récupérer les statistiques de tes chansons, il récupère les statistiques de tes candidatures.

## Requirements

Pour faire fonctionner le projet tu as besoins de Python , Pip , Javascript et VS Code et Node.

Lien pour télécharger python: https://www.python.org/downloads/

Lien pour télécharger pip: https://pip.pypa.io/en/stable/installation/

Lien pour télécharger javascript: https://programiz.pro/resources/js-install/

Lien pour télécharger node: https://nodejs.org/en/download/

Lien pour télécharger VS Code: https://code.visualstudio.com/download

Tu dois télécharger ton archive Linkedin et choisir la premiére option: https://www.linkedin.com/mypreferences/d/download-my-data
<img width="1189" height="910" alt="image" src="https://github.com/user-attachments/assets/c3356785-c96e-44e4-b253-95a81f5c7049" />


L'archive met environ 10-15 minutes à être envoyer par Linkedin

Une fois reçu tu dois recevoir un mail ou une notification sur le site

Une fois l'archive reçu tu dois la télécharger puis tu dois l'unzip l'archive et copier la path de l'archive et la collé dans le fichier
core\archive_filepath.txt comme ceci
<img width="1533" height="363" alt="image" src="https://github.com/user-attachments/assets/e8fbf54b-0392-478c-beac-d76cb5c41755" />


Ensuite tu dois télécharger tout les modules python via cette commande sur ton terminal VS Code

```
    pip install -r requirements.txt
```

Tu dois ensuite télécharger les modules react via ces commandes
```
    cd linkedin_frontend
    npm install --force
```

Après ça tu pourra lancer le projet

## Lancer le projet

Si tu veux seulement avoir le fichier json avec les statistiques sans le visuel web tu peux directement aller dans le dossier core puis faire

```
    python main.py
```

 Ça va permettre de générer le fichier json dans le fichier data.json

Si tu veux avoir un visuel web tu dois ouvrir 2 fenêtres une pour le backend et une pour le frontend.

Sur la première tu dois aller dans le dossier linkedin_backend puis faire cette commande

```
    python manage.py runserver
```

Sur la deuxiéme fenêtre tu dois aller dans le dossier linkedin_frontend puis faire cette commande

```
    npm start
```
Les fenêtre VS Code devrais resembler à ça
<img width="2122" height="1086" alt="image" src="https://github.com/user-attachments/assets/035597f6-f449-4990-a5fd-3a4bb4412888" />

Si tout ce deroule bien ça devrais ouvrir une page web ou tu pourras ensuite récupérer les datas comme ça:
<img width="2558" height="1358" alt="image" src="https://github.com/user-attachments/assets/e32911cf-46f5-48ce-8324-7d98fe448208" />


## Le site web

Le site internet va juste afficher les données du fichier json et afficher le résultat sous forme de graphiques tableaux et phrases.

## Autre

C'est vraiment une version 1 du site donc le design n'est pas encore parfait dutout

Si le site ne marche pas ou une erreur apparait n'hésite pas à faire une issue github pour que je regarde moi même le probléme.

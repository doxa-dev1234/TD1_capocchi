1. Initialisation et Canvas
i. Prompt utilisé "Voici mes spécifications. Ne génère pas le code final. Aide-moi à coder étape par étape en m'expliquant chaque fonction p5.js dont j'ai besoin. Commence par la section Canvas."
ii. Partie concernée : Création du fichier de base, structure `setup()` et `draw()`.
iii. Modifications apportées :J'ai étudié les explications de l'IA sur la boucle de rendu de p5.js. J'ai ensuite personnalisé moi-même les paramètres, en choisissant `windowWidth` et `windowHeight` pour un affichage plein écran, et j'ai défini le code couleur hexadécimal du ciel de Minecraft ("#87CEEB") pour le `background()`.

2. Physique du personnage (La Gravité)
i. Prompt utilisé :"Comment gérer la gravité du personnage pour qu'il ait une vitesse initiale vers le bas et qu'il puisse sauter ?"*
ii. Partie concernée :** La classe `Steve`, l'application des vecteurs (`p5.Vector`) et les lois du mouvement.
iii. Modifications apportées :** L'IA m'a expliqué l'addition de vecteurs (position += vélocité += gravité). Après avoir testé le code de l'IA, j'ai trouvé le saut trop long. J'ai donc modifié la constante de gravité (passée à `0.6`) et la force de l'impulsion (passée à `-10`).

3. Les Obstacles et le Défilement
i. Prompt utilisé : "Maintenant, fais que les obstacles se déplacent vers la gauche et soient générés au hasard avec un trou au milieu pour que le personnage puisse passer."*
ii. Partie concernée : La classe `BedrockPipe`, la gestion du tableau d'obstacles et l'aléatoire.
iii. Modifications apportées : L'IA m'a fourni la logique mathématique pour calculer le "top" et le "bottom" du tuyau. J'ai ensuite repris ce code pour y intégrer ma propre direction artistique : j'ai codé les nuances de gris et la boucle `for` générant la fausse texture de Bedrock. J'ai également ajusté la vitesse de défilement (`speed = 5`) et la taille de l'ouverture (`gap = 200`) pour équilibrer la difficulté du jeu.

4. Collisions et Système de Score
i. Prompt utilisé :"Aide-moi pour la gestion de toutes les collisions entre le personnage et les obstacles, ainsi que l'avancée du score quand on les dépasse."*
ii. Partie concernée : La méthode `hits()` utilisant l'algorithme AABB (Axis-Aligned Bounding Box) et le nettoyage des tableaux (`splice`).
iii. Modifications apportées : J'ai décortiqué les conditions `if` fournies par l'IA vérifiant les chevauchements de coordonnées (X et Y). Pour rendre le jeu moins punitif et plus juste, j'ai ajusté manuellement les dimensions de la zone de collision (la "hitbox" `this.w` et `this.h` de Steve) pour qu'elle soit plus petite que le dessin réel (comme dans la majorité des jeux).

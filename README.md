Architecture et Machine à États
Plutôt que de lancer le jeu immédiatement, le code utilise une machine à états via la variable etatJeu. Elle agit comme un aiguilleur dans la fonction draw(). À tout moment, le jeu sait s'il doit afficher l'écran d'accueil (START), faire tourner la logique du jeu (PLAYING), ou afficher l'écran de défaite (GAMEOVER). L'interaction de saut (interactionSaut()) s'adapte intelligemment à cet état (jouer ou recommencer).

 Maîtrise de p5.js (Physique et Vecteurs)
Comme abordé dans le cours, la classe Steve utilise les mathématiques vectorielles pour gérer la physique :

Les Vecteurs (p5.Vector) : Au lieu de gérer x et y séparément, nous utilisons des vecteurs pour la position (pos), la vitesse (vel), la gravité constante (gravity), et la force de saut (lift).

La Physique (update) : À chaque frame, la vitesse augmente en absorbant la gravité (this.vel.add(this.gravity)). La position change en fonction de cette vitesse (this.pos.add(this.vel)). Quand on saute, on écrase la vitesse Y avec une force négative pour une impulsion nette.

Transformations : Dans la méthode show(), push() et pop() isolent les transformations. L'astuce visuelle : let angle = map(this.vel.y, -10, 10, -PI/6, PI/6); rotate(angle);. La fonction map() convertit la vitesse de chute en un angle.

Collisions et Optimisations (Classe BedrockPipe)
Les Collisions Mathématiques (AABB) : Le cours abordait les collisions circulaires par calcul de distance. Ici, nous utilisons la méthode "Axis-Aligned Bounding Box" (AABB). La fonction hits() calcule les bords stricts de Steve. Si le bord droit de Steve dépasse le bord gauche du tuyau, et qu'il n'est pas parfaitement situé dans la zone vide (top et bottom), la collision est avérée (return true).

L'Aléatoire Optimisé : Pour générer la texture de roche sans qu'elle ne clignote à 60 FPS dans le draw(), les coordonnées des taches sont générées avec random() une seule fois dans le constructor() et stockées dans des tableaux (tachesHaut, tachesBas). Le show() se contente de les dessiner.

Journal d'usage de l'IA
Durant la conception, l'IA a été utilisée comme assistant technique :

Idéation & Mathématiques : Traduction de l'idée de chute et de saut en utilisant la notion de p5.Vector abordée en cours, et adaptation de la formule de collision des cercles en collision rectangulaire (AABB).

Débogage (Graine aléatoire) : Suite à un problème où les ouvertures des tuyaux n'étaient pas aléatoires, l'IA a pointé du doigt l'utilisation problématique de randomSeed() dans le draw(). La solution apportée a été de pré-calculer les textures dans le constructor().

Architecture (Critique) : L'IA a conseillé et aidé à mettre en place une "Machine à états" pour structurer proprement les écrans de menu, de jeu et de défaite, rendant l'expérience utilisateur (UX) beaucoup plus fluide.

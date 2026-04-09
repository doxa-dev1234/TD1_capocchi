// Déclaration des variables globales
let steve; 
let obstacles = []; // Tableau dynamique qui stockera les instances d'obstacles
let score = 0; // Compteur d'obstacles franchis
// Variable d'état agissant comme un aiguilleur pour gérer l'affichage (Machine à états)
let etatJeu = "START"; 

function setup() {
 
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#87CEEB"); 
  
  // Structure de contrôle principale orientant le flux du programme selon l'état actuel
  if (etatJeu === "START") {
    afficherEcranDemarrage(); // Affiche le menu
  } else if (etatJeu === "PLAYING") {
    jouerLeJeu(); // Lance la boucle principale de gameplay
  } else if (etatJeu === "GAMEOVER") {
    afficherGameOver(); // Affiche l'écran de fin
  }
}

function jouerLeJeu() {
  // Utilise le compteur de frames global de p5.js comme chronomètre
  // L'opérateur modulo (%) permet d'exécuter l'action à un intervalle régulier (toutes les 100 frames)
  if (frameCount % 100 === 0) {
    // Instancie un nouvel obstacle et l'ajoute à la fin du tableau
    obstacles.push(new BedrockPipe());
  }

  // Parcours du tableau à l'envers
  // Cela est indispensable car si un élément est retiré (splice) pendant une boucle à l'endroit,
  // les index se décalent et la boucle risque de sauter des éléments ou de planter.
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update(); // Met à jour les coordonnées de l'obstacle
    obstacles[i].show();   // Effectue le rendu graphique de l'obstacle

    // Appelle la méthode de collision de l'obstacle en lui passant l'objet joueur en paramètre
    if (obstacles[i].hits(steve)) {
      etatJeu = "GAMEOVER"; // Interrompt la boucle de jeu en cas de contact
    }

    // Vérifie si l'obstacle a complètement quitté la zone visible par la gauche
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1); // Retire l'objet du tableau pour libérer la mémoire (Garbage Collection)
      score++; // Incrémente le score
    }
  }

  // Mise à jour de la physique et rendu du joueur
  steve.update();
  steve.show();

  // Configuration typographique pour le HUD (Head-Up Display)
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(40);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20); 
}

// ==========================================
// INTERACTIONS UTILISATEUR
// ==========================================
function keyPressed() {
  // Écouteur d'événement déclenché par une pression clavier
  if (key === ' ') {
    interactionSaut();
  }
}

function mousePressed() {
  // Écouteur d'événement déclenché par un clic de souris
  interactionSaut();
}

function interactionSaut() {
  // Fonction centralisant la logique d'interaction pour éviter la duplication de code
  if (etatJeu === "START" || etatJeu === "GAMEOVER") {
    // Phase d'initialisation : réinitialise toutes les variables pour une nouvelle partie
    steve = new Steve();
    obstacles = [];
    obstacles.push(new BedrockPipe()); // Force la création immédiate d'un obstacle
    score = 0;
    frameCount = 0; // Remise à zéro du compteur pour caler le rythme de génération
    etatJeu = "PLAYING"; // Bascule la machine à états sur le mode jeu
  } else if (etatJeu === "PLAYING") {
    steve.jump(); // Transmet l'ordre de saut au joueur
  }
}

// ==========================================
// LES ÉCRANS D'AFFICHAGE
// ==========================================
function afficherEcranDemarrage() {
  push(); // Sauvegarde le contexte graphique actuel (styles, transformations)
  fill(0, 150);
  noStroke();
  // Dessine un filtre semi-transparent sur toute la zone de jeu
  rect(0, 0, width, height);
  
  fill("#55FF55");
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER); // Aligne le texte sur son point central (x et y)
  textSize(60);
  text("MINECRAFT BIRD", width / 2, height / 2 - 60);
  
  fill(255);
  textSize(25);
  text("Objectif : Survivez le plus longtemps possible !", width / 2, height / 2 + 10);
  
  fill("#FFFF55");
  textSize(30);
  text("Cliquez (gauche) ou pressez ESPACE pour sauter et démarrer", width / 2, height / 2 + 70);
  pop(); // Restaure le contexte graphique précédent
}

function afficherGameOver() {
  push();
  fill(0, 150);
  noStroke();
  rect(0, 0, width, height);
  
  fill("#FF5555");
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("GAME OVER", width / 2, height / 2 - 40);
  
  fill(255);
  textSize(25);
  text("Score final : " + score, width / 2, height / 2 + 20);
  
  fill("#FFFF55");
  text("Cliquez ou pressez Espace pour rejouer", width / 2, height / 2 + 70);
  pop();
}

// ==========================================
// CLASSE STEVE (Le Joueur)
// ==========================================
class Steve {
  constructor() {
    
    this.pos = createVector(150, height / 2); // Position figée sur X, centrée sur Y
    this.vel = createVector(0, 0); // Vitesse initiale
    this.gravity = createVector(0, 0.6); // Accélération constante vers le bas
    this.lift = createVector(0, -10); // Impulsion appliquée lors d'un saut
    
    // Dimensions de la "Hitbox" (boîte de collision)
    this.w = 40;
    this.h = 60;
  }

  jump() {
    // Écrase la vélocité verticale actuelle au lieu de l'additionner,
    // garantissant un saut d'intensité constante quelle que soit la vitesse de chute
    this.vel.y = this.lift.y;
  }

  update() {
    // Application des lois du mouvement : 
    // L'accélération (gravité) modifie la vitesse, la vitesse modifie la position
    this.vel.add(this.gravity);
    this.pos.add(this.vel);

    // Clamping (Contraintes spatiales) pour maintenir l'entité dans le canvas
    if (this.pos.y > height - this.h / 2) {
      this.pos.y = height - this.h / 2; // Collision avec le sol
      this.vel.y = 0; // Annulation de l'inertie
    }
    if (this.pos.y < this.h / 2) {
      this.pos.y = this.h / 2; // Collision avec le plafond
      this.vel.y = 0;
    }
  }

  show() {
    push();
    // Translate l'origine du repère (0,0) au centre mathématique du joueur
    translate(this.pos.x, this.pos.y);
    
    // Interpolation linéaire : convertit une plage de vitesse [-10, 10]
    // en une plage d'angles de rotation [-PI/6, PI/6]
    let angle = map(this.vel.y, -10, 10, -PI/6, PI/6);
    rotate(angle); // Fait pivoter le repère entier selon l'angle calculé

    rectMode(CENTER); // Force les rectangles à se dessiner depuis leur centre
    noStroke();

    fill("#FAD6B1");
    rect(0, -20, 30, 30);
    
    fill("#4A3018");
    rect(0, -30, 32, 10);
    fill(255);
    rect(-8, -18, 8, 8);
    fill("#3B3B98");
    rect(-6, -18, 4, 8);
    
    fill("#00AAAA");
    rect(0, 10, 40, 30);
    
    fill("#3B3B98");
    rect(0, 35, 40, 20);
    
    pop();
  }
}

// ==========================================
// CLASSE BEDROCK (Les Obstacles)
// ==========================================
class BedrockPipe {
  constructor() {
    this.w = 80; // Largeur fixe
    this.x = width; // Positionnement initial à l'extérieur droit du canvas
    this.speed = 5; // Vitesse de translation horizontale
    
    this.gap = 200; // Hauteur de l'espace franchissable
    
    // Détermination aléatoire de l'ordonnée (Y) du centre de l'ouverture
    this.centery = random(150, height - 150);
    
    // Calcul des limites géométriques absolues de l'ouverture
    this.top = this.centery - this.gap / 2;
    this.bottom = this.centery + this.gap / 2;

    // Tableaux stockant les propriétés de la texture générée
    // Ceci permet de fixer l'aléatoire une seule fois lors de la construction
    this.tachesHaut = [];
    this.tachesBas = [];
    
    // Pré-calcul de la texture via des coordonnées relatives à l'obstacle
    for(let i = 0; i < 15; i++) {
      this.tachesHaut.push({
        x: random(this.w - 10), 
        y: random(this.top - 10), 
        c: random(30, 80)
      });
      
      this.tachesBas.push({
        x: random(this.w - 10), 
        y: random(height - this.bottom - 10), 
        c: random(30, 80)
      });
    }
  }

  hits(steve) {
    // Algorithme de détection de collision AABB (Axis-Aligned Bounding Box)
    // 1. Calcul des 4 frontières absolues de la Hitbox du joueur
    let steveLeft = steve.pos.x - steve.w / 2;
    let steveRight = steve.pos.x + steve.w / 2;
    let steveTop = steve.pos.y - steve.h / 2;
    let steveBottom = steve.pos.y + steve.h / 2;

    // 2. Vérification de l'intersection sur l'axe X
    if (steveRight > this.x && steveLeft < this.x + this.w) {
      // 3. Si X chevauche, vérification de l'intersection sur l'axe Y (touche-t-il les blocs pleins ?)
      if (steveTop < this.top || steveBottom > this.bottom) {
        return true; // Les boîtes se chevauchent
      }
    }
    return false; // Pas d'intersection
  }

  update() {
    // Translation vers la gauche en fonction de la vitesse définie
    this.x -= this.speed;
  }

  offscreen() {
    // Test booléen : l'abscisse droite de l'obstacle est-elle inférieure à l'abscisse gauche de l'écran (0) ?
    return (this.x < -this.w);
  }

  show() {
    push();
    fill("#333333");
    stroke(0);
    strokeWeight(3);
    
    // Rendu du pilier supérieur (de y=0 jusqu'à la limite top)
    rect(this.x, 0, this.w, this.top);
    // Rendu du pilier inférieur (de la limite bottom jusqu'à la fin de la fenêtre)
    rect(this.x, this.bottom, this.w, height - this.bottom);
    
    noStroke();
    // Boucles de rendu des textures pré-calculées
    for(let tache of this.tachesHaut) {
      fill(tache.c);
      // Ajout de la position globale X de l'obstacle à la coordonnée relative X de la tache
      rect(this.x + tache.x, tache.y, 10, 10);
    }
    
    for(let tache of this.tachesBas) {
      fill(tache.c);
      rect(this.x + tache.x, this.bottom + tache.y, 10, 10);
    }
    pop();
  }
}

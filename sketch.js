// Déclaration des variables globales
let steve; // Objet représentant le joueur
let obstacles = []; // Tableau dynamique qui stockera les instances d'obstacles
let score = 0; // Compteur d'obstacles franchis
// Variable d'état agissant comme un aiguilleur pour gérer l'affichage (Machine à états)
let etatJeu = "START"; 

function setup() {
  // Initialise le canvas pour qu'il remplisse l'intégralité de la fenêtre du navigateur
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
  text("Score: " + score, 20, 20); // Affiche le compteur de score en direct
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

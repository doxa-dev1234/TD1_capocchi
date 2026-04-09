// ==========================================
// CLASSE STEVE (Le Joueur)
// ==========================================
class Steve {
  constructor() {
    // Initialisation des propriétés physiques via des objets p5.Vector
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

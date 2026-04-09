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

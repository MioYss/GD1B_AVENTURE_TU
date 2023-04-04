var groupeBullets;

export default class Tir extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.keyboard = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setCollideWorldBounds(true);


        

    }
    
    //fonction tirer( ), prenant comme paramètre l'auteur du tir
        tirer( direction) {
            
            // mesasge d'alerte affichant les attributs de player
            console.log ("joueur en position"+ this.x + ","+ this.y + ", direction du tir: "
            +direction) ; 

            var coefDir;

            if (direction == 'left') { coefDir = -1; } else { coefDir = 1 }

            // on crée la balle a coté du joueur
            var sprite_tir = groupeBullets.create(this.x + (25 * coefDir), this.y - 4, 'sprite_tir');

            // parametres physiques de la balle.
            
            sprite_tir.setCollideWorldBounds(true);
            sprite_tir.body.allowGravity =false;
            sprite_tir.setVelocity(1000 * coefDir, 0); // vitesse en x et en y

        } 

}
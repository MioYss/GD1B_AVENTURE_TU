export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.clavier = scene.input.keyboard.createCursorKeys();


        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);


    }

    update() {

        function perdu(){ 
        "perso".kill();    // supprime le sprite du héros
        game.input.onTap.addOnce(rejouer, this);      // après un clique de souris, exécute la fonction rejouer
        }

        function rejouer(){
            game.state.restart();   // le jeu recommence.
        }
        
        
        if (this.clavier.left.isDown){ //si la touche gauche est appuyée
            this.setVelocityX(-160); //alors vitesse négative en X
        }
    
        else if (this.clavier.right.isDown){ //sinon si la touche droite est appuyée
            this.setVelocityX(160); //alors vitesse positive en X
        }
    
        else if (this.clavier.up.isDown){ // si touche bas appuyée 
            this.setVelocityY(-160); //vitesse 
        }
    
        else if (this.clavier.down.isDown){ //si touche haut appuyée 
            this.setVelocityY(160); //alors vitesse verticale 
        }
        else {
            this.setVelocityX(0) & this.setVelocityY (0)
        }
    }   
}
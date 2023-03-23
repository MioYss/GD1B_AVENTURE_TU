export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.clavier = scene.input.keyboard.createCursorKeys();


        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);


    }

    update() {

        if (this.clavier.left.isDown){ //si la touche gauche est appuyée
            this.player.setVelocityX(-160); //alors vitesse négative en X
        }
    
        else if (this.clavier.right.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(160); //alors vitesse positive en X
        }
    
        else if (this.clavier.up.isDown){ // si touche bas appuyée 
            this.player.setVelocityY(160); //vitesse 
        }
    
        else if (this.clavier.down.isDown){ //si touche haut appuyée 
            this.player.setVelocityY(-160); //alors vitesse verticale 
        }
    }
}
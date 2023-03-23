export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.cursors = scene.input.keyboard.createCursorKeys();


        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);

    }

    update() {

        if (this.cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-160); //alors vitesse négative en X
        }
    
        else if (this.cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(160); //alors vitesse positive en X
        }
    
        else if (this.cursors.up.isDown){ // sinon
            player.setVelocityy(160); //vitesse nulle
        }
    
        else if (this.cursors.down.isDown){ //si touche haut appuyée ET que le perso touche le sol
            player.setVelocityY(-160); //alors vitesse verticale négative //(on saute)
        }
    }
}
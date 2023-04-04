import Tir from "./tir.js";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.keyboard = scene.input.keyboard.createCursorKeys(); // up, down, right, left, space, shift


        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
        
        const has_baton01 = false

        this.direction = 'left';  

    }


    attaque(scene,sprite) {    

        this.tir = new Tir (scene, this.x, this.y, sprite);
        this.tir.tirer(this.direction);
        
    }


    obtain_baton(player,baton01){
        if(player.has_baton01 == false){
            this.baton01.setVisible(true); 

        const isEJustDown = Phaser.Input.keyboard.JustDown(this.keyE);
                if(isEJustDown){
                    
                    this.baton01.y += 2; 
                    this.baton01.setVisible(true); 
                    //this.discussion(["Vous avez trouvé un baton magique"]);
                    player.has_baton01 = true; 
                    //this.ui_hache.setVisible(true); 
                    //this.ui_baton.setVisible(false); 
                    //this.player.hasBaton = false
                    //this.player.currentAnims = ["run_left_axe","run_up_axe","run_right_axe","run_down_axe","idle_left_axe","idle_up_axe","idle_right_axe","idle_down_axe"];
                }
        }
        
    }

    /*perdu(){ 
    this.kill();    // supprime le sprite du héros
    game.input.onTap.addOnce(rejouer, this);      // après un clique de souris, exécute la fonction rejouer
    }*/

    /*rejouer(){
        game.state.restart();   // le jeu recommence.
    }*/
    
    deplacement() {
        if (this.keyboard.left.isDown){ //si la touche gauche est appuyée
            this.setVelocityX(-160); //alors vitesse négative en X
            this.direction = "left"
            
        }
    
        else if (this.keyboard.right.isDown){ //sinon si la touche droite est appuyée
            this.setVelocityX(160); //alors vitesse positive en X
            this.direction = "right"
        }
    
        else if (this.keyboard.up.isDown){ // si touche bas appuyée 
            this.setVelocityY(-160); //vitesse 
            this.direction = "down"
        }
    
        else if (this.keyboard.down.isDown){ //si touche haut appuyée 
            this.setVelocityY(160); //alors vitesse verticale 
            this.direction = "up"
        }
        else {
            this.setVelocityX(0) & this.setVelocityY (0)
        }
        console.log (this.direction)
    }
        


}
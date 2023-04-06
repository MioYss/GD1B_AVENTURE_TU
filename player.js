import Tir from "./tir.js";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture); 
        this.keyboard = scene.input.keyboard.createCursorKeys(); // up, down, right, left, space, shift
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // ajout E

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
        
        this.has_baton01 = false; 

        this.direction = 'left';  


        this.timeFromLastShot = 0; 
        this.fireCooldown = 600; 

        this.hp = 3; 
        this.invulnerable = false; 
        this.dureeInvulnerable = 1000; 

    }


    attaque(scene,sprite) {   

        //timer cree par phaser - valaeur donner et on regarde la différence
        if(new Date().getTime() - this.timeFromLastShot < this.fireCooldown){
             return; 
        } 

        if(this.has_baton01 == true){
            this.tir = new Tir (scene, this.x, this.y, sprite);
            this.tir.tirer(this.direction);
            this.timeFromLastShot = new Date().getTime(); // on donne une nouvelle valauer a timefrom, on l'actualise pour avoir un delai
        } 
    }


    obtain_baton(player,baton01){

        if(player.has_baton01 == false){
            console.log("je suis sur baton"); 
        
                if(player.keyE.isDown){

                    baton01.destroy(); 
                    player.has_baton01 = true; 
                }
        }
        
    }

    
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

    
    infligeDegats(ennemi, bullet){

        bullet.destroy();

        ennemi.hp -= 1; 
        if(ennemi.hp <= 0){

            ennemi.scene.groupe_soins.create(ennemi.x, ennemi.y, 'serpent'); // drop de soin

            ennemi.destroy(); 
        }
    }

    recoitDegats(player, ennemi){

        if(player.invulnerable == false){
            player.invulnerable = true;

            player.hp -= 1;
            if(player.hp <= 0) {
                player.scene.scene.start("entre_manoir");
            }


            player.setTint(0xff0000);  // met le player rouge
            player.scene.cameras.main.shake(200, 0.01); // shake de cam
            console.log(player.hp); 

            setTimeout(() => {
                player.invulnerable = false;
                player.setTint(0xffffff); // met le player normal
    
            }, player.dureeInvulnerable);
            
        }
    }

    soigne(player, soin){

        player.hp += 1;
        console.log(player.hp);

        soin.destroy(); 
    }

}
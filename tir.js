var boutonFeu;  

export default class tir extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture,player) {
        super(scene, x, y, texture); 
        this.clavier = scene.input.keyboard.createCursorKeys();
        this.player = player;

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);


    }

    preload() {


    }


    create() {

        this.player.direction = 'right';  

        // affectation de la touche A à boutonFeu
        this.boutonFeu = this.Input.Keyboard.addKey('A'); 

    }
    



    update() {

        if (this.clavier.left.isDown) {
            // enregistrement de la direction : gauche
            this.player.direction = 'left';
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.clavier.right.isDown) {
            // enregistrement de la direction : droite
            player.direction = 'right';
            player.setVelocityX(160);
            player.anims.play('right', true);
        } 

        //fonction tirer( ), prenant comme paramètre l'auteur du tir
        function tirer(player) {
            // mesasge d'alerte affichant les attributs de player
            alert ("joueur en position"+player.x + ","+player.y + ", direction du tir: "
            + player.direction) ; 
        }  


        }

        // déclenchement de la fonction tirer() si appui sur boutonFeu 
        if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
            tirer(player);
        }  

    
};
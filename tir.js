    var boutonFeu;  

export default class Tir extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture,player) {
        super(scene, x, y, texture); 
        this.clavier = scene.input.keyboard.createCursorKeys();
        this.player = player;

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);


        this.player.direction = 'right';  

        

    }



        

    //fonction tirer( ), prenant comme paramètre l'auteur du tir
        tirer(player) {

            // affectation de la touche A à boutonFeu
            const keyA = this.input.clavier.addKey(Phaser.Input.clavier.KeyCodes.A);
            // mesasge d'alerte affichant les attributs de player
            alert ("joueur en position"+ player.x + ","+ player.y + ", direction du tir: "
            + player.direction) ; 

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

         

           
        if (this.clavier.JustDown(keyA)) {
            console.log ("test");
        }

        if (this.clavier.JustDown(keyA)) {
            tirer(player);
        }
    
    };

}
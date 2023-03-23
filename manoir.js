class manoir extends Phaser.Scene {
    constructor() {
        
        super("manoir");
    }

    //INITIALISATION DES DONNEES EN CHANGEANT DE SCENE
    init(data){ 
        this.positionX = data.x;
        this.positionY = data.y;
        this.piece = data.piece;
    }



    preload() {

    }



    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


    }



    update() {

    }

};
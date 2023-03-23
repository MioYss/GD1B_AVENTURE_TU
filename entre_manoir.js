class entre_manoir extends Phaser.Scene {
    constructor() {
        
        super("entre_scene");
    }
    
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
class entre_manoir extends Phaser.Scene {
    constructor() {
        
        super("entre_manoir");
    }
    
    //INITIALISATION DES DONNEES EN CHANGEANT DE SCENE
    init(data){ 
        this.positionX = data.x;
        this.positionY = data.y;
        this.piece = data.piece;
    }


    preload() {

    // chargement tuiles de jeu
    this.load.image("phaser_tuiles_jeu", "assets/tuiles_jeu.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "assets/map.json");

    this.load.spritesheet('perso','assets/perso.png',
        { frameWidth: 32, frameHeight: 48 });

    this.load.image("serpent", "assets/snake01.png"); //Sprite serpent


    }



    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        console.log(this)
        // chargement de la carte
        const carteDuNiveau = this.add.tilemap("carte");
    
        // chargement du jeu de tuiles
        const tileset = carteDuNiveau.addTilesetImage(
          "tile_set_final",
          "phaser_tuiles_jeu"
        );
    
        // chargement du calque background_01
        const background_01 = carteDuNiveau.createLayer(
            "background_01",
            tileset
        ); 
    
            // chargement du calque background_03
        const background_03 = carteDuNiveau.createLayer(
            "background_03",
            tileset
        ); 
    
        // chargement du calque background_02 (les élements qui passent devant le joueur)
        const background_02 = carteDuNiveau.createLayer(
            "background_02",
            tileset
            );
    
        // chargement du calque background_principal_01 (platfromes)
        const piques = carteDuNiveau.createLayer(
            "piques",
            tileset
        );
    
        // chargement du calque background_principal_01 (platfromes)
        const background_principal_01 = carteDuNiveau.createLayer(
            "background_principal_01",
            tileset
        );
    }



    update() {

    }

};
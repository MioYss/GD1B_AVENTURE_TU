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

    this.load.spritesheet('perso','assets/perso02.png',
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

        //CREATION JOUEUR ET PROPRIETES
        this.player = this.physics.add.sprite(this.positionX, this.positionY, 'perso');
        this.player.setDepth(1);
        this.player.setBounce(0.2);
        this.player.setScale(0.7);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(140, 130);
        this.player.body.setOffset(55, 120);
        this.player.speed = 500; 
        this.player.hp = this.hpData;
        this.player.isAttacking = false; 
        this.player.dir = this.dirData; 
        this.player.questGiven = this.questGivenData; 
        this.player.recetteGiven = this.recetteGivenData;
        this.player.currentAnims = this.animsData; 
        this.player.inShop = false; 



    }



    update() {

    this.player.update ();

    }

};
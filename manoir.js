import Player from "./player.js";


var keyE;
var keyA;


export default class manoir extends Phaser.Scene {
    constructor() {
        
        super("manoir");


    }

    //INITIALISATION DES DONNEES EN CHANGEANT DE SCENE
    init(data){ 
        this.positionX = data.x;
        this.positionY = data.y;
        this.piece = data.piece;
        this.has_baton = true
    }



    preload() {

        // chargement tuiles de jeu
        this.load.image("tile_set02", "assets/tile/Tile_set.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("bibli", "assets/tile/bibli.json");



        this.load.image("baton01", "assets/baton01.png"); //Sprite baton

        this.load.image("sprite_tir", "assets/projectile.png"); //Sprite tir
    
        //UI
        this.load.image('hp3', 'assets/UI/ui_pv03.png',) // Hp3
        this.load.image('hp2', 'assets/UI/ui_pv02.png',) // Hp2
        this.load.image('hp1', 'assets/UI/ui_pv01.png',) // Hp1
        this.load.image('baton', 'assets/UI/baton_ui.png',) // Hp1
    }



    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        console.log(this)

        

        // chargement de la carte
        const map02 = this.add.tilemap("bibli");
    
        // chargement du jeu de tuiles
        const tileset = map02.addTilesetImage(
          "Tile_set", // Nom du tiled dans dossier
          "tile_set02" // Nom du tiled donner plus haut pour le rapel
        );


        // chargement du changement de zone
        const sortie_layer02 = map02.createLayer(
            "sortie_layer02",
            tileset
        ); 

        const sol_bibli = map02.createLayer( // nom donner au calque si besoin de le rapeller dans le code
            "Sol", // Nom du calque tiled
            tileset
        );       
        
        const mur = map02.createLayer( // nom donner au calque si besoin de le rapeller dans le code
            "mur", // Nom du calque tiled
            tileset
        );


        this.player = new Player(this, 7300,3500, 'perso');

        sortie_layer02.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer02, () => {
        
            console.log ("test")
            this.scene.switch("salle_01", {
                currency: 0,
            });
        })

        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur);

        //Collisions avec tileset
        mur.setCollisionByExclusion(-1, true);


        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 7680, 7680);
        this.cameras.main.zoom = 0.65;
        this.physics.world.setBounds(0, 0, 7680, 7680);
        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);


        //Creation tir 
        this.groupe_bullets = this.physics.add.group();


    }



    update() {

        this.player.deplacement ();

        if (this.keyA.isDown) {

            console.log ("test A");
            this.player.attaque(this, this.sprite_tir);
            console.log ("je tire");
        }
    }

};
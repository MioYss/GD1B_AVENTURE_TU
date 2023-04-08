import Player from "./player.js";

export default class manoir extends Phaser.Scene {
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

        // chargement tuiles de jeu
        this.load.image("tile_set02", "assets/tile/Tile_set.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("bibli", "assets/tile/bibli.json");
    }



    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

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

        const mur_bibli = map02.createLayer( // nom donner au calque si besoin de le rapeller dans le code
            "mur", // Nom du calque tiled
            tileset
        );

        this.player = new Player(this, 7300,3500, 'perso');

        sortie_layer02.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer02, () => {
        
            console.log ("test")
            this.scene.switch("entre_manoir", {
                currency: 0,
            });
        })

        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur_bibli);

        //Collisions avec tileset
        mur_bibli.setCollisionByExclusion(-1, true);


        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 7680, 7680);
        this.cameras.main.zoom = 0.65;
        this.physics.world.setBounds(0, 0, 7680, 7680);
        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);
    }



    update() {

        this.player.deplacement ();
        
        
    }

};
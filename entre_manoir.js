import Player from "./player.js";
let plateforme_mobile; 
let tween_mouvement; 
let serpent;
let sortie_layer;
let setCollisionByExclusion = false
export default class entre_manoir extends Phaser.Scene {
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
    this.load.image("tile_set01", "assets/tile/Tile_set.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("entree_manoir", "assets/tile/entree_manoir.json");

    this.load.spritesheet('perso','assets/perso03.png',
        { frameWidth: 256, frameHeight: 256 })
        ;

    this.load.image("serpent", "assets/snake01.png"); //Sprite serpent

    this.load.image("baton01", "assets/baton01.png"); //Sprite serpent


    }


    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        console.log(this)
        // chargement de la carte
        const map = this.add.tilemap("entree_manoir");
    
        // chargement du jeu de tuiles
        const tileset = map.addTilesetImage(
          "Tile_set", // Nom du tiled dans dossier
          "tile_set01" // Nom du tiled donner plus haut pour le rapel
        );
    
        // chargement du calque background_01
        const bg01 = map.createLayer( //'imp" nom donner au calque si besoin de le rapeller dans le code
            "bg01", // Nom du calque tiled
            tileset
        ); 
    
        const mur = map.createLayer( 
            "mur", // Nom du calque tiled
            tileset
        ); 
            // chargement du calque background_03
        const sortie_layer = map.createLayer(
            "sortie_layer",
            tileset
        ); 
    


        
        //CREATION JOUEUR ET PROPRIETES
        this.player = new Player(this, 1000,3200, 'perso');

        //CREATION BATON
        this.baton01 = this.physics.add.sprite(1000, 2900, 'baton01');

        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 2048, 3584);
        this.cameras.main.zoom = 0.7;
        this.physics.world.setBounds(0, 0, 2048, 3584);
        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);


        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur);

        //Collisions avec tileset
        mur.setCollisionByExclusion(-1, true);
        sortie_layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer, () => {
        
            console.log ("test")
            this.scene.switch("manoir", {
                currency: 0,
            });
        })

        plateforme_mobile = this.physics.add.sprite(
            1000,
            2600,
            "serpent"
        ); 

        plateforme_mobile.body.allowGravity = false;
        plateforme_mobile.body.immovable = true; 
        
        tween_mouvement = this.tweens.add({
            targets: [plateforme_mobile],  // on applique le tween sur platefprme_mobile
            paused: false, // de base le tween est en pause
            ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
            duration: 2000,  // durée de l'animation pour trajet
            yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
            x: "-=300",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
            delay: 0,     // délai avant le début du tween une fois ce dernier activé
            hold: 1000,   // délai avant le yoyo
            repeatDelay: 1000, // delay 
            repeat: -1 // répétition infinie 
        });

        this.physics.add.collider(this.player, plateforme_mobile, () => {
            console.log ("test")
        });
    }
    



    update() {

    this.player.update ();



    }

};
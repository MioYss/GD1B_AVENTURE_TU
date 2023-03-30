import Player from "./player.js";
var plateforme_mobile; 
var tween_mouvement; 
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
        const background_principal_01 = carteDuNiveau.createLayer(
            "background_principal_01",
            tileset
        );

         /* const sortie_layer = carteDuNiveau.createLayer(
            "sortie_layer",
            tileset
        ); */ 
        
        //CREATION JOUEUR ET PROPRIETES
        this.player = new Player(this, 90,960, 'perso');

        // ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        //this.cameras.main.zoom = 1.5;
    
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);


        /* this.physics.add.collider(this.player, sortie_layer, () => {
            this.scene.switch("manoir", {
                currency: 0,
            });
        }) */ 

        plateforme_mobile = this.physics.add.sprite(
            700,
            982,
            "serpent"
        ); 

        plateforme_mobile.body.allowGravity = false;
        plateforme_mobile.body.immovable = true; 
        
        tween_mouvement = this.tweens.add({
            targets: [plateforme_mobile],  // on applique le tween sur platefprme_mobile
            paused: false, // de base le tween est en pause
            ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
            duration: 2000,  // durée de l'animation pour monter 
            yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
            x: "-=300",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
            delay: 0,     // délai avant le début du tween une fois ce dernier activé
            hold: 1000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
            repeatDelay: 1000, // deléi avant la répétition : temps que la plate-forme reste en bas
            repeat: -1 // répétition infinie 
        });
    }
    



    update() {

    this.player.update ();

    }

};
import Player from "./player.js";
let plateforme_mobile; 
let tween_mouvement; 
let serpent;
let sortie_layer01;
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
    this.load.image("tuiles_jeu02", "assets/e/tuiles_jeu.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("map02", "assets/e/map02.json");

    this.load.spritesheet('perso','assets/perso02.png',
        { frameWidth: 32, frameHeight: 48 });

    this.load.image("serpent", "assets/snake01.png"); //Sprite serpent


    }


    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        console.log(this)
        // chargement de la carte
        const carteDuNiveau = this.add.tilemap("map02");
    
        // chargement du jeu de tuiles
        const tileset = carteDuNiveau.addTilesetImage(
          "tuiles_jeu", // Nom du tiled dans dossier
          "tuiles_jeu02" // Nom du tiled donner plus haut pour le rapel
        );
    
        // chargement du calque background_01
        const imp = carteDuNiveau.createLayer( //'imp" nom donner au calque si besoin de le rapeller dans le code
            "imp", // Nom du calque tiled
            tileset
        ); 
    
            // chargement du calque background_03
        const sortie_layer01 = carteDuNiveau.createLayer(
            "sortie_layer01",
            tileset
        ); 
    


        
        //CREATION JOUEUR ET PROPRIETES
        this.player = new Player(this, 90,960, 'perso');

        // ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        //this.cameras.main.zoom = 1.5;
    
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);

        sortie_layer01.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer01, () => {
        
            console.log ("test")
            this.scene.switch("manoir", {
                currency: 0,
            });
        })

        plateforme_mobile = this.physics.add.sprite(
            460,
            650,
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

        this.physics.add.collider(this.player, plateforme_mobile, () => {
            console.log ("test")
        });
    }
    



    update() {

    this.player.update ();



    }

};
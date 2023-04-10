import Player from "./player.js";


var keyE;
var keyA;

let plateforme_mobile; 
let tween_mouvement; 
let serpent;
let sortie_layer;
let setCollisionByExclusion = false;

export default class manoir extends Phaser.Scene {
    constructor() {
        
        super("manoir");


    }



    preload() {

        // chargement tuiles de jeu
        this.load.image("tile_set02", "assets/tile/Tile_set.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("bibli", "assets/tile/bibli.json");



        this.load.image("baton01", "assets/baton01.png"); //Sprite baton
        this.load.image("book", "assets/book.png"); //Sprite book
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

        //CREATION BATON
        this.baton01 = this.physics.add.sprite(254, 3584, 'baton01');

        this.player = new Player(this, 7300,3500, 'perso');
        this.player.setSize(150, 230, true);

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

        this.groupe_ennemis = this.physics.add.group();

        this.groupe_soins = this.physics.add.group();

        //Creation des ennemis à partir du layer objet dans Tiled
        map02.getObjectLayer('ennemi_bibli').objects.forEach((objet) => {

            this.groupe_ennemis.create(objet.x, objet.y, 'book'); 

        });



        // pour chaque enfant ennemi du calque
        this.groupe_ennemis.children.each(function(child) {
            
            child.setScale(0.6);

            child.body.allowGravity = false;
            child.body.immovable = true; 

            child.hp = 3; 
        
            tween_mouvement = this.tweens.add({
                targets: [child],  // on applique le tween sur platefprme_mobile
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

          }, this);


        // Collider / Overlap
        this.physics.add.collider(this.player, this.groupe_ennemis, this.player.recoit_degats);

        this.physics.add.collider(this.groupe_ennemis, this.groupe_bullets, this.player.inflige_degats);

        this.physics.add.collider(mur, this.groupe_bullets, this.player.annihilation); // destrction tir quand touche mur

        this.physics.add.overlap(this.player, this.baton01 , this.player.obtain_baton);

        this.physics.add.overlap(this.player, this.groupe_soins , this.player.soigne);

        // Placement UI
        this.ui_hp = this.add.image(-290, -140, "hp3").setOrigin(0,0).setScale(1.4);
        this.ui_hp.setScrollFactor(0);
        this.ui_hp.setDepth(10);

    }



    update() {

        this.player.deplacement ();

        if (this.keyA.isDown) {

            console.log ("test A");
            this.player.attaque(this, this.sprite_tir);
            console.log ("je tire");
        }

        //HP player UI
        if(this.player.hp == 3){
            this.ui_hp.setTexture("hp3");
        }
        if(this.player.hp == 2){
            this.ui_hp.setTexture("hp2");
        }
        if(this.player.hp == 1){
            this.ui_hp.setTexture("hp1");
        }
    }

};
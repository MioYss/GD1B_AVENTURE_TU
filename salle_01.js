import entre_manoir from "./entre_manoir.js";
import Player from "./player.js";


var keyE;
var keyA;


export default class salle_01 extends Phaser.Scene {
    constructor() {
        
        super("salle_01");


    }


    preload() {

        // chargement tuiles de jeu
        this.load.image("tile_set02", "assets/tile/Tile_set.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("manoir_salle_01", "assets/tile/manoir_salle_01.json");


        this.load.image("book", "assets/book.png"); //Sprite book

        this.load.image("baton01", "assets/baton01.png"); //Sprite baton

        this.load.image("sprite_tir", "assets/projectile.png"); //Sprite tir
    
        //UI
        this.load.image('hp3', 'assets/UI/ui_pv03.png',); // Hp3
        this.load.image('hp2', 'assets/UI/ui_pv02.png',); // Hp2
        this.load.image('hp1', 'assets/UI/ui_pv01.png',); // Hp1
        this.load.image('baton', 'assets/UI/baton_ui.png',); // Hp1



    }



    create() {

        //init(data);{ this.hp = data.hp; };

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        console.log(this)

        

        // chargement de la carte
        const map03 = this.add.tilemap("manoir_salle_01");
    
        // chargement du jeu de tuiles
        const tileset = map03.addTilesetImage(
          "Tile_set", // Nom du tiled dans dossier
          "tile_set02" // Nom du tiled donner plus haut pour le rapel
        );


        // chargement du changement de zone
       /* const sortie_layer_jardin = map03.createLayer(
            "sortie_layer_jardin",
            tileset
        ); 

        const sortie_layer_boss = map03.createLayer(
            "sortie_layer_boss",
            tileset
        );*/

        const sortie_layer_bibli = map03.createLayer(
            "sortie_layer_bibli",
            tileset
        );

        const sortie_layer_03 = map03.createLayer( // entre_manoir
            "sortie_layer_03",
            tileset
        );

        const sol = map03.createLayer( // nom donner au calque si besoin de le rapeller dans le code
            "sol", // Nom du calque tiled
            tileset
        );

        const mur = map03.createLayer( // nom donner au calque si besoin de le rapeller dans le code
            "mur", // Nom du calque tiled
            tileset
        );

        const objet = map03.createLayer( // nom donner au calque si besoin de le rapeller dans le code
            "objet", // Nom du calque tiled
            tileset
        );

        this.player = new Player (this, 1920,3500, 'perso');
        this.player.setSize(150, 230, true);

        sortie_layer_03.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer_03, () => {
        
            console.log ("test")
            this.scene.switch("entre_manoir", {
                currency: 0,
            });
        })

        sortie_layer_bibli.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer_bibli, () => {
        
            console.log ("test")
            this.scene.switch("manoir", {
                currency: 0,
            });
        })



        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 3840, 3840);
        this.cameras.main.zoom = 0.65;
        this.physics.world.setBounds(0, 0, 3840, 3840);
        //Mise en place de la caméra qui suit le joueur
        this.cameras.main.startFollow(this.player);


        //Creation tir 
        this.groupe_bullets = this.physics.add.group();

        //COLLIDER JOUEURS AVEC MAP
        this.physics.add.collider(this.player, mur);

        //Collisions avec tileset
        mur.setCollisionByExclusion(-1, true);

        // Placement UI
        this.ui_hp = this.add.image(-290, -140, "hp3").setOrigin(0,0).setScale(1.4);
        this.ui_hp.setScrollFactor(0);
        this.ui_hp.setDepth(10);     
        
        //Creation tir 
        this.groupe_bullets = this.physics.add.group();

        this.groupe_ennemis = this.physics.add.group();

        this.groupe_soins = this.physics.add.group();

        //Creation des ennemis à partir du layer objet dans Tiled
        map03.getObjectLayer('ennemi').objects.forEach((objet) => {

            this.groupe_ennemis.create(objet.x, objet.y, 'book'); 

        });
        

    }



    update() {

        this.player.deplacement ();

        if (this.keyA.isDown) {

            console.log ("test A");
            this.player.attaque(this, this.sprite_tir);
            console.log ("je tire");
            console.log (this)
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
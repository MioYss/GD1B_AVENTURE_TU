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

        this.load.image("tuiles_jeu03", "assets/e/tuiles_jeu.png");
        // chargement de la carte
        this.load.tilemapTiledJSON("map03", "assets/e/map03.json");
    }



    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        console.log(this)
        // chargement de la carte
        const carteDuNiveau = this.add.tilemap("map03");

        const tileset = carteDuNiveau.addTilesetImage(
            "tuiles_jeu",
            "tuiles_jeu03"
        );

        // chargement du calque background_02 (les élements qui passent devant le joueur)
        const imp2 = carteDuNiveau.createLayer(
            "imp2",
            tileset
            );

        // chargement du calque background_principal_01 (platfromes)
        const sortie_layer02 = carteDuNiveau.createLayer(
            "sortie_layer02",
            tileset
        );

        this.player = new Player(this, 90,960, 'perso');

        sortie_layer02.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sortie_layer02, () => {
        
            console.log ("test")
            this.scene.switch("entre_manoir", {
                currency: 0,
            });
        })
    }



    update() {

        this.player.deplacement ();
        
        
    }

};
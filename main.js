var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [menu,manoir,entre_manoir]
};
var game = new Phaser.Game(config);
export default class Fire {
    constructor(config, scene) {
        this.config = config;
        this.scene = scene;
        scene.load.image('fire', 'assets/fire.jpg');
        scene.load.audio('fire', 'assets/fire.wav');
        scene.load.audio('burn', 'assets/burn.wav');
    }

    create() {
        this.fireSprite = this.scene.add.sprite(this.scene.xPos(0), 0, 'fire');
        this.fireSprite.setScale(0.45);
        this.fireSprite.setY(this.config.height - this.fireSprite.displayHeight / 2);
        this.fireSound = this.scene.sound.add('fire', {loop: true});
        this.fireSound.setVolume(0.2);
        this.fireSound.play();
        this.burnSound = this.scene.sound.add('burn');
        this.burnSound.setVolume(0.7);
    }

    burn() {
        this.burnSound.play();
    }
}


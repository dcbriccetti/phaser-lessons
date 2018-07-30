export default class Fire {
    constructor(width, height, scene) {
        this.width = width;
        this.height = height;
        this.scene = scene;
        scene.load.image('fire', 'assets/fire.jpg');
        scene.load.audio('fire', 'assets/fire.wav');
        scene.load.audio('burn', 'assets/burn.wav');
    }

    create() {
        this.fireSprite = this.scene.add.sprite(this.scene.xPos(0), 0, 'fire');
        this.fireSprite.setScale(0.45);
        this.fireSprite.setY(this.height - this.fireSprite.displayHeight / 2);
        this.fireSound = this.scene.sound.add('fire', {loop: true});
        this.setAmbientVolume(0);
        this.fireSound.play();
        this.burnSound = this.scene.sound.add('burn');
        this.burnSound.setVolume(0.7);
    }

    setAmbientVolume(volume) {
        this.fireSound.setVolume(volume);
    }

    burn() {
        this.burnSound.play();
    }

    consume() {
        if (!this.consuming) {
            this.consuming = true;
            this.scene.tweens.add({targets: [this.fireSprite],
                scaleX: 3, scaleY: 3,
                alpha: 0.5,
                x: this.width / 2,
                y: this.height / 2,
                duration: 1000});
        }
    }
}


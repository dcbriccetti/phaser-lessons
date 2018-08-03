import {config, a} from './config.js'

/** Manages the lose place sprite and related sounds */
export default class LosePlace {
    constructor(width, height, scene) {
        this.width = width;
        this.height = height;
        this.scene = scene;
        const lp = config.losePlace;
        scene.load.image('losePlace', a(lp.image));
        scene.load.audio('losePlace', a(lp.ambientSound));
        scene.load.audio('lose',      a(lp.loseSound));
    }

    create() {
        this.losePlaceSprite = this.scene.add.sprite(this.scene.xPos(0), 0, 'losePlace');
        this.losePlaceSprite.setScale(0.6);
        this.losePlaceSprite.setY(this.height - this.losePlaceSprite.displayHeight / 2);
        this.losePlaceSound = this.scene.sound.add('losePlace', {loop: true});
        this.setAmbientVolume(0);
        this.losePlaceSound.play();
        this.loseSound = this.scene.sound.add('lose');
        this.loseSound.setVolume(0.7);
    }

    setAmbientVolume(volume) {
        this.losePlaceSound.setVolume(volume);
    }

    lose() {
        this.loseSound.play();
    }

    /** Makes the lose place grow to cover the background, while reducing opacity so the score will still show */
    consumeTheWorld() {
        if (!this.consuming) {
            this.consuming = true;
            this.scene.tweens.add({targets: [this.losePlaceSprite],
                scaleX: 3, scaleY: 3,
                alpha: 0.5,
                x: this.width / 2, y: this.height / 2,
                duration: 1000});
        }
    }
}


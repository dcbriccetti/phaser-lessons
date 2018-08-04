/**
 * The main part of the Sort or Burn game
 */

import LosePlace from './losePlace.js';
import Targets from './targets.js';
import Saveees from './saveees.js';
import Text from './text.js';
import {config, a} from './config.js'

let game;

class MainScene extends Phaser.Scene {
    preload() {
        const cfg = game.config;
        this.losePlace = new LosePlace(cfg.width, cfg.height, this);
        this.level = 1;
        this.targets = new Targets(cfg.height, this);
        this.saveees = new Saveees(this);
        this.text = new Text(cfg.width, this);
        this.load.image("background",  a(config.background.image));
    }

    create() {
        this.createBackground();
        [this.text, this.targets, this.losePlace].forEach(m => m.create());
        this.targets.setPushListener(target => this.saveees.selectTarget(target));
        this.input.keyboard.on('keydown', event => {
            const keyNum = parseInt(event.key);
            if (keyNum > 0 && keyNum <= this.numTargets())
                this.saveees.selectTarget(this.targets.targetSprites[keyNum - 1]);
        });
        this.text.setNumLostListener(numLost => {
            this.losePlace.setAmbientVolume(numLost / config.maxLosses);
            if (numLost >= config.maxLosses) {
                this.losePlace.consumeTheWorld();
                this.saveees.stop();
            }
        });
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {
                if (this.level < 10) {
                    ++this.level;
                    this.text.setLevel(this.level);
                    this.saveees.setLevel(this.level);
                    this.targets.setNumTargets(this.numTargets());
                }
            }
        });
    }

    createBackground() {
        const s = this.add.sprite(0, 0, "background");
        s.setAlpha(0.4).setScale(1).setOrigin(0);
    }

    xPos(column) {
        const cols = config.saveeeInfos.length + 1;
        return (game.config.width / cols) * column + (game.config.width / cols) / 2;
    }

    numTargets() {
        return this.level >= 5 ? 3: this.level < 2 ? 1 : 2;
    }

    saveeeInfoSubset() {
        return config.saveeeInfos.slice(0, this.numTargets());
    }
}

window.onload = () => {
    function resizeGame() {
        const canvas = document.querySelector("canvas");
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowRatio = windowWidth / windowHeight;
        const gameRatio = game.config.width / game.config.height;
        if (windowRatio < gameRatio) {
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        } else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }

    const backgroundHeight = 750;
    const wh = 3/4;
    game = new Phaser.Game({
        type: Phaser.AUTO,
        width: backgroundHeight * wh,
        height: backgroundHeight,
        backgroundColor: config.backgroundColor,
        scene: [MainScene]
    });
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
};


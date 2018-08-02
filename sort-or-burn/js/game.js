/**
 * The main part of the Sort or Burn game
 */

import Fire from './fire.js';
import Targets from './targets.js';
import Saveees from './saveees.js';
import Text from './text.js';

let game;

class MainScene extends Phaser.Scene {
    preload() {
        const cfg = game.config;
        this.fire = new Fire(cfg.width, cfg.height, this);
        this.saveeeInfos = [
            ["Monkeys", "monkeys.jpg", 200, 150],
            ["Birds",   "birds.jpg",   200, 150],
            ["Cats",    "cats.jpg",    200, 150],
        ];
        this.maxBurnedTargets = 10;
        this.level = 1;
        this.targets = new Targets(cfg.height, this);
        this.saveees = new Saveees(this);
        this.text = new Text(cfg.width, this);
        this.load.image("background",  "assets/jungle.jpg");
    }

    create() {
        this.createBackground();
        [this.text, this.targets, this.fire].forEach(m => m.create());
        this.input.on("pointerdown", event => this.saveees.selectTarget(this.targets.closest(event.x, event.y)), this);
        this.input.keyboard.on('keydown', event => {
            const keyNum = parseInt(event.key);
            if (keyNum > 0 && keyNum <= this.numTargets())
                this.saveees.selectTarget(this.targets.targetSprites[keyNum - 1]);
        });
        this.text.setBurnedChangeListener(numBurned => {
            this.fire.setAmbientVolume(numBurned / this.maxBurnedTargets);
            if (numBurned >= this.maxBurnedTargets) {
                this.fire.consumeTheWorld();
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
        s.setAlpha(0.4);
        s.setScale(0.5);
        s.setOrigin(0);
    }

    xPos(column) {
        const cols = this.saveeeInfos.length + 1;
        return (game.config.width / cols) * column + (game.config.width / cols) / 2;
    }

    numTargets() {
        return this.level < 5 ? this.level < 2 ? 1 : 2 : 3;
    }

    saveeeInfoSubset() {
        return this.saveeeInfos.slice(0, this.numTargets());
    }
}

window.onload = () => {
    game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 700,
        height: 700,
        backgroundColor: '#eeeeee',
        scene: [MainScene]
    });
};

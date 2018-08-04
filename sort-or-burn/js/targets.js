import {config, a} from './config.js'

export default class Targets {
    constructor(height, scene) {
        this.height = height;
        this.scene = scene;
        scene.load.image("target", a(config.targets.image));
    }

    create() {
        const h = this.height;
        this.targetSprites = [];
        this.targetTexts = [];
        config.saveeeInfos.forEach((bookInfo, index) => {
            const xTarget = this.scene.xPos(index + 1);
            const targetSprite = this.scene.add.sprite(xTarget, 0, 'target');
            targetSprite.setInteractive();
            targetSprite.on('pointerdown', () => {if (this.pushListener) this.pushListener(targetSprite);});
            targetSprite.setScale(0.25);
            targetSprite.setY(h - targetSprite.displayHeight / 2);
            const targetName = bookInfo[0];
            targetSprite.targetName = targetName;
            this.targetSprites.push(targetSprite);
            this.targetTexts.push(this.scene.add.text(xTarget, h - 5, targetName,
                {font: "16px sans-serif", color: "black"}).setOrigin(0.5, 1));
        });
        this.setNumTargets(this.scene.numTargets());
    }

    setNumTargets(numTargets) {
        for (let i = 0; i < this.targetSprites.length; i++) {
            this.targetSprites[i].alpha = this.targetTexts[i].alpha = i >= numTargets ? 0.5 : 1;
        }
    }

    setPushListener(listener) {this.pushListener = listener;}
}

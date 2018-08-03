import {config} from './config.js'

export default class Text {
    constructor(width, scene) {
        this.width = width;
        this.scene = scene;
        this.numSaved = this.numLost = 0;
        this.level = 1;
    }

    create() {
        const textLeft = this.width / 3;
        this.scene.add.text(textLeft, 50, config.title, {font: "50px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.scene.add.text(textLeft, 120, config.introduction,
            {font: "20px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.sortedText = this.scene.add.text(textLeft, 220, "",
            {font: "30px monospace", color: "black"}).setOrigin(0, 0.5);
        this.update();
    }

    update() {
        this.sortedText.setText(`Level: ${this.level}\nSaved: ${this.numSaved}\nLost:  ${this.numLost}`);
    }

    addSorted() {
        ++this.numSaved;
        this.update();
    }

    addLost() {
        ++this.numLost;
        this.update();
        if (this.numLostListener) {
            this.numLostListener(this.numLost);
        }
    }

    setNumLostListener(listener) {
        this.numLostListener = listener;
    }

    setLevel(level) {
        this.level = level;
        this.update();
    }
}

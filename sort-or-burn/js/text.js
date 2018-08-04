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
        this.scene.add.text(textLeft, 50, config.title, {font: 'bold 40px Arial', color: 'black'}).setOrigin(0, 0.5);
        this.scene.make.text({
            x: textLeft, y: 150,
            text: config.introduction,
            origin: {x: 0, y: 0.5},
            style: {
                font: '25px Arial',
                fill: 'black',
                wordWrap: {width: 370}
            }
        });
        this.scene.add.text(textLeft, 270, ['Level:', 'Saved:', 'Lost:'],
            {font: 'bold 25px Arial', color: 'black'}).setOrigin(0, 0.5);
        this.numbers = this.scene.add.text(textLeft + 100, 270, '',
            {font: 'bold 25px Arial', color: 'black', align: 'right'}).setOrigin(0, 0.5);
        this.update();
    }

    update() {
        this.numbers.setText([this.level, this.numSaved, this.numLost]);
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

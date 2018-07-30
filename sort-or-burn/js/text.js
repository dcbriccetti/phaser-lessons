export default class Text {
    constructor(width, scene) {
        this.width = width;
        this.scene = scene;
        this.numSorted = this.numBurned = 0;
        this.level = 1;
    }

    create() {
        const textLeft = this.width / 2;
        this.scene.add.text(textLeft, 50, "Sort or Burn", {font: "50px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.scene.add.text(textLeft, 120,
            "Save library books by sorting them\nbefore they burn. Use mouse/touch\nor number keys.",
            {font: "20px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.sortedText = this.scene.add.text(textLeft, 220, "",
            {font: "30px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.update();
    }

    addSorted() {
        ++this.numSorted;
        this.update();
    }

    addBurned() {
        ++this.numBurned;
        this.update();
        if (this.burnedChangeListener) {
            this.burnedChangeListener(this.numBurned);
        }
    }

    setBurnedChangeListener(listener) {
        this.burnedChangeListener = listener;
    }

    setLevel(level) {
        this.level = level;
        this.update();
    }

    update() {
        this.sortedText.setText(`Level: ${this.level}\nSaved: ${this.numSorted}\nBurned: ${this.numBurned}`);
    }

}
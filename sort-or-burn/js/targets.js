export default class Targets {
    constructor(height, scene) {
        this.height = height;
        this.scene = scene;
        scene.load.image("target", "assets/teleporter.png");
    }

    create() {
        const h = this.height;
        this.targetSprites = [];
        this.targetTexts = [];
        this.scene.saveeeInfos.forEach((bookInfo, index) => {
            const xTarget = this.scene.xPos(index + 1);
            const targetSprite = this.scene.add.sprite(xTarget, h * 0.86, 'target');
            targetSprite.setScale(0.25);
            const targetName = bookInfo[0];
            targetSprite.targetName = targetName;
            this.targetSprites.push(targetSprite);
            this.targetTexts.push(this.scene.add.text(xTarget, h * 0.985, targetName,
                {font: "16px sans-serif", color: "black"}).setOrigin(0.5));
        });
        this.setNumTargets(this.scene.numTargets());
    }

    setNumTargets(numTargets) {
        for (let i = 0; i < this.targetSprites.length; i++) {
            this.targetSprites[i].alpha = this.targetTexts[i].alpha = i >= numTargets ? 0.5 : 1;
        }
    }
    closest(x, y) {
        function distanceTo(targetSprite) {return Phaser.Math.Distance.Between(x, y, targetSprite.x, targetSprite.y);}
        return this.targetSprites.reduce((a, b) => distanceTo(a) < distanceTo(b) ? a : b);
    }
}

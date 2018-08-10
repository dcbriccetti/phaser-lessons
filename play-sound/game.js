
class MainScene extends Phaser.Scene {
    preload() {
        this.load.audio('triangle', 'triangle.wav');
    }

    create() {
        this.ting = this.sound.add('triangle', {loop: false});
        this.ting.play();
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1,
    height: 1,
    backgroundColor: 0xffffff,
    scene: [MainScene]
});

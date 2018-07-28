window.onload = () => {
    class MainScene extends Phaser.Scene {
        create() {
            this.add.text(game.config.width / 2, game.config.height / 2, 'Hello, world!', {
                font: "95px Serif",
                color: "white"
            }).setOrigin(0.5);
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 200,
        backgroundColor: 0x4127CC,
        scene: [MainScene]
    });
};

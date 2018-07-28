window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image("hello", "hello.png");
        }

        create() {
            this.hello = this.add.sprite(game.config.width / 2, game.config.height / 2, "hello");
        }

        update() {
            this.hello.angle += .1;
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        backgroundColor: 0x4127CC,
        scene: [MainScene]
    });
};

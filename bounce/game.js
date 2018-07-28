window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image("ball", "ball.png");
        }

        create() {
            const ball = this.ball = this.physics.add.sprite(game.config.width / 2, 50, "ball");
            ball.setBounce(0.95);
            ball.setCollideWorldBounds(true);
            ball.setVelocity(100, 0);
            ball.body.drag.set(4);
            ball.setScale(0.25);
        }

        update() {
            this.ball.setAngularVelocity(this.ball.body.velocity.x * 1.4);
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 2000},
            }
        },
        backgroundColor: '#eeeeee',
        scene: [MainScene]
    });
};

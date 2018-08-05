window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image("ball", "ball.png");
        }

        create() {
            this.balls = this.add.group();
            this.time.addEvent({ delay: 500, loop: true, callback: () => this.addBall() })
            this.physics.add.collider(this.balls, this.balls);
        }

        update() {
            if (this.balls.getChildren().length > 10) {
                const ball = this.balls.getFirstAlive();
                this.tweens.add({targets: [ball], alpha: 0, duration: 500, onComplete: () => ball.destroy()});
            }
            this.balls.getChildren().forEach(ball =>
                ball.setAngularVelocity(ball.body.velocity.x * 1.4));
        }

        addBall() {
            const ball = this.physics.add.sprite(game.config.width / 2, 50, "ball");
            this.balls.add(ball);
            ball.setBounce(0.7);
            ball.setDrag(1);
            ball.setCollideWorldBounds(true);
            ball.setVelocity(Phaser.Math.Between(-400, 400), 0);
            ball.setScale(0.25);
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 1000},
            }
        },
        backgroundColor: '#eeeeee',
        scene: [MainScene]
    });
};

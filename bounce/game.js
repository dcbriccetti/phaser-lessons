window.onload = () => {
    class MainScene extends Phaser.Scene {
        init() {
            this.frame = 0;
            this.dx = 3;
        }

        preload() {
            this.load.image("ball", "ball.png");
        }

        create() {
            this.ball = this.add.sprite(game.config.width / 2, game.config.height / 2, "ball");
            const ballScale = 0.25;
            this.ball.setScale(ballScale);
            this.scaledBallHalfWidth = (this.ball.width / 2) * ballScale;
        }

        update() {
            const h = game.config.height * 0.9;
            this.ball.y = 40 + h - Math.abs(Math.cos(++this.frame / 30)) * h;
            this.ball.x += this.dx;
            this.ball.angle += this.dx * 2;
            if (this.ball.x < this.scaledBallHalfWidth || this.ball.x > game.config.width - this.scaledBallHalfWidth) {
                this.dx *= -1;
            }
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        backgroundColor: '#eeeeee',
        scene: [MainScene]
    });
};

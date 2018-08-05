window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image('player', 'assets/' + 'eagle.jpg');
        }

        create() {
            this.player = this.physics.add.sprite(100, game.config.height / 2, 'player');
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        update() {
            const moveAmt = 200;
            this.player.setDrag(500);

            if (this.cursors.right.isDown) this.player.setVelocityX(moveAmt);
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
        },
        backgroundColor: 0x9cbbd8,
        scene: [MainScene]
    });
};


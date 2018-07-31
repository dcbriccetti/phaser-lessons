window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.spritesheet('star', 'assets/stars.png', {frameWidth: 200, frameHeight: 200});
        }

        create() {
            this.animating = false;
            this.player = this.add.sprite(200, 200, 'star');
            this.cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.on('keydown_SPACE', () => {
                if (this.animating) {
                    this.player.anims.stop();
                    this.animating = false;
                } else {
                    this.player.anims.play('twinkle', true);
                    this.animating = true;
                }
            });

            this.anims.create({
                key: 'twinkle',
                frames: this.anims.generateFrameNumbers('star', {frames: [0, 1, 2, 1]}),
                frameRate: 6, repeat: -1
            });
        }

        update() {
            const c = this.cursors;

            if (c.left.isDown)  this.player.x -= 2;
            if (c.right.isDown) this.player.x += 2;
            if (c.up.isDown)    this.player.y -= 2;
            if (c.down.isDown)  this.player.y += 2;
        }
    }

    new Phaser.Game({
        type: Phaser.AUTO,
        width: 400,
        height: 400,
        backgroundColor: 0xd0d0d0,
        scene: [MainScene]
    });
};

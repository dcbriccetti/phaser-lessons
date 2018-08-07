window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            'cat monkey diamond'.split(' ').forEach(name => this.load.image(name, name + '.png'));
        }

        create() {
            this.cat = this.physics.add.sprite(100, 100, 'cat');
            this.monkey = this.physics.add.sprite(game.config.width - 100, 100, 'monkey');
            this.diamonds = this.physics.add.group();
            this.time.addEvent({delay: 2000, loop: true, callback: () => this.addDiamond()});
            this.physics.add.collider(this.diamonds, this.diamonds);
            this.cursors = this.input.keyboard.createCursorKeys();
            this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            [this.cat, this.monkey].forEach(player => {
                this.physics.add.overlap(player, this.diamonds, this.collect, undefined, this);
            });
            this.numbers = this.add.text(game.config.width / 2, 20, '',
                {font: 'bold 25px Arial', color: 'black', align: 'right'}).setOrigin(0.5, 0);
            this.monkeyScore = 0;
            this.addDiamond();
        }

        update() {
            this.cat.setVelocityY(0);
            this.monkey.setVelocityY(0);

            if (this.cursors.left.isDown)   this.monkey.setX(this.monkey.x - 5);
            if (this.cursors.right.isDown)  this.monkey.setX(this.monkey.x + 5);
            if (this.cursors.up.isDown)     this.monkey.setY(this.monkey.y - 5);
            if (this.cursors.down.isDown)   this.monkey.setY(this.monkey.y + 5);

            if (this.keyS.isDown)   this.cat.setY(this.cat.y + 3);
        }

        addDiamond() {
            const diamond = this.physics.add.sprite(Phaser.Math.Between(50, game.config.width - 50),
                Phaser.Math.Between(50, game.config.height - 50), 'diamond');
            this.diamonds.add(diamond);
            diamond.setCollideWorldBounds(true);
        }

        collect(player, diamond) {
            if (player === this.monkey) ++this.monkeyScore;
            diamond.destroy();
            this.numbers.setText(`Monkey: ${this.monkeyScore}`);
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 10},
            }
        },
        backgroundColor: '#eeeeee',
        scene: [MainScene]
    });
};

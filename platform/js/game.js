// Adapted from https://phaser.io/tutorials/making-your-first-phaser-3-game

class MainScene extends Phaser.Scene {
    preload() {
        this.score = 0;
        this.gameOver = false;
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create() {
        this.level = 0;
        this.add.image(400, 300, 'sky');
        this.createPlatforms();
        const player = this.createPlayer();
        const stars = this.stars = this.physics.add.group({
            key: 'star', repeat: 9, setXY: {x: 12, y: 0, stepX: 70}});
        const bombs = this.bombs = this.physics.add.group();
        this.scoreText = this.add.text(16, 16, '', {fontSize: '32px', fill: '#000'});
        [player, stars, bombs].forEach(obj => this.physics.add.collider(obj, this.platforms));
        this.physics.add.collider(player, stars, this.collectStar, null, this);
        this.physics.add.collider(player, bombs, this.playerHitBomb, null, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.advanceLevel();
    }

    update() {
        if (this.gameOver) {
            return;
        }
        this.movePlayer();
    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.05).setCollideWorldBounds(true);
        this.createPlayerAnimations();
        return this.player;
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody(); // The ground
        [[600, 400], [50, 250], [750, 220]].forEach(xy => this.platforms.create(xy[0], xy[1], 'platform'));
    }

    movePlayer() {
        const player = this.player;
        const cursors = this.cursors;

        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        } else if (cursors.down.isDown) {
            player.setVelocityY(330);
        }
    }

    createPlayerAnimations() {
        this.anims.create({key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10, repeat: -1});

        this.anims.create({key: 'turn',
            frames: [{key: 'dude', frame: 4}], frameRate: 20});

        this.anims.create({key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10, repeat: -1});
    }

    advanceLevel() {
        ++this.level;
        this.stars.children.iterate(star => {
            star.enableBody(true, star.x, 0, true, true);
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            star.setCollideWorldBounds(true);
            star.setVelocity(Phaser.Math.Between(-40, 40), 0);
        });
        this.createBomb();
        this.updateHud();
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        if (this.stars.countActive(true) === 0) this.advanceLevel();
        this.updateHud();
    }

    updateHud() {
        this.scoreText.setText('Level: ' + this.level + '\nScore: ' + this.score);
    }

    createBomb() {
        const xAwayFromPlayer = (this.player.x < 400) ?
            Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = this.bombs.create(xAwayFromPlayer, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }

    playerHitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
        }
    },
    scene: [MainScene]
});

class MainScene extends Phaser.Scene {

    preload() {
        this.oscillator = this.createOscillator();
        this.load.image('ship', 'assets/UFO.png');
    }

    create() {
        const ship = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'ship');
        ship.setScale(0.25);
        ship.body.drag.set(100);
        this.ship = ship;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
        this.message = this.add.text(10, game.config.height - 30, '', {
            font: "20px Serif",
            color: "white"
        }).setOrigin(0);
    }

    update() {
        const acceleration = 100;
        let xAccel = 0;
        let yAccel = 0;

        if (this.cursors.right.isDown) {
            xAccel = acceleration;
        } else if (this.cursors.left.isDown) {
            xAccel = -acceleration;
        }
        if (this.cursors.up.isDown) {
            yAccel = -acceleration;
        } else if (this.cursors.down.isDown) {
            yAccel = acceleration;
        }
        if (this.dKey.isDown) this.handleDButton();
        if (this.spaceKey.isDown) this.handleSpaceButton();
        this.ship.setAcceleration(xAccel, yAccel);
        this.oscillator.frequency.value = 65 +
            (Math.abs(this.ship.body.velocity.x) + Math.abs(this.ship.body.velocity.y)) / 2;
        this.message.setText(this.makeMessage());
    }

    makeMessage() {
        const body = this.ship.body;
        const accel = body.acceleration;
        const velX = Math.round(body.velocity.x);
        const velY = Math.round(body.velocity.y);
        const posX = Math.round(body.position.x);
        const posY = Math.round(body.position.y);
        return `Position: (${posX}, ${posY}), velocity: (${velX}, ${velY}), acceleration: (${accel.x}, ${accel.y}); drag: ${body.drag.x}`;
    };

    handleDButton() {
        const change = 10 * (this.dKey.shiftKey ? 1 : -1);
        this.ship.body.drag.set(this.ship.body.drag.x + change);
    };

    handleSpaceButton() {
        this.ship.body.velocity.set(0, 0);
    };

    createOscillator() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 65;
        oscillator.start();
        return oscillator;
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    backgroundColor: 0x0000a0,
    physics: {
        default: 'arcade',
    },
    scene: [MainScene]
});

window.onload = () => {
    const message = 'Learn about JavaScript';
    const taskTime = 5;

    class MainScene extends Phaser.Scene {
        create() {
            this.start = Date.now();
            this.add.text(game.config.width / 2, 40, message, {
                font: "40px Serif",
                color: "white"
            }).setOrigin(0.5);
            this.remaining = this.add.text(game.config.width / 2, 100, '', {
                font: "40px Serif",
                color: "white"
            }).setOrigin(0.5);
            this.time.addEvent({delay: 1000, loop: true, callback: () => this.showTime()});
            this.showTime();
        }

        showTime() {
            const secondsLeft = Math.round(taskTime - (Date.now() - this.start) / 1000);
            const secondsLeftText = 'Seconds left: ' + secondsLeft;
            this.remaining.setText(secondsLeft >= 0 ? secondsLeftText : '');
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 150,
        backgroundColor: 0x4127CC,
        scene: [MainScene]
    });
};

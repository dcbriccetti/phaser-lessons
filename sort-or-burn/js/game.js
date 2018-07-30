import Fire from './fire.js';
import Carts from './carts.js';
import Books from './books.js';
import Text from './text.js';

let game;

class MainScene extends Phaser.Scene {
    preload() {
        const cfg = game.config;
        this.fire = new Fire(cfg.width, cfg.height, this);
        this.bookInfos = [
            ["Children",    "childbooks.png", 150, 187],
            ["Adult",       "adultbooks.png", 132, 200],
        ];
        this.maxBurnedBooks = 10;
        this.carts = new Carts(cfg.height, this);
        this.books = new Books(this);
        this.text = new Text(cfg.width, this);
        this.load.image("library",  "assets/library.jpg");
    }

    create() {
        this.createBackground();
        [this.text, this.carts, this.fire].forEach(m => m.create());
        this.input.on("pointerdown", event => this.books.selectCart(this.carts.closest(event.x, event.y)), this);
        this.input.keyboard.on('keydown', event => {
            const keyNum = parseInt(event.key);
            if (keyNum > 0 && keyNum <= this.bookInfos.length)
                this.books.selectCart(this.carts.cartSprites[keyNum - 1]);
        });
        this.text.setBurnedChangeListener(numBurned => {
            this.fire.setAmbientVolume(numBurned / this.maxBurnedBooks)
            if (numBurned >= this.maxBurnedBooks) {
                this.fire.consume();
                this.books.stop();
            }
        });
    }

    createBackground() {
        const lib = this.add.sprite(0, 0, "library");
        lib.setAlpha(0.2);
        lib.setScale(0.6);
        lib.setOrigin(0);
    }

    xPos(column) {
        const cols = this.bookInfos.length + 1;
        return (game.config.width / cols) * column + (game.config.width / cols) / 2;
    }
}

window.onload = () => {
    game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 700,
        height: 700,
        backgroundColor: '#eeeeee',
        scene: [MainScene]
    });
};

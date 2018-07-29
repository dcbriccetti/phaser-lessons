let game;

class MainScene extends Phaser.Scene {
    preload() {
        this.bookInfos = [
            ["Children",    ["childbook1.png", "childbook2.png"]],
            ["Adult",       ["book.png"]],
        ];
        this.load.image("library",  "library.jpg");
        this.load.image("cart",     "cart.png");
        this.load.image("fire",     "fire.jpg");

        for (let bookInfo of this.bookInfos) {
            bookInfo[1].forEach((filename, index) => {
                this.load.image(bookInfo[0] + index, filename);
            });
        }

        this.load.audio('fire', ['fire.wav',]);
        this.load.audio('burn', ['burn.wav',]);
    }

    create() {
        this.bookToFireTimeMs = 5000;
        this.maxBookCreationPeriodMs = 6000;
        const textLeft = game.config.width / 2;
        this.add.text(textLeft, 50, "Sort or Burn", {font: "50px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.add.text(textLeft, 120, "Rescue library books by sorting them\nbefore they burn. Use mouse/touch\nor number keys.", {font: "20px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.numSorted = this.numBurned = 0;
        this.sortedText = this.add.text(textLeft, 200, "", {font: "30px sans-serif", color: "black"}).setOrigin(0, 0.5);
        this.createBackground();
        this.bookGroup = this.add.group();
        this.createCarts();
        this.createBookAfterDelay(1000);
        this.createSpeedupEvent();
        this.input.on("pointerdown", event => this.sort(this.closestCart(event.x, event.y)), this);
        this.input.keyboard.on('keydown', event => {
            const keyNum = parseInt(event.key);
            if (keyNum > 0 && keyNum <= this.bookInfos.length)
                this.sort(this.carts[keyNum - 1]);
        });
        this.createFire();
    }

    createFire() {
        this.fire = this.add.sprite(this.xPos(0), 0, 'fire');
        this.fire.setScale(0.45);
        this.fire.setY(game.config.height - this.fire.displayHeight / 2);
        this.fireSound = this.sound.add('fire', {loop: true});
        this.fireSound.setVolume(0.2);
        this.fireSound.play();
        this.burnSound = this.sound.add('burn');
        this.burnSound.setVolume(0.7);
    }

    createCarts() {
        const h = game.config.height;
        this.carts = [];
        this.bookInfos.forEach((bi, index) => {
            const x = this.xPos(index + 1);
            const cart = this.add.sprite(x, h * 0.9, 'cart');
            const cartName = bi[0];
            cart.cartName = cartName;
            cart.setScale(0.1);
            this.carts.push(cart);
            this.add.text(x, h * 0.98, cartName, {
                font: "16px sans-serif",
                color: "black"
            }).setOrigin(0.5);
        });
        return h;
    }

    createBackground() {
        const lib = this.add.sprite(0, 0, "library");
        lib.setAlpha(0.2);
        lib.setScale(0.6);
        lib.setOrigin(0);
    }

    updateText() {
        this.sortedText.setText(`Sorted: ${this.numSorted}\nBurned: ${this.numBurned}`);
    }

    createBookAfterDelay(delay) {
        this.time.addEvent({
            delay: delay,
            callback: () => {
                this.addBook();
                this.createBookAfterDelay(Phaser.Math.Between(500, this.maxBookCreationPeriodMs));
            },
            callbackScope: this,
        });
    }

    createSpeedupEvent() {
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {
                if (this.bookToFireTimeMs >= 1000)
                    this.bookToFireTimeMs -= 500;
                if (this.maxBookCreationPeriodMs >= 1000)
                    this.maxBookCreationPeriodMs -= 500;
            },
        });
    }

    addBook() {
        const bookInfo = this.bookInfos[Phaser.Math.Between(0, this.bookInfos.length - 1)];
        const category = bookInfo[0];
        const bookKey = category + Phaser.Math.Between(0, bookInfo[1].length - 1);
        const book = this.add.sprite(this.xPos(0), -50, bookKey);
        book.bookCategory = category;
        this.bookGroup.add(book);
        book.setScale(0.35);
        book.movementTween = this.tweens.add({
            targets: [book],
            x: this.fire.x,
            y: this.fire.y,
            duration: this.bookToFireTimeMs,
            onComplete: tween => {
                this.bookGroup.remove(book);
                this.burnBook(book);
            }
        });
    }

    xPos(column) {
        const cols = this.bookInfos.length + 1;
        return (game.config.width / cols) * column + (game.config.width / cols) / 2;
    }

    sort(cart) {
        const book = this.bookGroup.getFirstAlive();
        if (! book) return;

        if (book.movementTween) {
            book.movementTween.stop();
            book.movementTween = undefined;
        }
        this.bookGroup.remove(book);
        book.collecting = true;

        this.tweens.add({
            targets: [book], x: cart.x, y: cart.y, duration: 1000,
            onComplete: tween => {
                if (book.bookCategory === cart.cartName) {
                    ++this.numSorted;
                    this.updateText();
                    book.destroy();
                } else {
                    this.moveToFire(book);
                }
            }
        });
    }

    moveToFire(book) {
        this.tweens.add({
            targets: [book], x: this.fire.x, y: this.fire.y, duration: 1000,
            onComplete: tween => this.burnBook(book)
        });
    }

    closestCart(x, y) {
        function distanceTo(cart) {return Phaser.Math.Distance.Between(x, y, cart.x, cart.y);}
        return this.carts.reduce((a, b) => distanceTo(a) < distanceTo(b) ? a : b);
    }

    burnBook(book) {
        ++this.numBurned;
        this.updateText();
        this.burnSound.play();
        this.tweens.add({
            targets: [book], alpha: 0, duration: 500,
            onComplete: tween => book.destroy()
        });
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

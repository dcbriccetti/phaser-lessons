/** Manages the creation, movement and destruction of books. */
export default class Books {
    constructor(scene) {
        this.scene = scene;
        this.running = true;
        this.bookToFireTimeMs = 5000;
        this.maxBookCreationPeriodMs = 6000;
        this.incomingBooks = scene.add.group();
        this.createBookAfterDelay(1000);
        this.setLevel(1);

        scene.bookInfos.forEach(bookInfo =>  {
            scene.load.spritesheet(bookInfo[0], `assets/${bookInfo[1]}`,
                {frameWidth: bookInfo[2], frameHeight: bookInfo[3]});
        });
    }

    createBookAfterDelay(delay) {
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                if (this.running) {
                    this.addBook();
                    this.createBookAfterDelay(Phaser.Math.Between(500, this.maxBookCreationPeriodMs));
                }
            },
        });
    }

    /** Increases book creation frequency and movement speed as the level increases */
    setLevel(level) {
        function map(source, sourceMin, sourceMax, targetStart, targetEnd) {
            const sourceRange = sourceMax - sourceMin;
            const targetRange = targetEnd - targetStart;
            return ((source - sourceMin) / sourceRange) * targetRange + targetStart;
        }
        function mapLevel(targetStart, targetStop) {return map(level, 1, 10, targetStart, targetStop);}

        this.bookToFireTimeMs = mapLevel(5000, 500);
        this.maxBookCreationPeriodMs = mapLevel(4000, 1000);
    }

    /** Adds a randomly-chosen book from a randomly-chosen category and starts it moving toward the fire */
    addBook() {
        const bookInfos = this.scene.bookInfoSubset();
        const bookKey = bookInfos[Phaser.Math.Between(0, bookInfos.length - 1)][0];
        const book = this.scene.add.sprite(this.scene.xPos(0), -50, bookKey);
        const frameIndex = Phaser.Math.Between(0, book.texture.frameTotal - 1 - 1);  // Ignore the base frame
        book.setFrame(frameIndex);
        this.incomingBooks.add(book);
        book.setScale(2 / 3);
        book.movementTween = this.moveToFire(book, this.bookToFireTimeMs, () => this.incomingBooks.remove(book));
    }

    /**
     * Stops the first incoming book from its move toward the fire, and moves it to the selected cart, and
     * then if that the wrong cart, sends it to the fire.
     * @param cart the selected cart
     */
    selectCart(cart) {
        const book = this.incomingBooks.getFirstAlive();
        if (! book) return;

        if (book.movementTween) {
            book.movementTween.stop();
            book.movementTween = undefined;
        }
        this.incomingBooks.remove(book);

        this.scene.tweens.add({
            targets: [book], x: cart.x, y: cart.y, duration: 1000,
            onComplete: tween => {
                if (book.texture.key === cart.cartName) {
                    this.scene.text.addSorted();
                    book.destroy();
                } else {
                    this.moveToFire(book);
                }
            }
        });
    }

    moveToFire(book, duration=1000, onComplete) {
        return this.scene.tweens.add({
            targets: [book], x: this.scene.fire.fireSprite.x, y: this.scene.fire.fireSprite.y, duration: duration,
            onComplete: tween => {
                if (onComplete) onComplete();
                this.burn(book)
            }
        });
    }

    burn(book) {
        this.scene.fire.burn();
        this.scene.tweens.add({
            targets: [book], alpha: 0, duration: 500,
            onComplete: tween => {
                book.destroy();
                this.scene.text.addBurned();
            }
        });
    }

    stop() {
        this.running = false;
    }
}

export default class Books {
    constructor(scene) {
        this.scene = scene;
        this.running = true;
        this.bookToFireTimeMs = 5000;
        this.maxBookCreationPeriodMs = 6000;
        this.bookGroup = this.scene.add.group();
        this.createBookAfterDelay(1000);
        this.createSpeedupEvent();

        for (let bookInfo of scene.bookInfos) {
            scene.load.spritesheet(bookInfo[0], `assets/${bookInfo[1]}`, {frameWidth: bookInfo[2], frameHeight: bookInfo[3]});
        }
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
            callbackScope: this,
        });
    }

    createSpeedupEvent() {
        this.scene.time.addEvent({
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
        const bookInfo = this.scene.bookInfos[Phaser.Math.Between(0, this.scene.bookInfos.length - 1)];
        const bookKey = bookInfo[0];
        const book = this.scene.add.sprite(this.scene.xPos(0), -50, bookKey);
        const frameIndex = Phaser.Math.Between(0, book.texture.frameTotal - 2);  // Todo find why frameTotal is 1 too high
        book.setFrame(frameIndex);
        book.bookCategory = bookKey;
        this.bookGroup.add(book);
        book.setScale(2 / 3);
        book.movementTween = this.scene.tweens.add({
            targets: [book],
            x: this.scene.fire.fireSprite.x,
            y: this.scene.fire.fireSprite.y,
            duration: this.bookToFireTimeMs,
            onComplete: tween => {
                this.bookGroup.remove(book);
                this.burn(book);
            }
        });
    }

    getFirst() { return this.bookGroup.getFirstAlive(); }

    selectCart(cart) {
        const book = this.getFirst();
        if (! book) return;

        if (book.movementTween) {
            book.movementTween.stop();
            book.movementTween = undefined;
        }
        this.bookGroup.remove(book);
        book.collecting = true;

        this.scene.tweens.add({
            targets: [book], x: cart.x, y: cart.y, duration: 1000,
            onComplete: tween => {
                if (book.bookCategory === cart.cartName) {
                    this.scene.text.addSorted();
                    book.destroy();
                } else {
                    this.moveToFire(book);
                }
            }
        });
    }

    moveToFire(book) {
        this.scene.tweens.add({
            targets: [book], x: this.scene.fire.fireSprite.x, y: this.scene.fire.fireSprite.y, duration: 1000,
            onComplete: tween => this.burn(book)
        });
    }

    burn(book) {
        this.scene.fire.burn();
        this.scene.tweens.add({
            targets: [book], alpha: 0, duration: 500,
            onComplete: tween => {
                book.destroy()
                this.scene.text.addBurned();
            }
        });
    }

    stop() {
        this.running = false;
    }
}


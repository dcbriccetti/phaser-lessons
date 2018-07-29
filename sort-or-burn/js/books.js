export default class Books {
    constructor(config, scene) {
        this.config = config;
        this.scene = scene;
        this.bookToFireTimeMs = 5000;
        this.maxBookCreationPeriodMs = 6000;
        this.bookGroup = this.scene.add.group();
        this.createBookAfterDelay(1000);
        this.createSpeedupEvent();

        for (let bookInfo of scene.bookInfos) {
            bookInfo[1].forEach((filename, index) => {
                scene.load.image(bookInfo[0] + index, `assets/${filename}`);
            });
        }
    }

    createBookAfterDelay(delay) {
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.addBook();
                this.createBookAfterDelay(Phaser.Math.Between(500, this.maxBookCreationPeriodMs));
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
        const category = bookInfo[0];
        const bookKey = category + Phaser.Math.Between(0, bookInfo[1].length - 1);
        const book = this.scene.add.sprite(this.scene.xPos(0), -50, bookKey);
        book.bookCategory = category;
        this.bookGroup.add(book);
        book.setScale(0.35);
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

    sort(cart) {
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

}


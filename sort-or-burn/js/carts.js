export default class Carts {
    constructor(height, scene) {
        this.height = height;
        this.scene = scene;
        scene.load.image("cart", "assets/cart.png");
    }

    create() {
        const h = this.height;
        this.cartSprites = [];
        this.scene.bookInfos.forEach((bookInfo, index) => {
            const xCart = this.scene.xPos(index + 1);
            const cartSprite = this.scene.add.sprite(xCart, h * 0.9, 'cart');
            const cartName = bookInfo[0];
            cartSprite.cartName = cartName;
            cartSprite.setScale(0.1);
            this.cartSprites.push(cartSprite);
            this.scene.add.text(xCart, h * 0.98, cartName, {font: "16px sans-serif", color: "black"}).setOrigin(0.5);
        });
    }

    closest(x, y) {
        function distanceTo(cartSprite) {return Phaser.Math.Distance.Between(x, y, cartSprite.x, cartSprite.y);}
        return this.cartSprites.reduce((a, b) => distanceTo(a) < distanceTo(b) ? a : b);
    }
}


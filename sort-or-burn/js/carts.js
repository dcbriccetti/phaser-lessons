export default class Carts {
    constructor(height, scene) {
        this.height = height;
        this.scene = scene;
        scene.load.image("cart", "assets/cart.png");
    }

    create() {
        const h = this.height;
        this.cartSprites = [];
        this.cartTexts = [];
        this.scene.bookInfos.forEach((bookInfo, index) => {
            const xCart = this.scene.xPos(index + 1);
            const cartSprite = this.scene.add.sprite(xCart, h * 0.86, 'cart');
            const cartName = bookInfo[0];
            cartSprite.cartName = cartName;
            this.cartSprites.push(cartSprite);
            this.cartTexts.push(this.scene.add.text(xCart, h * 0.985, cartName,
                {font: "16px sans-serif", color: "black"}).setOrigin(0.5));
        });
        this.setNumCarts(this.scene.numCarts());
    }

    setNumCarts(numCarts) {
        for (let i = 0; i < this.cartSprites.length; i++) {
            this.cartSprites[i].alpha = this.cartTexts[i].alpha = i >= this.scene.numCarts() ? 0.5 : 1;
        }
    }
    closest(x, y) {
        function distanceTo(cartSprite) {return Phaser.Math.Distance.Between(x, y, cartSprite.x, cartSprite.y);}
        return this.cartSprites.reduce((a, b) => distanceTo(a) < distanceTo(b) ? a : b);
    }
}


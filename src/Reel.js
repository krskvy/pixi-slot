import {Texture, Sprite} from 'pixi.js';
import globals from './globals';

class Reel {
    constructor(symbols, app, x, y, width, height, numSymbols) {
        this.symbols = symbols;
        this.app = app;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height * (numSymbols - 1);
        this.numSymbols = numSymbols;
        this.symbolHeight = height;
        this.currentSymbols = Array.from({ length: numSymbols }, () => Math.floor(Math.random() * this.symbols.length));
        this.isSpinning = false;

        this.baseSpeed = globals.spinSpeed;
        this.stopping = false;

        this.shuffledSymbols = this.shuffleArray([...this.symbols])

        this.sprites = [];
        this.initReel();
    }

    // Shuffle the array to randomize the symbol order
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    initReel() {
        this.sprites = [];
        for (let i = 0; i < this.shuffledSymbols.length; i++) {
            const symbolIndex = i;
            const texture = Texture.from(this.shuffledSymbols[symbolIndex]);
            const sprite = new Sprite(texture);

            sprite.width = this.width;
            sprite.height = this.symbolHeight;
            sprite.x = this.x;
            sprite.y = this.y + i * this.symbolHeight;

            this.app.stage.addChild(sprite);
            this.sprites.push(sprite);
        }
    }

    startSpin() {
        this.isSpinning = true;
        this.stopping = false;
        this.speed = this.baseSpeed;
    }

    stopSpin() {
        this.stopping = true;
    }

    update() {
        if (this.isSpinning) {
            if (this.stopping && this.speed > 0) {
                this.speed -= globals.deceleration;

                // Snap the symbols into position when speed is very low
                if (this.speed <= 0.5) {
                    this.speed = 0;
                    this.snapToGrid();
                    this.isSpinning = false;
                    return;
                }
            }

            // Move the symbols based on the current speed
            for (let sprite of this.sprites) {
                sprite.y += this.speed;
                sprite.y = Math.round(sprite.y);

                // Only update the symbol if it moves out of bounds
                if (sprite.y >= this.height) {
                    sprite.y = sprite.y - this.height - this.symbolHeight;
                    this.updateSymbol(sprite);
                }
            }
        }
    }

    snapToGrid() {
        for (let sprite of this.sprites) {
            sprite.y = Math.round(sprite.y / this.symbolHeight) * this.symbolHeight;
        }
    }

    updateSymbol(sprite) {
        const nextSymbol = this.shuffledSymbols.shift();  // Take the first symbol from the shuffled array
        this.shuffledSymbols.push(nextSymbol);  // Put it at the end to maintain the loop

        const texture = Texture.from(nextSymbol);

        if (!texture) {
            console.error(`Failed to load texture for symbol: ${nextSymbol}`);
            return;
        }

        sprite.texture = texture;
    }
}

export default Reel;
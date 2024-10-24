import Reel from './Reel';
import {Application, Assets} from 'pixi.js';
import globals from './globals';

class SlotMachine {
    constructor(reelCount, symbols, app, containerId) {
        this.reelCount = reelCount;
        this.symbols = symbols;
        this.numSymbols = symbols.length;
				this.app = app;

				document.getElementById(containerId).appendChild(app.canvas);
        this.reels = [];
        this.initReels();
    }

		static async create(reelCount, symbols, containerId) {
			const app = new Application();

			await app.init({
				width: globals.canvasWidth,
				height: globals.canvasHeight,
				backgroundColor: globals.backgroundColor,
			});

			await SlotMachine.loadAssets(symbols);

			return new SlotMachine(reelCount, symbols, app, containerId);
		}

    static async loadAssets(symbolPaths) {
        await Assets.load(symbolPaths);
		}

		initReels() {
			const reelWidth = this.app.screen.width / this.reelCount;
			const reelImageHeight = this.app.screen.height / globals.visibleReelSymbolsQty;

			for (let i = 0; i < this.reelCount; i++) {
					const reel = new Reel(this.symbols, this.app, i * reelWidth, 0, reelWidth, reelImageHeight, this.numSymbols);
					this.reels.push(reel);
			}
		}

    // Start spinning all reels
    startSpin() {
			this.reels.forEach((reel, index) => {
				setTimeout(() => {
						reel.startSpin();
				}, index * 100);
			});
		}


		// Stop reels one by one with a delay
		stopSpinWithDelay() {
				this.reels.forEach((reel, index) => {
						setTimeout(() => {
								reel.stopSpin();
						}, index * globals.stopSpinDelay);
				});
		}

    // Update all reels
    update() {
        this.reels.forEach(reel => reel.update());
    }
}

export default SlotMachine;
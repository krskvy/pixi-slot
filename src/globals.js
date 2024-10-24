const globals = {
	reelCount: 5,
	visibleReelSymbolsQty: 3, // Number of symbols being shown in the visible area for each Reel
	spinSpeed: 50,	// Default speed for spinning reels
	deceleration: 1.5,	// How quickly the reel slows down
	spinTimeBeforeEasing: 1500,	// Reels spinning time before easing
	stopSpinDelay: 500,	// Reel easing time
	symbols: [
			'assets/symbols/M00_000.jpg',
			'assets/symbols/M01_000.jpg',
			'assets/symbols/M02_000.jpg',
			'assets/symbols/M03_000.jpg',
			'assets/symbols/M04_000.jpg',
			'assets/symbols/M05_000.jpg',
			'assets/symbols/M06_000.jpg',
			'assets/symbols/M07_000.jpg',
			'assets/symbols/M08_000.jpg',
			'assets/symbols/M09_000.jpg',
			'assets/symbols/M10_000.jpg',
			'assets/symbols/M11_000.jpg',
			'assets/symbols/M12_000.jpg',
	],
	canvasWidth: 600,       // Default canvas width
	canvasHeight: 350,      // Default canvas height (for 3 symbols at a time)
	backgroundColor: 0x1099bb, // Background color for the Pixi.js application
};

export default globals;
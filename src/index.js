
import SlotMachine from './SlotMachine';
import globals from './globals';


document.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOMContentLoaded event fired', event);

    const slotMachine = await SlotMachine.create(globals.reelCount, globals.symbols, 'gameContainer');

    const spinButton = document.getElementById('spinButton');
    spinButton.addEventListener('click', () => {
        slotMachine.startSpin();

        setTimeout(() => {
            slotMachine.stopSpinWithDelay();
        }, globals.spinTimeBeforeEasing);
    });

    slotMachine.app.ticker.add(() => {
        slotMachine.update();
    });
},  { once: true });
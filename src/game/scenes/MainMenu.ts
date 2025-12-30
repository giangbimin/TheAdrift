import { Scene, GameObjects } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, COLORS } from '../../shared/constants';
import { EventBus } from '../../shared/EventBus';

export class MainMenu extends Scene {
    private logo: GameObjects.Image;
    private bgmStarted: boolean = false;

    constructor() {
        super(SCENE_KEYS.MAIN_MENU);
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        // Background
        this.add.image(centerX, centerY, ASSET_KEYS.BACKGROUND)
            .setOrigin(0.5)
            .setDisplaySize(width, height);

        // Animated Logo
        this.logo = this.add.image(centerX, height * 0.3, ASSET_KEYS.PHASER_LOGO);

        this.tweens.add({
            targets: this.logo,
            y: (height * 0.3) - 20,
            duration: 2000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Listen for React UI events
        this.events.on('ui-start-game', () => this.startGame());

        // Notify React that the scene is ready
        console.log('[Phaser] MainMenu Scene Create');
        EventBus.emit('current-scene-ready', this);
    }

    private startGame() {
        this.sound.play(ASSET_KEYS.CLICK_SFX);

        // Start BGM if not started
        if (!this.bgmStarted) {
            this.sound.play(ASSET_KEYS.MENU_BGM, { loop: true, volume: 0.5 });
            this.bgmStarted = true;
        }

        this.cameras.main.flash(500);
        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.GAME);
        });
    }
}

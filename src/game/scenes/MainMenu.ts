import { Scene, GameObjects } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, COLORS, GAME_CONFIG } from '../../shared/constants';
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

        // Logo handled by React UI (MainMenuUI.tsx)

        // Listen for React UI events
        this.events.on('ui-start-game', () => this.startGame());

        // Notify React that the scene is ready
        console.log('[Phaser] MainMenu Scene Create');
        EventBus.emit('current-scene-ready', this);
    }

    private startGame() {
        this.sound.play(ASSET_KEYS.CLICK_SFX, { volume: GAME_CONFIG.AUDIO.SFX_VOLUME });

        // Start BGM if not started
        if (!this.bgmStarted) {
            this.sound.play(ASSET_KEYS.MENU_BGM, { loop: true, volume: GAME_CONFIG.AUDIO.DEFAULT_BGM_VOLUME });
            this.bgmStarted = true;
        }

        this.cameras.main.flash(GAME_CONFIG.TRANSITIONS.FLASH_DURATION);
        this.time.delayedCall(GAME_CONFIG.TRANSITIONS.DEFAULT_DURATION, () => {
            this.scene.start(SCENE_KEYS.GAME);
        });
    }
}

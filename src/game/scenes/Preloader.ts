import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, ASSET_URLS, COLORS, UI_CONFIG } from '../../shared/constants';
import { t } from '../../services/TranslationService';
import { EventBus } from '../../shared/EventBus';

export class Preloader extends Scene {
    constructor() {
        super(SCENE_KEYS.PRELOADER);
    }

    init() {
        console.log('[Phaser] Preloader Scene Init');
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        // Background for the progress bar
        const barWidth = width * UI_CONFIG.PRELOADER.BAR_WIDTH_RATIO;
        const barHeight = UI_CONFIG.PRELOADER.BAR_HEIGHT;

        // Add the boot logo we loaded in the Boot Scene
        this.add.image(centerX, height * UI_CONFIG.PRELOADER.BOOT_LOGO_Y_RATIO, ASSET_KEYS.BOOT_LOGO);

        // Progress bar background (outline)
        this.add.rectangle(centerX, centerY, barWidth, barHeight).setStrokeStyle(UI_CONFIG.PRELOADER.BAR_STROKE, COLORS.PRIMARY);

        // Progress bar fill
        const barFill = this.add.rectangle(centerX - barWidth / 2 + 4, centerY, 0, barHeight - UI_CONFIG.PRELOADER.BAR_FILL_OFFSET, COLORS.ACCENT).setOrigin(0, 0.5);

        // Loading text using i18n
        const loadingText = this.add.text(centerX, centerY + UI_CONFIG.PRELOADER.TEXT_OFFSET_Y, `${t('loading')} 0%`, {
            fontSize: UI_CONFIG.PRELOADER.FONT_SIZE,
            color: '#ffffff',
            fontFamily: UI_CONFIG.PRELOADER.FONT_FAMILY
        }).setOrigin(0.5);

        // Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            barFill.width = (barWidth - UI_CONFIG.PRELOADER.BAR_FILL_OFFSET) * progress;
            loadingText.setText(`${t('loading')} ${Math.round(progress * 100)}%`);
        });

        this.load.on('complete', () => {
            loadingText.setText(t('complete'));
        });

        // DX: Enhanced error logging for asset loading
        this.load.on('loaderror', (file: Phaser.Loader.File) => {
            console.error(
                `%c ❌ ASSET LOAD ERROR: [${file.key}] `,
                'background: #ff0000; color: #ffffff; font-weight: bold; padding: 2px 5px; border-radius: 3px;',
                `URL: ${file.url}`
            );
        });

        // Notify React that the scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    preload() {
        console.log('[Phaser] Preloader Scene Preload');
        // Load all game assets
        this.load.image(ASSET_KEYS.BACKGROUND, ASSET_URLS.BACKGROUND);
        this.load.audio(ASSET_KEYS.CLICK_SFX, ASSET_URLS.CLICK_SFX);
        this.load.audio(ASSET_KEYS.MENU_BGM, ASSET_URLS.MENU_BGM);

        // Also reload the logo as the main logo for the menu
        this.load.image(ASSET_KEYS.PHASER_LOGO, ASSET_URLS.BOOT_LOGO);
    }

    create() {
        console.log('[Phaser] Preloader Scene Create');
        // Delay transition slightly to show "Complete!" message
        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.MAIN_MENU);
        });
    }
}

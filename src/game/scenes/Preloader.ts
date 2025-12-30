import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, ASSET_URLS, COLORS } from '../../constants';
import { t } from '../systems/TranslationManager';

export class Preloader extends Scene {
    constructor() {
        super(SCENE_KEYS.PRELOADER);
    }

    init() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        // Background for the progress bar
        const barWidth = width * 0.4;
        const barHeight = 30;

        // Add the boot logo we loaded in the Boot Scene
        this.add.image(centerX, height * 0.4, ASSET_KEYS.BOOT_LOGO);

        // Progress bar background (outline)
        this.add.rectangle(centerX, centerY, barWidth, barHeight).setStrokeStyle(2, COLORS.PRIMARY);

        // Progress bar fill
        const barFill = this.add.rectangle(centerX - barWidth / 2 + 4, centerY, 0, barHeight - 8, COLORS.ACCENT).setOrigin(0, 0.5);

        // Loading text using i18n
        const loadingText = this.add.text(centerX, centerY + 50, `${t('loading')} 0%`, {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            barFill.width = (barWidth - 8) * progress;
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
    }

    preload() {
        // Load all game assets
        this.load.image(ASSET_KEYS.BACKGROUND, ASSET_URLS.BACKGROUND);
        this.load.audio(ASSET_KEYS.CLICK_SFX, ASSET_URLS.CLICK_SFX);
        this.load.audio(ASSET_KEYS.MENU_BGM, ASSET_URLS.MENU_BGM);

        // Also reload the logo as the main logo for the menu
        this.load.image(ASSET_KEYS.PHASER_LOGO, ASSET_URLS.BOOT_LOGO);
    }

    create() {
        // Delay transition slightly to show "Complete!" message
        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.MAIN_MENU);
        });
    }
}

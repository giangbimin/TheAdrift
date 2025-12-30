import { Scene, GameObjects } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_VERSION, COLORS } from '../../constants';
import { t, translationManager } from '../systems/TranslationManager';

export class MainMenu extends Scene {
    private logo: GameObjects.Image;
    private bgmStarted: boolean = false;
    private buttons: GameObjects.Group;
    private languageText: GameObjects.Text;

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

        // Interactive Buttons Group
        this.buttons = this.add.group();
        this.createMenu();

        // Language Switch Button (Top Right)
        this.createLanguageButton();

        // DX: FPS and Version Overlay
        if (import.meta.env.DEV) {
            this.createDebugOverlay();
        }
    }

    private createMenu() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width * 0.5;

        this.buttons.clear(true, true);

        this.createButton(centerX, height * 0.55, t('start_game'), () => this.startGame());
        this.createButton(centerX, height * 0.68, t('options'), () => console.log('Options clicked'));
        this.createButton(centerX, height * 0.81, t('credits'), () => console.log('Credits clicked'));
    }

    private createLanguageButton() {
        const width = this.cameras.main.width;
        const margin = width * 0.05;

        const langBtn = this.add.container(width - margin - 50, margin + 30);
        const bg = this.add.rectangle(0, 0, 100, 40, COLORS.SECONDARY, 0.8)
            .setStrokeStyle(2, COLORS.PRIMARY)
            .setInteractive({ useHandCursor: true });

        this.languageText = this.add.text(0, 0, translationManager.getCurrentLanguage().toUpperCase(), {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        langBtn.add([bg, this.languageText]);

        bg.on('pointerdown', () => {
            translationManager.toggleLanguage();
            this.updateLanguage();
        });
    }

    private updateLanguage() {
        this.languageText.setText(translationManager.getCurrentLanguage().toUpperCase());
        this.createMenu();
    }

    private createDebugOverlay() {
        const height = this.cameras.main.height;
        const debugText = this.add.text(10, height - 10, `v${GAME_VERSION} | FPS: 0`, {
            fontSize: '14px',
            color: '#00ff00',
            fontFamily: 'monospace',
            backgroundColor: '#000000bb',
            padding: { x: 5, y: 2 }
        }).setOrigin(0, 1).setDepth(1000);

        this.events.on('update', () => {
            debugText.setText(`v${GAME_VERSION} | FPS: ${Math.round(this.game.loop.actualFps)}`);
        });
    }

    private createButton(x: number, y: number, textString: string, callback: () => void) {
        const btnBg = this.add.rectangle(x, y, 280, 70, COLORS.SECONDARY, 0.8)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(2, COLORS.PRIMARY);

        const btnText = this.add.text(x, y, textString, {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);

        this.buttons.add(btnBg);
        this.buttons.add(btnText);

        // Hover events
        btnBg.on('pointerover', () => {
            btnBg.setFillStyle(COLORS.ACCENT, 1);
            btnBg.setStrokeStyle(4, COLORS.PRIMARY);
            btnText.setColor('#000000');
            this.tweens.add({
                targets: [btnBg, btnText],
                scale: 1.05,
                duration: 100
            });
        });

        btnBg.on('pointerout', () => {
            btnBg.setFillStyle(COLORS.SECONDARY, 0.8);
            btnBg.setStrokeStyle(2, COLORS.PRIMARY);
            btnText.setColor('#ffffff');
            this.tweens.add({
                targets: [btnBg, btnText],
                scale: 1.0,
                duration: 100
            });
        });

        // Click event
        btnBg.on('pointerdown', () => {
            this.sound.play(ASSET_KEYS.CLICK_SFX);

            if (!this.bgmStarted) {
                this.sound.play(ASSET_KEYS.MENU_BGM, { loop: true, volume: 0.5 });
                this.bgmStarted = true;
            }

            callback();
        });
    }

    private startGame() {
        this.cameras.main.flash(500);
        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.GAME);
        });
    }
}

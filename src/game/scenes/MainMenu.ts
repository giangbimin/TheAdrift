import { Scene, GameObjects } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_WIDTH, GAME_HEIGHT, COLORS } from '../../constants';

export class MainMenu extends Scene {
    private logo: GameObjects.Image;
    private bgmStarted: boolean = false;

    constructor() {
        super(SCENE_KEYS.MAIN_MENU);
    }

    create() {
        const centerX = GAME_WIDTH / 2;
        const centerY = GAME_HEIGHT / 2;

        // Background
        this.add.image(centerX, centerY, ASSET_KEYS.BACKGROUND).setOrigin(0.5).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

        // Animated Logo
        this.logo = this.add.image(centerX, centerY - 150, ASSET_KEYS.PHASER_LOGO);

        // Add a floating animation to the logo
        this.tweens.add({
            targets: this.logo,
            y: centerY - 170,
            duration: 2000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Interactive Buttons
        this.createButton(centerX, centerY + 20, 'START GAME', () => this.startGame());
        this.createButton(centerX, centerY + 100, 'OPTIONS', () => console.log('Options clicked'));
        this.createButton(centerX, centerY + 180, 'CREDITS', () => console.log('Credits clicked'));
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const btnBg = this.add.rectangle(x, y, 250, 60, COLORS.SECONDARY, 0.8)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(2, COLORS.PRIMARY);

        const btnText = this.add.text(x, y, text, {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);

        // Hover events
        btnBg.on('pointerover', () => {
            btnBg.setFillStyle(COLORS.ACCENT, 1);
            btnBg.setStrokeStyle(4, COLORS.PRIMARY);
            btnText.setColor('#000000');
            this.tweens.add({
                targets: [btnBg, btnText],
                scale: 1.1,
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
            // Play click sound
            this.sound.play(ASSET_KEYS.CLICK_SFX);

            // Start BGM on first interaction if not started
            if (!this.bgmStarted) {
                this.sound.play(ASSET_KEYS.MENU_BGM, { loop: true, volume: 0.5 });
                this.bgmStarted = true;
            }

            callback();
        });
    }

    private startGame() {
        // Flash effect before starting
        this.cameras.main.flash(500);
        this.time.delayedCall(500, () => {
            this.scene.start(SCENE_KEYS.GAME);
        });
    }
}

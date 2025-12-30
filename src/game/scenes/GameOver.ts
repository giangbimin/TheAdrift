import { Scene } from 'phaser';
import { SCENE_KEYS, ASSET_KEYS, GAME_WIDTH, GAME_HEIGHT } from '../../shared/constants';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text: Phaser.GameObjects.Text;

    constructor() {
        super(SCENE_KEYS.GAME_OVER);
    }

    create() {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, ASSET_KEYS.BACKGROUND);
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.MAIN_MENU);
        });
    }
}
